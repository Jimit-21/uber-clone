import logger from "../../config/logger.js";
import { create, findOne } from "../../helpers/dbQuery.js";
import Cab from "./cabModel.js";

// register cab
export const registerCab = async (req, res, next) => {
    try {
        logger.info("inside the cab register");
        const { driver, currentLocation } = req.body;
        const data = {
            driver,
            currentLocation
        };
        console.log(data);
        const cab = await create(Cab, data);
        console.log(cab);
        if (!cab) {
            return res.status(404).json({ staus: "failed", message: "unable to register" });
        }
        return res.status(201).json({ staus: "successful", data: cab });
    } catch (error) {
        next(new Error(error))
    }
};