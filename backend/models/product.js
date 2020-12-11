const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    roaster: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
    },
    roast: {
      type: String,
    },
    taste: {
      type: [String],
    },
    price: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      max: 100,
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        text: {
          type: String,
        },
        name: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
