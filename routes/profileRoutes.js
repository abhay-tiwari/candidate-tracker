const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.headers.authorization != null) {
    res.json({ auth: true });
  } else {
    res.json({ auth: false });
  }
});

module.exports = router;
