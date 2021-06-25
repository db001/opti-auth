const express = require("express");
const router = express.Router();

const sesClient = require("../email/ses-client");

router.get("/", (req, res) => {
	sesClient.myMail("dnbennett@hotmail.co.uk", "Hey! Welcome", "This is the body of email");
	sesClient.createVerifyEmail("dnbennett@hotmail.co.uk", "1234");

	res.send("email sent");
});

module.exports = router;
