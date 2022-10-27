import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { BeanDetails } from "../interfaces/beanInterface";
import { Status } from "../interfaces/baseInterface";

interface SearchState extends Status {
  isLoading: boolean;
  result: BeanDetails[];
}

const initialState: SearchState = {
  isLoading: false,
  status: 0,
  message: "",
  result: [],
};

export const searchBeans = createAsyncThunk<
  SearchState,
  string,
  {
    rejectValue: Status;
  }
>("beans/getBeans", async (query: string, { rejectWithValue }) => {
  try {
    const res = await api.publicRequest.get(`/beans?search=${query}`);
    return {
      isLoading: false,
      status: res.status,
      message: res.statusText,
      result: res.data,
    } as SearchState;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchBeans.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchBeans.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.result = action.payload.result;
    });
    builder.addCase(searchBeans.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload!.status;
      state.message = action.payload!.message;
    });
  },
});

export default searchSlice.reducer;
