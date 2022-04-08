import express from "express";
import userRouter from "./user/userRoute.js";
import cabRouter from "./cab/cabRoute.js";
import bookingRouter from "./booking/bookingRoute.js";
const router = express.Router();

router.use("/user", userRouter);
router.use("/cab", cabRouter);
router.use("/booking", bookingRouter);

export default router;