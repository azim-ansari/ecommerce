/** @format */

import mongoose from "mongoose";

require("dotenv").config();

//connecting database

const mongoInit = async () => {
	try {
		await mongoose.connect(process.env.DATABASE, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connected to Database yeah !! ✌️");
	} catch (e) {
		console.log(e.message);
	}
};

module.exports = mongoInit;
