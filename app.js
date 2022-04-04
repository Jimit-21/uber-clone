import logger from "./config/logger.js";
import config from "./config/config.js";
import db from "./connections/dbConnection.js";
import express, { json, urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(morgan("dev"));

db();

app.listen(config.server.port, () => {
    logger.info(`server is running on ${config.server.port}`);
});