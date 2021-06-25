const express = require("express");
const router = express.Router();

const User = require("../models/Users");

router.get("/:params", (req, res) => {
	const verify = req.params.params;
	console.log(verify);
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

module.exports = router;
