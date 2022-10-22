import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Roaster } from "../interfaces/beanInterface";

export interface Roasters {
  roasters: Roaster[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: Roasters = {
  roasters: [],
  isLoading: false,
  isError: false,
};

export const getRoasters = createAsyncThunk(
  "roasters/getRoasters",
  async () => {
    try {
      const { data } = await api.publicRequest.get(`/coffeeData.json`);
      return data;
    } catch (error) {
      return error;
    }
  }
);

const roastersSlice = createSlice({
  name: "roasters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoasters.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRoasters.fulfilled, (state, action) => {
      state.isLoading = false;
      state.roasters = action.payload;
    });
    builder.addCase(getRoasters.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default roastersSlice.reducer;
