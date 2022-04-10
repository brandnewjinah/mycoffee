import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Bean } from "../interfaces/interface";

export interface Beans {
  isLoading: boolean;
  beanAdded: boolean;
  beanDetails: Bean;
  isError: boolean;
}

const initialState: Beans = {
  isLoading: false,
  beanAdded: false,
  beanDetails: {
    _id: "",
    roaster: "",
    name: "",
    level: "",
    img: "",
    notes: [],
  },
  isError: false,
};

export const addBean = createAsyncThunk("beans/addBean", async (bean: Bean) => {
  try {
    const { data } = await api.publicRequest.post(`/beans`, bean);
    return data;
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
      state.beanDetails = action.payload;
    });
    builder.addCase(addBean.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default beansSlice.reducer;
