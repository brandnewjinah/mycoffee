import mongoose from "mongoose";

const recipeSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    ingredients: [
      {
        id: {
          type: String,
        },
        ingredient: {
          type: String,
        },
        unit: {
          type: String,
        },
        value: {
          type: String,
        },
      },
    ],
    directions: [
      {
        id: {
          type: String,
        },
        direction: {
          type: String,
        },
      },
    ],
    ratio: [
      {
        id: {
          type: String,
        },
        ingredient: {
          type: String,
        },
        value: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
