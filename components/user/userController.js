import logger from "../../config/logger.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { signToken } from "../../utils/jwt.js";
import User from "./userModel.js";
import { findOne } from "../../helpers/dbQuery.js";
import { loginUserService, registerUserService } from "./userService.js";

export const registerUser = catchAsync(async (req, res, next) => {
    try {
        logger.info("inside Register user");
        const { name, email, password, confirmPassword } = req.body;

        const userExist = await findOne(User, { email });
  
        if (userExist) {
            return res.status(401).json({ message: "email is already registered" });
        }
  
        const data = {
            name,
            email,
            password,
            confirmPassword
        };

        const user = await registerUserService(data);

        if (!user) {
            return res.status(404).json({ staus: "registration failed", message: "unable to register" });
        }
        return res.status(201).json({ staus: "registration successful", data: user });
    } catch (error) {
        logger.error(error);
        next(new Error(error));
    }
});

export const loginUser = catchAsync(async (req, res, next) => {
    try {
        logger.info("inside userController loginUser");
        const { email, password } = req.body;
        const user = await loginUserService({ email, password });
        if (!user) {
            return res.status(401).json({ message: "invalid credential" });
        }
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
        };
        const token = signToken(payload);

        res.cookie("jwt", token);
  
        return res.status(200).json({ message: "login success" });
    } catch (error) {
        logger.error(error);
        next(new Error(error));
    }
});