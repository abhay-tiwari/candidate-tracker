const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");

router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  userModel
    .findOne({ email: email })
    .then(user => {
      if (user.password == password) {
        let payload = { id: user._id };
        let token = jwt.sign(payload, "test");

        res.json({ done: true, message: "login successful", token: token });
      } else {
        res.json({
          done: false,
          message: "email or password is incorrect."
        });
      }
    })
    .catch(error => {
      res.json({
        done: false,
        error: error,
        message: "email or password is incorrect."
      });
    });
});

module.exports = router;
