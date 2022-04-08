import logger from "../../config/logger.js";
import { create, findOne } from "../../helpers/dbQuery.js";
import { signToken } from "../../utils/jwt.js";
import User from "./userModel.js";

// register user
export const registerUser = async (req, res, next) => {
    try {
        logger.info("inside Register user");
        const { name, email, password, confirmPassword } = req.body;
  
        const userExist = await findOne(User, { email });
  
        if (userExist) {
            return res.status(409).json({ message: "email is already registered" });
      }
  
      const data = {
          name,
          email,
          password,
          confirmPassword
      };
      console.log(data);
      const user = await create(User, data);
      console.log(User);
      if (!user) {
          return res.status(404).json({ staus: "registration failed", message: "unable to register" });
      }
      return res.status(201).json({ staus: "registration successful", data: user });
    } catch (error) {
        next(new Error(error));
    }
};

// login user
export const loginUser = async (req, res, next) => {
    try {
        logger.info("inside userController loginUser");
        const { email, password } = req.body;
  
        const user = await findOne(User, { email });
        if (!user) {
            return res.status(401).json({ message: "User not available" });
      }
  
      const isValid = await user.comparePassword(password);
  
      if (!isValid) {
          return res.status(401).json({ message: "invalid credentials" });
      }
      const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
      };
      const token = signToken(payload);
      console.log(token);

      res.cookie("jwt", token);
  
      return res.status(200).json({ message: "login success" });
    } catch (error) {
      next(new Error(error));
    }
};