const bcrypt = require("bcryptjs");
const { randomBytes } = require("crypto");
const User = require("../models/Users");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

passport.use(
	new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
		// Look for user
		User.findOne({ email: email })
			.then((user) => {
				if (!user) {
					// Create new user if none found

					// Create random verify token
					let verify_string;

					randomBytes(256, (err, buf) => {
						if (err) throw err;
						verify_string = buf.toString("hex");
					});

					const newUser = new User({ email, password, verify_string });

					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if (err) throw err;
							newUser.password = hash;
							newUser.verify_string = verify_string;
							newUser
								.save()
								.then((user) => {
									return done(null, user, { newUser: true });
								})
								.catch((err) => {
									return done(null, false, { message: err });
								});
						});
					});
				} else {
					// Return user
					// Match password
					bcrypt.compare(password, user.password, (err, isMatch) => {
						if (err) throw err;

						if (isMatch) {
							return done(null, user, { userExists: true });
						} else {
							return done(null, false, { message: "Incorrect password" });
						}
					});
				}
			})
			.catch((err) => {
				return done(null, false, { message: err });
			});
	})
);

module.exports = passport;
