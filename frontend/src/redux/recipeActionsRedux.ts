import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Recipe } from "../interfaces/recipeInterface";
import { Status } from "../interfaces/baseInterface";

export interface RecipeResponse extends Status {
  recipeDetails: {
    _id: string;
  };
}

export interface Recipes {
  isLoading: boolean;
  recipe: Recipe;
  recipeAdded: RecipeResponse;
  recipeDeleted: Status;
}

const initialState: Recipes = {
  isLoading: false,
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
  recipeAdded: {
    status: 0,
    message: "",
    recipeDetails: {
      _id: "",
    },
  },
  recipeDeleted: {
    status: 0,
    message: "",
  },
};

export const addRecipe = createAsyncThunk<
  RecipeResponse,
  Recipe,
  {
    rejectValue: Status;
  }
>("recipe/addRecipe", async (recipe: Recipe, { rejectWithValue }) => {
  try {
    const res = await api.publicRequest.post(`/recipe`, recipe);
    return {
      status: res.status,
      recipeDetails: { _id: res.data._id },
      message: res.statusText,
    } as RecipeResponse;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

export const deleteRecipe = createAsyncThunk<
  Status,
  string,
  {
    rejectValue: Status;
  }
>("recipe/deleteRecipe", async (recipeId: string, { rejectWithValue }) => {
  try {
    const res = await api.publicRequest.delete(`/recipe/${recipeId}`);
    return { status: res.status, message: res.statusText } as Status;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

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
      state.isLoading = false;
      state.recipe = {
        _id: "",
        id: "",
        name: "",
        desc: "",
        type: "",
        ingredients: [],
        directions: [],
        ratio: [],
      };
      state.recipeAdded = {
        status: 0,
        message: "",
        recipeDetails: {
          _id: "",
        },
      };
      state.recipeDeleted = {
        status: 0,
        message: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addRecipe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addRecipe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.recipeAdded.status = action.payload!.status;
      state.recipeAdded.message = action.payload!.message;
      state.recipeAdded.recipeDetails = action.payload.recipeDetails;
    });
    builder.addCase(addRecipe.rejected, (state, action) => {
      state.isLoading = false;
      state.recipeAdded.status = action.payload!.status;
      state.recipeAdded.message = action.payload!.message;
      state.recipeAdded.recipeDetails = {
        _id: "",
      };
    });
    builder.addCase(deleteRecipe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.recipeDeleted.status = action.payload.status;
      state.recipeDeleted.message = action.payload.message;
    });
    builder.addCase(deleteRecipe.rejected, (state, action) => {
      state.isLoading = false;
      state.recipeDeleted.status = action.payload!.status;
      state.recipeDeleted.message = action.payload!.message;
    });
  },
});
export const { createRecipe, addIngredients, addDirections, reset } =
  recipeSlice.actions;
export default recipeSlice.reducer;
