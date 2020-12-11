const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
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
});

module.exports = mongoose.model("product", productSchema);
