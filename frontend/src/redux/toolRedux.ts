import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Tool } from "../interfaces/interface";

export interface Tools {
  tools: Tool[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: Tools = {
  tools: [],
  isLoading: false,
  isError: false,
};

export const getTools = createAsyncThunk("tools/getTools", async () => {
  try {
    const { data } = await api.publicRequest.get(`/tools`);
    return data;
  } catch (error) {
    return error;
  }
});

const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTools.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTools.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tools = action.payload;
    });
    builder.addCase(getTools.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default toolsSlice.reducer;
