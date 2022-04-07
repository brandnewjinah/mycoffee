import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { Recipe } from "../interfaces/interface";

export interface Recipes {
  recipes: Recipe[];
}

const initialState: Recipes = {
  recipes: [],
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.recipes = [...state.recipes, action.payload];
    },
    addIngredients: (state, action) => {
      const newIngredient = action.payload;
      let newRecipes = [...current(state.recipes)];
      const index = newRecipes.findIndex(
        (item) => item.id === newIngredient.recipeId
      );
      let thisRecipe = newRecipes[index];

      thisRecipe = { ...thisRecipe, ingredients: newIngredient.ingredients };

      newRecipes[index] = thisRecipe;

      state.recipes = newRecipes;
    },
  },
});
export const { addRecipe, addIngredients } = recipeSlice.actions;
export default recipeSlice.reducer;
