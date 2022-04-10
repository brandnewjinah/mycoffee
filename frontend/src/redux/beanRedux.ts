import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Bean } from "../interfaces/interface";

export interface Beans {
  beans: Bean[];
  beanDetails: Bean;
  isLoading: boolean;
  isError: boolean;
}

const initialState: Beans = {
  beans: [],
  beanDetails: {
    _id: "",
    roaster: "",
    name: "",
    level: "",
    img: "",
    notes: [],
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

export const getBeanDetails = createAsyncThunk(
  "beans/getBeanDetails",
  async (beanId: string) => {
    try {
      const { data } = await api.publicRequest.get(`/beans/${beanId}`);
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
    builder.addCase(getBeanDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBeanDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.beanDetails = action.payload;
    });
    builder.addCase(getBeanDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default beansSlice.reducer;
