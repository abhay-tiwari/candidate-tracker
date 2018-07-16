const passport = require("passport");
const passportJWT = require("passport-jwt");

const extractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const userModel = require("../models/userModel");

let jwtOptions = {};
jwtOptions.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "test";

let newStrategy = new JWTStrategy(jwtOptions, (jwt_payload, callback) => {
  let user = userModel.findOne({ _id: jwt_payload._id });

  if (user) {
    callback(null, user);
  } else {
    callback(null, false);
  }
});

passport.use(newStrategy);
