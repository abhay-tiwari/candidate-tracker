const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    require: true
  },
  jobLocation: {
    type: String,
    required: true
  },
  expectedJoining: {
    type: Date,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  gender: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("submissions", submissionSchema);
