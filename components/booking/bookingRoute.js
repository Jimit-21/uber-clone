import express from "express";
import { auth } from "../../middlewares/auth.js";
import { createBooking, deleteBooking, nearByCab, getAllBookings } from "./bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post('/',auth , createBooking);
bookingRouter.delete('/:id',auth , deleteBooking);
bookingRouter.get('/', auth, nearByCab);
bookingRouter.get('/getAllbookings', auth, getAllBookings);

export default bookingRouter;