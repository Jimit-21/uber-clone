import logger from "./config/logger.js";
import config from "./config/config.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import router from "./components/index.js";
import { handleErrors } from "./helpers/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/",(req,res)=>{
  res.send("Hello!!")
});

app.use("/api/v1", router);

app.use(handleErrors);
app.use((req, res, next) => {
  const error = new Error("Not Found");
  return res.status(404).json({ message: error.message });
});

app.listen(config.server.port, () => {
    logger.info(`server is running on ${config.server.port}`);
});