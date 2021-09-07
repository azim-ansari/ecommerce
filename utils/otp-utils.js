/** @format */
require("dotenv").config();
// const fast2sms = require("fast-two-sms");
import fast2sms from "fast-two-sms";
// const { FAST2SMS } = require("../config");
// const fastTwoSms = process.env.FAST2SMS;

module.exports = {
	generateOTP: (otp_length) => {
		// Declare a digits variable
		// which stores all digits
		// console.log("otp_length::::", otp_length);
		var digits = "0123456789";
		let OTP = "";
		for (let i = 0; i < otp_length; i++) {
			OTP += digits[Math.floor(Math.random() * 10)];
		}
		return OTP;
	},
	fast2sms: async ({ message, contactNumber }, next) => {
		try {
			const res = await fast2sms.sendMessage({
				authorization: process.env.FAST2SMS,
				message,
				numbers: [contactNumber],
			});
			console.log(res);
		} catch (error) {
			next(error);
		}
	},
};
