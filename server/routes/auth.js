const express = require("express");
const router = express.Router();
const passport = require("passport");

const sesClient = require("../email/ses-client");

router.post("/login", (req, res, next) => {
	passport.authenticate("local", function (err, user, info) {
		if (err) {
			return res.status(400).json({ errors: err });
		}
		if (!user) {
			return res.status(400).json({ errors: "No user found" });
		}
		req.logIn(user, function (err) {
			if (err) {
				return res.status(400).json({ errors: err });
			}
			return res.status(200).json({ user });
		});
	})(req, res, next);
});

router.post("/register", (req, res, next) => {
	passport.authenticate("local", function (err, user, info) {
		if (err) {
			return res.status(400).json({ errors: err });
		}

		if (info.userExists) {
			return res.status(200).json({ userExists: true });
		}

		if (info.newUser) {
			console.log("new user");

			sesClient.createVerifyEmail(user.email, user.verify_string);

			return res.status(200).json({ user });
		}

		// req.logIn(user, function (err) {
		// 	if (err) {
		// 		return res.status(400).json({ errors: err });
		// 	}
		// 	return res.status(200).json({ user });
		// });
	})(req, res, next);
});

router.get("/current_user", (req, res) => {
	res.send({ user: req.user });
});

router.get("/logout", (req, res) => {
	req.logout();
	res.status(200).json({ message: "Logged out", user: req.user });
});

module.exports = router;
