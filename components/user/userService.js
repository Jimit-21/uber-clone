import bcrypt from "bcrypt";
import logger from "../../config/logger.js";
import { create, findOne } from "../../helpers/dbQuery.js";
import User from "./userModel.js";

export const registerUserService = async (data) => {
    try {
        logger.info("inside Register user");
        const { email } = data;
      
        const user = await create(User, data);
        return user;
    } catch (error) {
        logger.error(error);
        return new Error(error);
    }
};

export const loginUserService = async (data) => {
    try {
        const { email, password } = data;
  
        const user = await findOne(User, { email });
        
        if (!user) {
            return false;
        }
        const isValid = await bcrypt.compare(password, user.password);
        
        if (!isValid) {
            return false;
        }
        return user;
    } catch (error) {
        logger.error(error);
        return new Error(error);
    }
};