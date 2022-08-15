import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Bean } from "../interfaces/interface";

export interface AddNoteObjIF {
  newNote: {};
  beanId: string;
}

export interface DeleteNoteObjIF {
  beanId: string;
  noteId: string;
}

export interface StatusIF {
  status: number;
  message: string;
}

export interface NoteAddedIF extends StatusIF {
  beanDetails: Bean;
}

export interface Notes {
  isLoading: boolean;
  noteAdded: NoteAddedIF;
  noteDeleted: StatusIF;
}

const initialState: Notes = {
  isLoading: false,
  noteAdded: {
    status: 0,
    message: "",
    beanDetails: {
      _id: "",
      roaster: "",
      name: "",
      level: "",
      img: "",
      notes: [],
    },
  },
  noteDeleted: {
    status: 0,
    message: "",
  },
};

export const addNote = createAsyncThunk<
  NoteAddedIF,
  AddNoteObjIF,
  {
    rejectValue: StatusIF;
  }
>("note/addNote", async (obj: AddNoteObjIF, { rejectWithValue }) => {
  try {
    const res = await api.publicRequest.patch(
      `/beans/addnote/${obj.beanId}`,
      obj.newNote
    );
    return {
      status: res.status,
      beanDetails: res.data,
      message: res.statusText,
    } as NoteAddedIF;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

export const deleteNote = createAsyncThunk<
  StatusIF,
  DeleteNoteObjIF,
  {
    rejectValue: StatusIF;
  }
>("note/deleteNote", async (obj: DeleteNoteObjIF, { rejectWithValue }) => {
  try {
    const res = await api.publicRequest.patch(
      `/beans/deletenote/${obj.beanId}?noteId=${obj.noteId}`
    );
    return {
      status: res.status,
      message: res.statusText,
    } as StatusIF;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.noteAdded = {
        status: 0,
        message: "",
        beanDetails: {
          _id: "",
          roaster: "",
          name: "",
          level: "",
          img: "",
          notes: [],
        },
      };
      state.noteDeleted = {
        status: 0,
        message: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.isLoading = false;
      state.noteAdded.status = action.payload.status;
      state.noteAdded.message = action.payload.message;
      state.noteAdded.beanDetails = action.payload.beanDetails;
    });
    builder.addCase(addNote.rejected, (state, action) => {
      state.isLoading = false;
      state.noteAdded.status = action.payload!.status;
      state.noteAdded.message = action.payload!.message;
      state.noteAdded.beanDetails = {
        _id: "",
        roaster: "",
        name: "",
        level: "",
        img: "",
        notes: [],
      };
    });
    builder.addCase(deleteNote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.isLoading = false;
      state.noteDeleted.status = action.payload.status;
      state.noteDeleted.message = action.payload.message;
    });
    builder.addCase(deleteNote.rejected, (state, action) => {
      state.isLoading = false;
      state.noteDeleted.status = action.payload!.status;
      state.noteDeleted.message = action.payload!.message;
    });
  },
});

export const { reset } = noteSlice.actions;

export default noteSlice.reducer;
