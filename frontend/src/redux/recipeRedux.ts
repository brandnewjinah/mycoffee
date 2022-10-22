import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Recipes } from "../interfaces/recipeInterface";

export interface RecipesInterface {
  recipes: Recipes;
  isLoading: boolean;
  isError: boolean;
}

const initialState: RecipesInterface = {
  recipes: {
    data: [],
    status: "",
    count: 0,
    page: 0,
    pages: 0,
  },
  isLoading: false,
  isError: false,
};

export const getRecipes = createAsyncThunk(
  "recipe/getRecipes",
  async (page: number) => {
    try {
      const { data } = await api.publicRequest.get(`/recipe?page=${page}`);
      return data;
    } catch (error) {
      return error;
    }
  }
);

const beansSlice = createSlice({
  name: "beans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecipes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRecipes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.recipes = action.payload;
    });
    builder.addCase(getRecipes.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default beansSlice.reducer;
