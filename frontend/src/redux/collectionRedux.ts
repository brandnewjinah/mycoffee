import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Bean, Note } from "../interfaces/interface";

export interface Beans {
  beans: Bean[];
}

const initialState: Beans = {
  beans: [],
};

export const addBeansss = createAsyncThunk(
  "collection/addBeanss",
  async (file: Bean) => {
    console.log(file);
  }
);

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addBean: (state, action) => {
      // state.beans = [...state.beans, action.payload];
      console.log(action.payload);
    },
    addNote: (state, action) => {
      const newNote = action.payload;
      let newBeans = [...current(state.beans)];
      // const index = newBeans.findIndex((item) => item.id === newNote.beanId);
      // let thisBean = newBeans[index];

      // let newNotes = [...thisBean.notes, newNote.newNote];
      // thisBean = { ...thisBean, notes: newNotes };

      // newBeans[index] = thisBean;

      // state.beans = newBeans;
    },
    deleteBean: (state, action) => {
      let newBeans = [...current(state.beans)];
      // newBeans = newBeans.filter((bean) => bean.id !== action.payload);
      // state.beans = newBeans;
    },
  },
});
export const { addBean, addNote, deleteBean } = collectionSlice.actions;
export default collectionSlice.reducer;
