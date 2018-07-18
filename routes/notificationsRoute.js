const express = require("express");
const Router = express.Router();

const notificationModel = require("../models/notificationModel");

Router.post("/", (req, res) => {
  let newNotification = new notificationModel({
    skill: req.body.skill,
    name: req.body.name,
    email: req.body.email
  });

  newNotification
    .save()
    .then(notification => {
      res.json({ done: true, notification: notification });
    })
    .catch(error => {
      res.json({ done: false, error: error });
    });
});

Router.get("/", (req, res) => {
  notificationModel
    .find()
    .then(notifications => {
      res.json({ done: true, notifications: notifications });
    })
    .catch(error => {
      res.json({ done: false, error: error });
    });
});

module.exports = Router;
