/** @format */

require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

export const sendSms = async (phone) => {
	client.verify
		.services(process.env.TWILIO_VERIFY_SERVICE)
		.verifications.create({
			to: `+91${phone}`,
			channel: "sms",
		})
		.then((data) => {
			return res.json({
				status: true,
				msg: "Otp Sent Successfully",
			});
		});
};

export const verifyData = async (phone, otp) => {
	return await client.verify.services(process.env.TWILIO_VERIFY_SERVICE).verificationChecks.create({
		to: `+91${phone}`,
		code: otp,
	});
};
