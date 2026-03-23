import { IUser } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      profile?: IUser,
       auth?: any;
    }
  }
}