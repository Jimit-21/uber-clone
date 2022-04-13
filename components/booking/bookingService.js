import logger from "../../config/logger.js";
import getDistanceFromLatLonInKm from "../../helpers/distance.js";
import { create, findOne, deleteOne, find } from "../../helpers/dbQuery.js";
import Cab from "../cab/cabModel.js";
import Booking from "./bookingModel.js";

export const createBookingService = async(book) => {
    try {
        const { pickupAddress, destinationAddress } = book;
        const bookCab = await create(Booking, book);
        return bookCab;
    } catch (error) {
        logger.error(error);
        next();
    }
};

export const deleteBookingService = async(ddata) => {
    try {
        const data = await deleteOne(Booking, ddata);
        return data;
    } catch (error) {
        logger.error(error);
        next();
    }
};

export const nearByCabService = async(findc) =>{
    try {
        const cab = await find(Cab, findc);
        return cab
    } catch (error) {
        logger.error(error);
        next();
    }
};

export const getAllBookingsService = async(data) => {
    try {
        const bookingHistory = await find(Booking, data);
        return bookingHistory;
    } catch (error) {
        logger.error(error);
        next();
    }
};