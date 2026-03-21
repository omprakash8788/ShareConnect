import mongoose, { Schema, Document, Model } from "mongoose";
import crypto from "crypto";


export interface IUser extends Document {
  name: string;
  about?: string;
  email: string;
  hashed_password: string;
  salt: string;
  photo?: {
    data: Buffer;
    contentType: string;
  };
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  created: Date;
  updated?: Date;
  _password?: string;
  authenticate(password: string): boolean;
  encryptPassword(password: string): string;
  makeSalt(): string;
}
const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
  },
  about: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: [true, "Email is required"],
  },
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  hashed_password: {
    type: String,
    required: [true, "Password is required"], 
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.virtual("password")
  .set(function (this: IUser, password: string) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function (this: IUser) {
    return this._password;
  });
UserSchema.path("hashed_password").validate(function (this: IUser) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, "Invalid password");
UserSchema.methods.authenticate = function (this: IUser, plainText: string) {
  return this.encryptPassword(plainText) === this.hashed_password;
};

UserSchema.methods.encryptPassword = function (
  this: IUser,
  password: string
) {
  if (!password) return "";
  try {
    return crypto
      .createHmac("sha1", this.salt)
      .update(password)
      .digest("hex");
  } catch {
    return "";
  }
};

UserSchema.methods.makeSalt = function (this: IUser) {
  return Math.round(new Date().valueOf() * Math.random()) + "";
};
export default mongoose.model<IUser>("User", UserSchema);