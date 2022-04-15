import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Bean, Recipe } from "../interfaces/interface";

export interface Recipes {
  beans: Bean[];
  recipeDetails: Recipe;
  isLoading: boolean;
  isError: boolean;
}

const initialState: Recipes = {
  beans: [],
  recipeDetails: {
    _id: "",
    id: "",
    name: "",
    desc: "",
    ingredients: [],
    directions: [],
    ratio: [],
  },
  isLoading: false,
  isError: false,
};

export const getBeans = createAsyncThunk("beans/getBeans", async () => {
  try {
    const { data } = await api.publicRequest.get(`/beans`);
    return data;
  } catch (error) {
    return error;
  }
});

export const getRecipeDetails = createAsyncThunk(
  "recipe/getRecipeDetails",
  async (recipeId: string) => {
    try {
      const { data } = await api.publicRequest.get(`/recipe/${recipeId}`);
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
    builder.addCase(getBeans.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBeans.fulfilled, (state, action) => {
      state.isLoading = false;
      state.beans = action.payload;
    });
    builder.addCase(getBeans.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(getRecipeDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRecipeDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.recipeDetails = action.payload;
    });
    builder.addCase(getRecipeDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default beansSlice.reducer;
