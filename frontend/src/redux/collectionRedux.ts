import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { Bean } from "../interfaces/interface";

export interface Beans {
  beans: Bean[];
}

const initialState: Beans = {
  beans: [],
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addBean: (state, action) => {
      state.beans = [...state.beans, action.payload];
    },
    addNote: (state, action) => {
      const newNote = action.payload;
      const newBeans = current(state.beans);
      const index = newBeans.findIndex((item) => item.id === newNote.beanId);
      let thisBean = newBeans[index];

      let newNotes = [...thisBean.notes, newNote.data];
      thisBean = { ...thisBean, notes: newNotes };

      console.log(thisBean);
      // newCollection[index] = thisBean;

      // return { ...state, collection: newCollection };
    },
  },
});
export const { addBean, addNote } = collectionSlice.actions;
export default collectionSlice.reducer;
