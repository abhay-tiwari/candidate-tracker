const mongoose = require("mongoose");

const alertSchema = mongoose.Schema({
  skill: {
    type: String,
    required: true
  },
  unread: {
    type: Boolean,
    required: true
  },
  userid: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("alert", alertSchema);
