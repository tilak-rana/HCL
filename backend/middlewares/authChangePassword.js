import userSchema from "../models/userSchema.js";
import jwt from "jsonwebtoken";

const authChangePassword = async (req, res, next) => {
    const { authorization } = req.headers;
    let token;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            // get token from header
            token = authorization.split(' ')[1];
            //    verify token
            const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
            // console.log(userId);
            // Get User from token
            req.user = await userSchema.findById(userId).select('-password');
            // console.log(req.user);
            next()
        } catch (err) {
            res.status(401).json({ status: "failed", message: "Unauthorized User" });
        }
    }
    if (!token) {
        return res.status(401).json({ status: "failed", message: "Unauthorized, User not find" });
    }
}

export default authChangePassword;
