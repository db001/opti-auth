const express = require("express");
const router = express.Router();

const User = require("../models/Users");

const sesClient = require("../email/ses-client");

router.get("/code/:params", (req, res) => {
	const verify = req.params.params;
	User.findOneAndUpdate({ verify_string: verify }, { email_is_verified: true })
		.then((user) => {
			if (user) {
				res.status(200).json({ user, verified: true });
			}
		})
		.catch((err) => {
			return res.status(400).json({ errors: err });
		});
});

router.post("/resend", (req, res) => {
	const email = req.body.email;
	User.findOne({ email })
		.then((user) => {
			sesClient.resendVerifyEmail(user.email, user.verify_string);

			return res.status(200).json({ resend: true });
		})
		.catch((err) => {
			return res.status(400).json({ errors: err });
		});
});

module.exports = router;
