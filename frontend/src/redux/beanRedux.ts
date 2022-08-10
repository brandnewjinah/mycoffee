import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Bean } from "../interfaces/interface";

export interface Beans {
  beans: Bean[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: Beans = {
  beans: [],
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
  },
});

export default beansSlice.reducer;
