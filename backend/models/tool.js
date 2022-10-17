import mongoose from "mongoose";

const toolSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    instructionsUrl: {
      type: String,
    },
    img: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tool = mongoose.model("Tool", toolSchema);

export default Tool;
