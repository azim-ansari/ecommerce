/** @format */

import { handleResponse, handleError } from "../config/requestHandler";
import { register, findUserByPhone, upadateUser } from "../services/userServices";
import { sendSms, verifyData } from "../config/twilio";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

module.exports = {
	register: async (req, res, next) => {
		try {
			const { fullName, countryCode, phone, password, email } = req.body;
			if (!fullName || !countryCode || !phone || !password || !email) {
				return handleResponse({
					res,
					msg: "Pramameter missing",
				});
			}
			const user = await findUserByPhone({ phone });
			const hashedPassword = await bcrypt.hash(password, 10);
			if (!user) {
				const newUser = await register({
					fullName,
					countryCode,
					phone,
					email,
					password: hashedPassword,
				});
				await sendSms(newUser.phone);
				return handleResponse({
					res,
					msg: "Registered Successfully !! OTP sended to mobile number",
					data: newUser,
				});
			} else {
				return handleResponse({ res, msg: "User Registered Already" });
			}
		} catch (error) {
			console.log(error);
			return handleError({ res, error, data: error });
		}
	},
	verifyOtp: async (req, res) => {
		const { phone, otp } = req.body;
		let data = await verifyData(phone, otp);
		if (data.status == "approved") {
			return handleResponse({
				res,
				msg: "Otp Verified Successfully",
			});
		} else {
			return handleResponse({
				res,
				msg: "Otp not Verified Successfully",
			});
		}
	},
	login: async (req, res) => {
		try {
			const { phone, otp } = req.body;
			if (!phone || !otp) {
				return handleResponse({
					res,
					msg: "Pramameter missing",
				});
			}
			const userData = await findUserByPhone({ phone });
			if (!userData) {
				handleResponse({ req, msg: "User not registered with Mobile Number" });
			} else {
				let data = await verifyData(phone, otp);
				if (data.status == "approved") {
					const token = await jwt.sign({ user: { id: userData.id } }, "jwt_secret", {
						expiresIn: "1 h",
					});
					const user = await upadateUser(userData.id, token);
					return handleResponse({
						res,
						msg: "Otp Verified !! logged in Successfully",
						data: user,
					});
				} else {
					return handleResponse({
						res,
						msg: "Otp not Verified Successfully !! Please try again",
					});
				}
			}
		} catch (error) {
			return handleError({ res, error, data: error });
		}
	},
};
