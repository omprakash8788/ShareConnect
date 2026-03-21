import { Document } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      profile?: Document; // or your User type
    }
  }
}