import logger from "../../config/logger.js";
import { create, findOne } from "../../helpers/dbQuery.js";
import Cab from "./cabModel.js";

export const registerCabService = async (data) => {
    try {
        const cab = await create(Cab, data);
        return cab;
    } catch (error) {
        logger.error(error);
        next();
    }
};