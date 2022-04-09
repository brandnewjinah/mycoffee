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
    origin: {
      type: String,
    },
    taste: {
      type: [String],
    },
    price: {
      type: String,
      required: true,
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
