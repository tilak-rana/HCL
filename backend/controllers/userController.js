import userSchema from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
// import { set } from "mongoose";
import { generateTokenAndSetCookie } from "../utils/createToken&setCookies.js";
class userController {
    static userRegistration = async (req, res) => {
        try {
            const { name, email, password, confirm_password, role } = req.body;
            
            // Check if the user already exists
            const userExist = await userSchema.findOne({ email: email });
            if (userExist) {
                return res.status(400).json({ message: "Email is already Exist" });
            }

            // Ensure all required fields are present
            if (name && email && password && confirm_password) {
                if (password === confirm_password) {
                    // Hashing the password
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt);

                    // Create and save the new user
                    const newUser = new userSchema({
                        name: name,
                        email: email,
                        password: hashPassword,
                        role: role
                    });

                    const response = await newUser.save();
                    const savedUser = await userSchema.findOne({ email: email });

                    // Generate token and set it as a cookie
                    const token = generateTokenAndSetCookie(res, newUser._id);

                    // Respond with success message and token
                    res.status(201).json({
                        status: "success",
                        message: "User registered successfully",
                        res: response,
                        token: token
                    });
                } else {
                    return res.status(400).json({ message: "Password does not match" });
                }
            } else {
                return res.status(400).json({ message: "All user details are required" });
            }
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            
            // Check if email and password are provided
            if (email && password) {
                // Find the user by email
                const user = await userSchema.findOne({ email: email });
                
                // If user exists, check password
                if (user) {
                    const isMatch = await bcrypt.compare(password, user.password);
    
                    // If email matches and password is correct
                    if (isMatch) {
                        const token = generateTokenAndSetCookie(res, user._id);
    
                        res.status(200).json({
                            success: true,
                            message: "Logged in successfully",
                            user: {
                                ...user._doc,
                                password: undefined, // Exclude password from the response
                            },
                        });
                    } else {
                        return res.status(400).json({ message: "Invalid email or password" });
                    }
                } else {
                    return res.status(404).json({ message: "User not registered" });
                }
            } else {
                return res.status(400).json({ message: "All fields are required" });
            }
        } catch (error) {
            // Log errors for debugging (but avoid in production)
            console.error("Error in login:", error);
            res.status(400).json({ success: false, message: "Something went wrong, please try again later." });
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
        res.clearCookie("token");
        res.status(200).json({ success: true, message: "Logged out successfully" });
    }
    
    // static resetPassword=async(req,res)=>{
        
    // }

}

export default userController;