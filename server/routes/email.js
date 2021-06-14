const express = require("express");
const router = express.Router();

const sesClient = require("../email/ses-client");

router.get("/", (req, res) => {
	sesClient.sendEmail("dnbennett@hotmail.co.uk", "Hey! Welcome", "This is the body of email");

	res.send("email sent");
});

module.exports = router;
