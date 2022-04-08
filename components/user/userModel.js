import mongoose from "mongoose";
import bcrypt from "bcrypt";

// creating User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide your name"],
    },
    email: {
        type: String,
        required: [true, "please provide your email"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'please set your password'],
    },
    confirmPassword: {
        type: String,
        required: [true, "please confirm password"],
        // validating confirm password with password
        validate: {
          validator: function (comppass) {
            return comppass === this.password;
          },
          message: "password does not match",
        }
    }
});

// hashing password using bcrypt before save
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const hashPass = await bcrypt.hash(this.password, 10);
        this.password = hashPass;
        this.confirmPassword = undefined;
        next();
    }
    next();
});

// compare password function
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;