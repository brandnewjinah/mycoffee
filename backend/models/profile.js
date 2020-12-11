const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    method: [
      {
        id: {
          type: Number,
          required: true,
        },

        title: {
          type: String,
          required: true,
        },
      },
    ],
    roast: [
      {
        id: {
          type: Number,
          required: true,
        },

        title: {
          type: String,
          required: true,
        },
      },
    ],
    beans: [
      {
        id: {
          type: Number,
          required: true,
        },

        title: {
          type: String,
          required: true,
        },
      },
    ],
    taste: [
      {
        id: {
          type: Number,
          required: true,
        },

        title: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("profile", profileSchema);
