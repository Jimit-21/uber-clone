import mongoose from "mongoose";
import config from "../config/config.js";
import logger from "../config/logger.js";

const db = mongoose.createConnection(config.db.uri);

db.on('connected', () => {
	logger.info('connected to db')
})

// If the connection throws an error
db.on('error', (err) => {
	logger.debug(`failed to connect: ${err}`)
})

export default db;