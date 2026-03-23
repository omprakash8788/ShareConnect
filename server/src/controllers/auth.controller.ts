import userModel from "../models/user.model";
import jwt from 'jsonwebtoken'
import { expressjwt } from "express-jwt";
import { NextFunction, Request, Response } from "express";

const signin = async (req: Request, res: Response) => {
    try {
        let user = await userModel.findOne({ 'email': req.body.email });
        if (!user) {
            return res.status(401).json({ error: "User not found" })
        }
        if (!user.authenticate(req.body.password)) {
            return res.status(401).send({ error: "Email and password dont't match" })
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET not defined");
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string)

        res.cookie('t', token, {
            expires: new Date(Date.now() + 9999 * 1000)
        });
        return res.json({
            token, user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })


    } catch (error) {
        return res.status(401).json({ error: 'Could not sign in' })
    }

}

const signout = (req: Request, res: Response) => {
    res.clearCookie("t")
    return res.status(200).json({
        message: "signed out"
    })

}



const requireSignin = expressjwt({
    secret: process.env.JWT_SECRET as string,
    algorithms: ["HS256"],
    requestProperty: "auth",
})

const hasAuthorization = (req: Request, res: Response, next: NextFunction) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!authorized) {
        return res.status(403).json({ error: "User is not authorized" })
    }
    next();
}

export default { signin, signout, requireSignin, hasAuthorization }
