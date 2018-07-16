const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const jsonWebToken = require("jsonwebtoken");

const userRoute = require("./routes/userRoutes");
const databaseConfig = require("./config/databaseConfig");

const port = 5000;

const app = express();

app.use(passport.initialize());

mongoose.connect(
  databaseConfig.url,
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => console.log("connected to mongodb"));
mongoose.connection.on("error", error => console.log(error));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/users", userRoute);

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
