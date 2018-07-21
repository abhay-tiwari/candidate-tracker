const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const jsonWebToken = require("jsonwebtoken");
const cors = require("cors");

const userRoute = require("./routes/userRoutes");
const submissionRoute = require("./routes/submissionRoutes");
const notificationRoute = require("./routes/notificationsRoute");
const profileRoute = require("./routes/profileRoutes");
const alertRoutes = require("./routes/alertRoutes");
const databaseConfig = require("./config/databaseConfig");

const port = 5000;

const app = express();

app.use(passport.initialize());
app.use(cors());

mongoose.connect(
  databaseConfig.url,
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => console.log("connected to mongodb"));
mongoose.connection.on("error", error => console.log(error));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/users", userRoute);
app.use("/api/submissions", submissionRoute);
app.use("/api/notification", notificationRoute);
app.use("/api/alerts", alertRoutes);
app.use("/api/profile", profileRoute);

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
