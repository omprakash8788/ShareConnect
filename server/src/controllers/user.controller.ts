import userModel from "../models/user.model";
import dbErrorHandler from "../helpers/dbErrorHandler";
import { Request, Response, NextFunction } from "express";


const createNewUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = new userModel(req.body);
  try {
    await user.save();
    return res.status(200).json({ message: "Successfully signed up!" })
  } catch (error) {
    return res.status(400).json({
      message: "Error while signed up!" + error
    })
  }
}

const listAllUsers = async(req:Request, res:Response) => {
  try {
    let users = await userModel.find().select('name email updated created')
    res.json(users)
    
  } catch(error) {
      return res.status(400).json({
      message: "Error while Fetching users!" + error
    })
  }
}

const userByID = (req:Request, res:Response, next:NextFunction, id:string) => {

}

const read = (req:Request, res:Response) => {

}

const update = (req:Request, res:Response, next:NextFunction) => {

}

const remove = (req:Request, res:Response, next:NextFunction) => {

}

export default { createNewUser, userByID, read, listAllUsers, remove, update }