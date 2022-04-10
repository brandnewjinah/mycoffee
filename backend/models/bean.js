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
        roastDate: {
          type: String,
        },
        dose: {
          type: String,
        },
        grind: {
          type: String,
        },
        time: {
          type: String,
        },
        shot: {
          type: String,
        },
        features: [
          {
            feature: {
              type: String,
            },
            value: {
              type: Number,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Bean = mongoose.model("Bean", beanSchema);

export default Bean;
