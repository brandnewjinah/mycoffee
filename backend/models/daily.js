const mongoose = require("mongoose");

const dailySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    experience: [
      {
        title: {
          type: String,
          required: true,
        },
        company: {
          type: String,
          required: true,
        },
        location: {
          type: String,
        },
        from: {
          type: Date,
          required: true,
        },
        to: {
          type: Date,
        },
        current: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("daily", dailySchema);
