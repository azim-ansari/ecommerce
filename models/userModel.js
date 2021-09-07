/** @format */

import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import config from "../config";
// Create authenticated Authy and Twilio API clients
// const authy = require("authy")(config.authyKey);
// const twilioClient = require("twilio")(config.accountSid, config.authToken);

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
		},
		countryCode: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		phoneOtp: {
			type: String,
		},
		email: {
			type: String,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		authyId: {
			type: String,
		},
		password: {
			type: String,
		},
		profilePic: {
			type: String,
			default:
				"https://images.unsplash.com/photo-1586083702768-190ae093d34d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
		},
		status: {
			type: String,
			enum: ["Active", "Inactive"],
			default: "Active",
		},
		auth_token: {
			type: String,
		},
		role: {
			type: String,
			enum: ["User", "Admin"],
			default: "User",
		},
	},
	{ timestamps: true },
);
// UserSchema.pre("save", function (next) {
// 	const self = this;
// 	// only hash the password if it has been modified (or is new)
// 	if (!self.isModified("password")) return next();
// 	// generate a salt
// 	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
// 		if (err) return next(err);
// 		// hash the password using our new salt
// 		bcrypt.hash(self.password, salt, function (err, hash) {
// 			if (err) return next(err);
// 			// override the cleartext password with the hashed one
// 			self.password = hash;
// 			next();
// 		});
// 	});
// });

// // Test candidate password
// UserSchema.methods.comparePassword = function (candidatePassword, cb) {
// 	const self = this;
// 	bcrypt.compare(candidatePassword, self.password, function (err, isMatch) {
// 		if (err) return cb(err);
// 		cb(null, isMatch);
// 	});
// };

// // Send a verification token to this user
// UserSchema.methods.sendAuthyToken = function (cb) {
// 	var self = this;
// 	if (!self.authyId) {
// 		// Register this user if it's a new user
// 		authy.register_user(self.email, self.phone, self.countryCode, function (err, response) {
// 			if (err || !response.user) return cb.call(self, err);
// 			self.authyId = response.user.id;
// 			self.save(function (err, doc) {
// 				if (err || !doc) return cb.call(self, err);
// 				self = doc;
// 				sendToken();
// 			});
// 		});
// 	} else {
// 		// Otherwise send token to a known user
// 		sendToken();
// 	}
// 	// With a valid Authy ID, send the 2FA token for this user
// 	function sendToken() {
// 		authy.request_sms(self.authyId, true, function (err, response) {
// 			cb.call(self, err);
// 		});
// 	}
// };

// // Test a 2FA token
// UserSchema.methods.verifyAuthyToken = function (otp, cb) {
// 	const self = this;
// 	authy.verify(self.authyId, otp, function (err, response) {
// 		cb.call(self, err, response);
// 	});
// };

// // Send a text message via twilio to this user
// UserSchema.methods.sendMessage = function (message, successCallback, errorCallback) {
// 	const self = this;
// 	const toNumber = `+${self.countryCode}${self.phone}`;
// 	twilioClient.messages
// 		.create({
// 			to: toNumber,
// 			from: config.twilioNumber,
// 			body: message,
// 		})
// 		.then(function () {
// 			successCallback();
// 		})
// 		.catch(function (err) {
// 			errorCallback(err);
// 		});
// };
module.exports = mongoose.model("users", userSchema);
