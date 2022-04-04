import mongoose from "mongoose";
import config from "../config/config.js";
import logger from "../config/logger.js";

const db = ()=>{
    mongoose.connect(config.db.uri).then(()=>{
        logger.info('connected to db')
    }).catch((err)=>{
        logger.error(err,"failed to connect")
    })
}

export default db