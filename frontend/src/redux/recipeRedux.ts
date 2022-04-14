import { createSlice, current } from "@reduxjs/toolkit";
import { Recipe } from "../interfaces/interface";

export interface Recipes {
  recipe: Recipe;
}

const initialState = {
  recipe: {
    id: "",
    name: "",
    desc: "",
    ingredients: [],
    directions: [],
    ratio: [],
  },
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.recipe = action.payload;
    },
    addIngredients: (state, action) => {
      const newIngredient = action.payload;
      let newRecipe = { ...current(state.recipe) };
      newRecipe = { ...newRecipe, ingredients: newIngredient };
      state.recipe = newRecipe;
    },
    addDirections: (state, action) => {
      const newDirections = action.payload;
      let newRecipe = { ...current(state.recipe) };
      newRecipe = { ...newRecipe, directions: newDirections };
      state.recipe = newRecipe;
    },
    addRatio: (state, action) => {
      const newRatio = action.payload;
      let newRecipe = { ...current(state.recipe) };
      newRecipe = { ...newRecipe, ratio: newRatio };
      state.recipe = newRecipe;
    },
  },
});
export const { addRecipe, addIngredients, addDirections, addRatio } =
  recipeSlice.actions;
export default recipeSlice.reducer;
