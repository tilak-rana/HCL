import userSchema from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
// import { set } from "mongoose";

class userController {
    static userRegistration = async (req, res) => {
        try {
            const { name, email, password, confirm_password, tc } = req.body;
            // Check for user already exists or not
            const userExist = await userSchema.findOne({ email: email }); // finding email in database
            if (userExist) {
                return res.status(400).json({ message: "Email is already Exist" });
            }
            if (name && email && password && confirm_password && tc) {
                if (password === confirm_password) {
                    // hashing of password
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt);

                    // Create and save the new user
                    const newUser = new userSchema({
                        name: name,
                        email: email,
                        password: hashPassword,
                        tc: tc
                    });
                    const response = await newUser.save();
                    const savedUser = await userSchema.findOne({ email: email });
                    // Generate Token
                    const token = jwt.sign({ user_Id: savedUser._id }, process.env.JWT_SECRET_KEY,
                        { expiresIn: '5d' });
                    res.status(201).json({
                        status: "success",
                        message: "User registered Successfully",
                        res: response,
                        token: token
                    });
                }
                else {
                    return res.status(400).json({ message: "password does not matched" });
                }
            }
            else {
                return res.status(400).json({ message: "All Details of User are requird" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
            // console.log(err); ->this is only for development purpose but not good for production environment
        }
    }

    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (email && password) {
                const user = await userSchema.findOne({ email: email });
                if (user) {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (email === user.email && isMatch) {
                        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
                        res.status(200).json({ status: "success", message: "User Login Successfully", token: token });
                    }
                    else {
                        return res.status(400).json({ message: "Email or Password Invalide" });
                    }
                }
                else {
                    return res.status(404).json({ message: "User not Registered" });
                }
            }
            else {
                return res.status(400).json({ message: "All fields are required" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static changeUserPassword = async (req, res) => {
        try {
            const { password, confirm_password } = req.body;
            if (password && confirm_password) {
                if (password === confirm_password) {
                    const salt = await bcrypt.genSalt(10);
                    const newhashPassword = await bcrypt.hash(password, salt);
                    await userSchema.findByIdAndDelete(req.user._id, { $set: { password: newhashPassword } });
                    return res.status(200).json({ status: "success", message: "Password Chnaged Successfully" });
                }
                else {
                    return res.status(400).json({ status: "failed", message: "password and confirm password doesn't matched" })
                }
            }
            else {
                return res.status(400).json({ message: "all fields are required" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static logedUser = async (req, res) => {
        res.status(200).json({ user: req.user });
    }
    
    // static resetPassword=async(req,res)=>{
        
    // }

}

export default userController;