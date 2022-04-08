import express from "express";  
import { registerUser, loginUser } from "./userController.js";
import { catchAsync } from "../../utils/catchAsync.js";

const userRouter = express.Router();


userRouter.post('/register',catchAsync(registerUser));
userRouter.post('/login',catchAsync(loginUser));

export default userRouter