import express from "express";
import userController from "../controllers/userController.js";
import checkUserAuth from "../middlewares/authChangePassword.js"

const route = express.Router();

// route level middleware - to protect private routes
route.use('/changepassword', checkUserAuth);
route.use('/logeduser', checkUserAuth);

// Public routes
route.post('/register', userController.userRegistration);
route.post('/login', userController.userLogin);


// Private routes
route.post('/changepassword', userController.changeUserPassword);
route.get('/logeduser', userController.logedUser);

export default route;