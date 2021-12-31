import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    collection: [],
  },
  reducers: {
    addCoffee: (state, action) => {},
  },
});

export default collectionSlice.reducer;
