import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { BeanDetails } from "../interfaces/beanInterface";
import { Status } from "../interfaces/baseInterface";

interface BeansParams {
  category?: string;
  page?: number;
}

interface BeansList {
  initial?: string;
  beans: BeanDetails[];
}

interface BeansResponse extends Status {
  list: BeansList[];
}

interface Beans {
  isLoading: boolean;
  beans: BeansResponse;
}

const initialState: Beans = {
  isLoading: false,
  beans: {
    status: 0,
    message: "",
    list: [],
  },
};

export const getBeans = createAsyncThunk<
  BeansResponse,
  BeansParams,
  {
    rejectValue: Status;
  }
>("beans/getBeans", async (obj: BeansParams, { rejectWithValue }) => {
  try {
    const res = await api.publicRequest.get(`/beans?category=${obj.category}`);
    return {
      status: res.status,
      message: res.statusText,
      list: res.data,
    } as BeansResponse;
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
      state.beans.status = action.payload.status;
      state.beans.message = action.payload.message;
      state.beans.list = action.payload.list;
    });
    builder.addCase(getBeans.rejected, (state, action) => {
      state.isLoading = false;
      state.beans.status = action.payload!.status;
      state.beans.message = action.payload!.message;
    });
  },
});

export default beansSlice.reducer;
