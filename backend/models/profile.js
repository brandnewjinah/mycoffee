const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    height: {
      value: {
        type: String,
      },
      unit: {
        type: String,
      },
    },
    weight: {
      tvalue: {
        type: String,
      },
      unit: {
        type: String,
      },
    },
    goal_weight: {
      value: {
        type: String,
      },
      unit: {
        type: String,
      },
    },

    health_goal: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("profile", profileSchema);

// const mongoose = require("mongoose");

// const profileSchema = mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "user",
//       required: true,
//     },
//     handle: {
//       type: String,
//       required: true,
//       max: 40,
//     },
//     company: {
//       type: String,
//     },
//     website: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("profile", profileSchema);
