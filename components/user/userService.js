import logger from "../../config/logger.js";
import bcrypt from "bcrypt";
import { create, findOne } from "../../helpers/dbQuery.js";
import User from "./userModel.js";

export const registerUserService = async (data) => {
    try {
        logger.info("inside Register user");
        const { email } = data;
  
        const userExist = await findOne(User, { email });
  
        if (userExist) {
            return res.status(401).json({ message: "email is already registered" });
      }
      
      const user = await create(User, data);
      return user;
    } catch (error) {
        logger.error(error);
        next();
    }
};

export const loginUserService = async (data) => {
    try {
        const { email, password } = data;
  
        const user = await findOne(User, { email });
        const isValid = await bcrypt.compare(password, user.password);
      
        if (!isValid) {
            return false;
        }

        return user;
    } catch (error) {
        logger.error(error);
        next();
    }
};