const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	email_is_verified: {
		type: Boolean,
		default: false,
	},
	password: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	permissions: {
		// Defines permissions while using the site
		// ['user', 'admin']
		type: String,
		default: "user",
	},
	verify_string: {
		type: String,
	},
});

module.exports = User = mongoose.model("user", UserSchema);
