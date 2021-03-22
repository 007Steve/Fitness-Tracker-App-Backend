const mongoose = require("mongoose");

const goalsSchema = new mongoose.Schema(
  {
    sleep: {
      type: String,
    },
    water: {
      type: String,
    },
    calories: {
      type: String,
    },
    steps: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Goals = mongoose.model("Goals", goalsSchema);
module.exports = Goals;
