const mongoose = require("mongoose");

const exercisesSchema = new mongoose.Schema({
  exerciseID: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Exercise", exercisesSchema);
