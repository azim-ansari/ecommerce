/** @format */

import express from "express";
import userController from "../controller/userController";
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});
router.post("/register", userController.register);
router.post("/veify", userController.verifyOtp);
router.post("/login", userController.login);

module.exports = router;
