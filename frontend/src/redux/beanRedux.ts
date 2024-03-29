import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { BeanDetails } from "../interfaces/beanInterface";
import { Status } from "../interfaces/baseInterface";

interface BeansParams {
  category?: string;
  page?: number;
}

interface BeansGroup {
  initial: string;
  beans: BeanDetails[];
}

interface BeansState extends Status {
  isLoading: boolean;
  list: BeansGroup[];
}

const initialState: BeansState = {
  isLoading: false,
  status: 0,
  message: "",
  list: [], //or
};

export const getBeans = createAsyncThunk<
  BeansState,
  BeansParams,
  {
    rejectValue: Status;
  }
>("beans/getBeans", async (obj: BeansParams, { rejectWithValue }) => {
  try {
    const res = await api.publicRequest.get(`/beans?category=${obj.category}`);
    return {
      isLoading: false,
      status: res.status,
      message: res.statusText,
      list: res.data,
    } as BeansState;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
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
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.list = action.payload.list;
    });
    builder.addCase(getBeans.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload!.status;
      state.message = action.payload!.message;
    });
  },
});

export default beansSlice.reducer;
