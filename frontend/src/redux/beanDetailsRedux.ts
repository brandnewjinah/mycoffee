import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Bean } from "../interfaces/interface";

export interface ErrorIF {
  status: number;
  message: string;
}

export interface BeanDetailsIF extends ErrorIF {
  beanDetails: Bean;
}

export interface BeanDetailsStateIF extends BeanDetailsIF {
  isLoading: boolean;
}

const initialState: BeanDetailsStateIF = {
  beanDetails: {
    _id: "",
    roaster: "",
    name: "",
    level: "",
    img: "",
    notes: [],
  },
  isLoading: false,
  status: 404,
  message: "",
};

export const getBeanDetails = createAsyncThunk<
  BeanDetailsIF,
  string,
  {
    rejectValue: ErrorIF;
  }
>("beanDetails/getBeanDetails", async (beanId: string, { rejectWithValue }) => {
  try {
    const res = await api.publicRequest.get(`/beans/${beanId}`);
    return {
      status: res.status,
      beanDetails: res.data,
      message: res.statusText,
    } as BeanDetailsIF;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

const beanDetailsSlice = createSlice({
  name: "beanDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBeanDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBeanDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.beanDetails = action.payload.beanDetails;
    });
    builder.addCase(getBeanDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload!.status;
      state.message = action.payload!.message;
      state.beanDetails = {
        _id: "",
        roaster: "",
        name: "",
        level: "",
        img: "",
        notes: [],
      };
    });
  },
});

export default beanDetailsSlice.reducer;
