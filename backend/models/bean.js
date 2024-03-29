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
    process: {
      type: String,
    },
    description: {
      type: String,
    },
    region: {
      type: [String],
    },
    variety: {
      type: [String],
    },
    flavor: [
      {
        id: {
          type: Number,
        },
        value: {
          type: String,
        },
      },
    ],
    notes: [
      {
        date: {
          type: String,
        },
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
