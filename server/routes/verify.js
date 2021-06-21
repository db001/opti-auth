const express = require("express");
const router = express.Router();

// router.get("/", (req, res) => {
// 	res.status(200).json({ message: "Verified" });
// });

router.get("/:params", (req, res) => {
	const verify = req.params.params;
	console.log(verify);
	res.status(200).json({ token: verify });
});

module.exports = router;
