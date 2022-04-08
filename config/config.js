import dotenv from "dotenv";
dotenv.config();

const server = {
    port: process.env.PORT,
};
  
const db = {
    uri: process.env.MONGO_URI
};
  
export default {
    db,
    server,
    jwtSecret: process.env.JWT_SECRET,
};