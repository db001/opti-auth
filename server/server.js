const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

const passport = require("./passport/setup");
const auth = require("./routes/auth");

require("dotenv").config();

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PWD;

const app = express();
const PORT = 5000;
const MONGO_URI = `mongodb+srv://${mongoUser}:${mongoPassword}@ideas.udkam.mongodb.net/users?retryWrites=true&w=majority`;

mongoose
	.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(console.log(`MongoDB connected`))
	.catch((err) => console.log(err));

// Bodyparser middleware, extended false does not allow nested payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
	session({
		secret: "very secret this is",
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
app.use("/api/auth", auth);
app.get("/", (req, res) => res.send("Good morning sunshine!"));

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}!`));
