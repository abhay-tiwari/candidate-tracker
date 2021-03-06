const express = require("express");
const router = express.Router();

const alertModel = require("../models/alertModel");

router.get("/", (req, res) => {
  let userid = req.query.userid;
  alertModel
    .find({ userid: userid })
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
    unread: req.body.unread,
    userid: req.body.userid
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

router.put("/:id", (req, res) => {
  alertModel
    .findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(alert => {
      res.json({ done: true, alert: alert });
    })
    .catch(error => {
      res.json({ done: false, error: error });
    });
});
module.exports = router;
