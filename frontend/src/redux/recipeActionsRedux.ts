import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Recipe } from "../interfaces/interface";

export interface Recipes {
  isLoading: boolean;
  recipeAdded: boolean;
  recipe: Recipe;
  isError: boolean;
}

const initialState = {
  isLoading: false,
  recipeAdded: false,
  isError: false,
  recipe: {
    _id: "",
    id: "",
    name: "",
    desc: "",
    type: "",
    ingredients: [],
    directions: [],
    ratio: [],
  },
};

export const addRecipe = createAsyncThunk(
  "recipe/addRecipe",
  async (recipe: Recipe) => {
    try {
      const { data } = await api.publicRequest.post(`/recipe`, recipe);
      return data;
    } catch (error) {
      return error;
    }
  }
);

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    createRecipe: (state, action) => {
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
    reset: (state) => {
      state.recipeAdded = false;
      state.isLoading = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addRecipe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addRecipe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.recipeAdded = true;
      state.recipe = action.payload;
    });
    builder.addCase(addRecipe.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export const { createRecipe, addIngredients, addDirections, reset } =
  recipeSlice.actions;
export default recipeSlice.reducer;
