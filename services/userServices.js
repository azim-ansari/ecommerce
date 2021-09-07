/** @format */

import userModel from "../models/userModel";
import mongoose from "mongoose";

module.exports = {
	register: async (data) => {
		return userModel.create(data);
	},
	findUserByPhone: async (phone) => {
		return userModel.findOne(phone);
	},
	upadateUser: async (userId, token) => {
		return userModel.findByIdAndUpdate(
			{ _id: mongoose.Types.ObjectId(userId) },
			{ $set: { auth_token: token, verified: true } },
			{
				new: true,
			},
		);
	},
};
