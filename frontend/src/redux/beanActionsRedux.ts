import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Bean } from "../interfaces/interface";

export interface Beans {
  isLoading: boolean;
  beanAdded: boolean;
  beanDeleted: boolean;
  beanDetails: Bean;
  isError: boolean;
}

const initialState: Beans = {
  isLoading: false,
  beanAdded: false,
  beanDeleted: false,
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

export const deleteBean = createAsyncThunk(
  "beans/deleteBean",
  async (beanId: string) => {
    try {
      const { data } = await api.publicRequest.delete(`/beans/${beanId}`);
      return data;
    } catch (error) {}
  }
);

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
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.beanAdded = false;
      state.isError = false;
      state.beanDetails = {
        _id: "",
        roaster: "",
        name: "",
        level: "",
        img: "",
        notes: [],
      };
    },
  },
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
    builder.addCase(deleteBean.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBean.fulfilled, (state, action) => {
      state.isLoading = false;
      state.beanDeleted = true;
    });
    builder.addCase(deleteBean.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { reset } = beansSlice.actions;

export default beansSlice.reducer;
