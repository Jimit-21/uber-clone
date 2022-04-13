import logger from "../../config/logger.js";
import { registerCabService } from "./cabService.js";

export const registerCab = async (req, res, next) => {
    try {
        logger.info("inside the cab register");
        const { driver, currentLocation } = req.body;
        const data = {
            driver,
            currentLocation
        };

        const cab = await registerCabService(data);
        
        if (!cab) {
            return res.status(404).json({ staus: "failed", message: "unable to register" });
        }
        return res.status(201).json({ staus: "successful", data: cab });
    } catch (error) {
        logger.error(error);
        next();
    }
};