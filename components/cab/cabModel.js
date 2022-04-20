import mongoose from "mongoose";
import db from "../../connections/dbConnection.js";

const cabSchema = new mongoose.Schema({
    booked: {
        type: Boolean,
        default: false
    },
    currentLocation: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

cabSchema.index({ location: "2d" });

const Cab = db.model("Cab", cabSchema);

export default Cab;