import logger from "../../config/logger.js";
import { signToken } from "../../utils/jwt.js";
import { loginUserService, registerUserService } from "./userService.js";

export const registerUser = async (req, res, next) => {
    try {
        logger.info("inside Register user");
        const { name, email, password, confirmPassword } = req.body;
  
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
        next();
    }
};

export const loginUser = async (req, res, next) => {
    try {
        logger.info("inside userController loginUser");
        const { email, password } = req.body;
        const user = await loginUserService({ email, password });
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
        next();
    }
};