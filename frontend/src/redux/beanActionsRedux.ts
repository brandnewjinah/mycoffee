import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Bean } from "../interfaces/interface";

export interface Beans {
  isLoading: boolean;
  beanAdded: boolean;
  isError: boolean;
}

const initialState: Beans = {
  isLoading: false,
  beanAdded: false,
  isError: false,
};

export const addBean = createAsyncThunk("beans/addBean", async (bean: Bean) => {
  try {
    await api.publicRequest.post(`/beans`, bean);
  } catch (error) {
    return error;
  }
});

export const addNote = createAsyncThunk(
  "beans/addNote",
  async (obj: { newNote: {}; beanId: string }) => {
    try {
      const { data } = await api.publicRequest.patch(
        `/beans/${obj.beanId}`,
        obj.newNote
      );
      // return data;
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
