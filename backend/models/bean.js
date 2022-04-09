import mongoose from "mongoose";

const beanSchema = mongoose.Schema(
  {
    roaster: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    notes: [
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

const Bean = mongoose.model("Bean", beanSchema);

export default Bean;
