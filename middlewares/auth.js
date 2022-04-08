import User from "../components/user/userModel.js";
import { findOne } from "../helpers/dbQuery.js";
import { verifyToken } from "../utils/jwt.js";

export const auth = async function (req, res, next) {
    try {
        const cookie = req.headers.cookie;
        if (!cookie) {
            return res.status(401).json({ message: "you are not authenticated user" });
        }

        const token = cookie.split("=")[1];
        // console.log(token);
        const verifyUser = verifyToken(token);
        // console.log(verifyUser);
        
        const user = await findOne(User, { _id: verifyUser.id });
        // console.log(user);

        if (!user) {
            return res.status(401).json({ message: "you are not authenticated user" });
        }

        req.user = verifyUser;
        next();
    } catch (error) {
        next(new Error(error));
    }
};