import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    collection: [],
  },
  reducers: {
    addBean: (state, action) => {
      state.collection = [...state.collection, action.payload];
    },
  },
});
export const { addBean } = collectionSlice.actions;
export default collectionSlice.reducer;
