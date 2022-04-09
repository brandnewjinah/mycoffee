import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Bean } from "../interfaces/interface";

export interface Beans {
  beans: Bean[];
  isLoading: boolean;
  beanAdded: boolean;
  isError: boolean;
}

const initialState: Beans = {
  beans: [],
  isLoading: false,
  beanAdded: false,
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

export const addBean = createAsyncThunk(
  "beans/addBeanss",
  async (bean: Bean) => {
    try {
      await api.publicRequest.post(`/beans`, bean);
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
    builder.addCase(addBean.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addBean.fulfilled, (state, action) => {
      state.isLoading = false;
      state.beanAdded = true;
    });
    builder.addCase(addBean.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default beansSlice.reducer;
