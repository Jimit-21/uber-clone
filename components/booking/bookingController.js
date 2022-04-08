import logger from "../../config/logger.js";
import getDistanceFromLatLonInKm from "../../helpers/distance.js";
import { create, findOne, deleteOne, find } from "../../helpers/dbQuery.js";
import Cab from "../cab/cabModel.js";
import Booking from "./bookingModel.js";

export const createBooking = async(req, res, next) => {
    try {
        logger.info("inside create booking");
        const { pickupAddress, destinationAddress } = req.body;
        const user = req.user;

        const pickupLocation = pickupAddress.coordinates.toString().split(",");
        const destinationLocation = destinationAddress.coordinates.toString().split(",");

        const lat1 = pickupLocation[0];
        const lon1 = pickupLocation[1];
        const lat2 = destinationLocation[0];
        const lon2 = destinationLocation[1];

        const disInkm = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
        // console.log(disInkm);

        // get exact value not decimal value used math.ceil
        const price = Math.ceil(15 * disInkm);
        // console.log(price);
        
        // finding cabs around 10 miles
        const findCab = {
            booked: false,
            currentLocation: {
                $geoWithin: { $centerSphere: [[lat1, lon1], 10 / 3963.2] }
            }
        };
        console.log(findCab);

        const cab = await findOne(Cab, findCab);
        console.log(cab);

        if (!cab) {
            return res.status(404).json({ message: "no cabs are available" })
        }

        const data = {
            pickupAddress,
            destinationAddress,
            price,
            cab: cab._id,
            bookedBy: user.id
        };

        // booking cab
        const bookCab = await create(Booking, data);
        if (bookCab) {
            cab.booked = true,
            await cab.save()
            return res.status(201).json({ message: "booked", data: bookCab });
        }
    } catch (error) {
        next(new Error(error));
    }
};

export const deleteBooking = async(req, res, next) => {
    try {
        logger.info("inside delete booking");
        userId = req.params._id;
        console.log(userId);

        const data = await deleteOne(Booking, userId);
        console.log("asdfgh", data);

        if (!data) {
            return res.status(401).json({ message: "booking is not valid" });
        }

        const cab = await Cab.findById(data.cab._id);
        cab.booked = false;
        cab.save();

        res.status(201).json({ message: "booking canceled" });
    } catch (error) {
        next(new Error(error));
    }
};

export const nearByCab = async(req, res, next) =>{
    try {
        logger.info("inside near by cabs");
        const { lat, lon } = req.body;

        if (!lat && !lon) {
            return res.status(401).json({ message: "provide latitude and logitude" });
        }

        const findCab = {
            booked: false,
            currentLocation: {
                $geoWithin: { $centerSphere: [[lat, lon], 10 / 3963.2] }
            }
        };

        const cab = await find(Cab, findCab);

        if (cab.length > 0) {
            return res.status(201).json({ data: cab });
        } else {
            return res.status(201).json({ message: "no cabs are available in your area" });
        }
    } catch (error) {
        next(new Error(error));
    }
};

export const getAllBookings = async(req, res, next) => {
    try {
        logger.info("inside get all bookings");
        const userId = req.user.id;
        const data = {
            bookedBy: userId
        };

        const bookingHistory = await find(Booking, data);
        
        if (bookingHistory.length > 0) {
            return res.status(201).json({ data: bookingHistory });
        } else {
            return res.status(401).json({ message: "no bookings till now    " });
        }
    } catch (error) {
        next(new Error(error));
    }
};