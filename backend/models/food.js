const mongoose = require("mongoose");

const foodSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    serving: {
      value: {
        type: String,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
    },
    calories: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
    },
    carb: {
      type: Number,
    },
    protein: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("food", foodSchema);
