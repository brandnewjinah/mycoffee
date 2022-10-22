import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Status } from "../interfaces/baseInterface";
import { BeanDetails } from "../interfaces/beanInterface";

export interface BeanDetailsResponse extends Status {
  beanDetails: BeanDetails;
}

export interface BeanState extends BeanDetailsResponse {
  isLoading: boolean;
}

const initialState: BeanState = {
  beanDetails: {
    _id: "",
    roaster: "",
    name: "",
    level: "",
    img: "",
    process: "",
    description: "",
    region: [],
    variety: [],
    notes: [],
  },
  isLoading: false,
  status: 0,
  message: "",
};

export const getBeanDetails = createAsyncThunk<
  BeanDetailsResponse,
  string,
  {
    rejectValue: Status;
  }
>("beanDetails/getBeanDetails", async (beanId: string, { rejectWithValue }) => {
  try {
    const res = await api.publicRequest.get(`/beans/${beanId}`);
    return {
      status: res.status,
      beanDetails: res.data,
      message: res.statusText,
    } as BeanDetailsResponse;
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
        process: "",
        description: "",
        region: [],
        variety: [],
        notes: [],
      };
    });
  },
});

export default beanDetailsSlice.reducer;
