import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    pickupAddress: {
        type: {
            type: String,
            num: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    destinationAddress: {
        type: {
            type: String,
            num: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: {
        type: Number,
        required: true
    },
    cab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cab"
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

bookingSchema.pre(/^find/, function (next) {
    this.populate("bookedBy").populate("cab");
    next();
});

const Booking = new mongoose.model("Booking", bookingSchema);

export default Booking;