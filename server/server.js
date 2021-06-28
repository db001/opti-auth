/*
----- TODO -----

Error handling on routes
Form verification
Refactor email templates into separate files

*/

const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

const passport = require("./passport/setup");
const auth = require("./routes/auth");
const email = require("./routes/email");
const verify = require("./routes/verify");

require("dotenv").config();

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PWD;

const app = express();
const PORT = 5000;
const MONGO_URI = `mongodb+srv://${mongoUser}:${mongoPassword}@ideas.udkam.mongodb.net/users?retryWrites=true&w=majority`;

mongoose
	.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(console.log(`MongoDB connected`))
	.catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Session
const SECRET = process.env.SECRET;

app.use(
	session({
		secret: SECRET,
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: MONGO_URI,
			mongooseConnection: mongoose.connection,
			dbName: "users",
		}),
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
	res.send("Hello world");
});
app.use("/api/auth", auth);
app.use("/email", email);
app.use("/user/verify", verify);

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}!`));
