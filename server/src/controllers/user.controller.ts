import userModel, { IUser } from "../models/user.model";
import dbErrorHandler from "../helpers/dbErrorHandler";
import { Request, Response, NextFunction } from "express";
import extend from "lodash/extend";

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

const listAllUsers = async (req: Request, res: Response) => {
  try {
    let users = await userModel.find().select('name email updated created')
    res.json(users)

  } catch (error) {
    return res.status(400).json({
      message: "Error while Fetching users!" + error
    })
  }
}

const userByID = async (req: Request, res: Response, next: NextFunction, id: string) => {
  try {
    let user = await userModel.findById(id);
    if (!user) {
      return res.status(400).json({
        error: "User not found"
      })
    }
    req.profile = user;
    next()

  } catch (error) {
    return res.status(400).json({
      message: "Could not retrieve user" + error
    })
  }

}

const read = (req: Request, res: Response) => {
  if (!req.profile) {
    return res.status(400).json({ error: "User not found" });
  }
  req.profile.hashed_password = undefined as any;
  req.profile.salt = undefined as any;
  return res.json(req.profile);
};
const update = async (req: Request, res: Response) => {
  try {
    if (!req.profile) {
      return res.status(400).json({ error: "User not found" });
    }

    let user = req.profile;

    Object.assign(user, req.body);
    user.updated = new Date();

    await user.save();

    user.hashed_password = undefined as any;
    user.salt = undefined as any;

    res.json(user);
  } catch (error) {
    return res.status(400).json({
      message: "Could not update user " + error,
    });
  }
};

const remove = (req: Request, res: Response, next: NextFunction) => {

}

export default { createNewUser, userByID, read, listAllUsers, remove, update }