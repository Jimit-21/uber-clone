import express from "express";
import { registerCab } from "./cabController.js";

const cabRouter = express.Router();

cabRouter.post('/register', registerCab);

export default cabRouter;