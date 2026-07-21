const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      default: "🏆",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Achievement", achievementSchema);