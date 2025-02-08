import express from "express";
import userController from "../controllers/userController.js";
import checkUserAuth from "../middlewares/authChangePassword.js"

const route = express.Router();


route.use('/changepassword', checkUserAuth);
route.use('/logeduser', checkUserAuth);

// Public routes
route.post('/register', userController.userRegistration);
route.post('/login', userController.userLogin);


// Private routes
route.post('/changepassword', userController.changeUserPassword);
route.get('/logout', userController.logedUser);

export default route;