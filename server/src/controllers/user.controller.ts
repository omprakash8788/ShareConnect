import userModel from "../models/user.model";
import dbErrorHandler from "../helpers/dbErrorHandler";
import { Request, Response, NextFunction } from "express";

const create = async (req: Request, res: Response, next: NextFunction) => {
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

const list = (req, res) => {

}

const userByID = (req, res, next, id) => {

}

const read = (req, res) => {

}

const update = (req, res, next) => {

}

const remove = (req, res, next) => {

}

export default { create, userByID, read, list, remove, update }