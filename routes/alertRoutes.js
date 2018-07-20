const express = require("express");
const router = express.Router();

const alertModel = require("../models/alertModel");

router.get("/", (req, res) => {
  alertModel
    .find()
    .then(alerts => {
      res.json({ done: true, alert: alerts });
    })
    .catch(error => {
      res.json({ done: false, error: error });
    });
});

router.post("/", (req, res) => {
  let newAlert = new alertModel({
    skill: req.body.skill,
    unread: req.body.unread
  });

  newAlert
    .save()
    .then(alert => {
      res.json({ done: true, alert: alert });
    })
    .catch(error => {
      res.json({ done: true, error: error });
    });
});
module.exports = router;
