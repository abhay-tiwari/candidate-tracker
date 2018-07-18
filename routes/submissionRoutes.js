const express = require("express");
const router = express.Router();

const submissionModel = require("../models/submissionsModel");

router.post("/", (req, res) => {
  let newSubmission = new submissionModel({
    name: req.body.name,
    experience: req.body.experience,
    jobLocation: req.body.jobLocation,
    expectedJoining: req.body.expectedJoining,
    skills: req.body.skills,
    gender: req.body.gender
  });

  newSubmission
    .save()
    .then(submission => {
      res.json({ done: true, submission: submission });
    })
    .catch(error => {
      res.json({ done: false, error: error });
    });
});

router.get("/", (req, res) => {
  submissionModel
    .find()
    .then(submissions => {
      res.json({ done: true, submissions: submissions });
    })
    .catch(error => {
      res.json({ done: false, error: error });
    });
});
module.exports = router;
