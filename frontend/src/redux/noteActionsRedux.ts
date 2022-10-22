import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Note } from "../interfaces/noteInterface";
import { Status } from "../interfaces/baseInterface";

export interface AddNoteParamsIF {
  newNote: Note;
  beanId: string;
}

export interface DeleteNoteParamsIF {
  beanId: string;
  noteId: string;
}

export interface NoteAddedResponse extends Status {
  beanDetails: {
    _id: string;
    notes: Note[];
  };
}

export interface Notes {
  isLoading: boolean;
  noteAdded: NoteAddedResponse;
  noteDeleted: Status;
}

const initialState: Notes = {
  isLoading: false,
  noteAdded: {
    status: 0,
    message: "",
    beanDetails: {
      _id: "",
      notes: [],
    },
  },
  noteDeleted: {
    status: 0,
    message: "",
  },
};

export const addNote = createAsyncThunk<
  NoteAddedResponse,
  AddNoteParamsIF,
  {
    rejectValue: Status;
  }
>("note/addNote", async (obj: AddNoteParamsIF, { rejectWithValue }) => {
  try {
    const res = await api.publicRequest.patch(
      `/beans/addnote/${obj.beanId}`,
      obj.newNote
    );
    return {
      status: res.status,
      beanDetails: { _id: res.data._id, notes: res.data.notes },
      message: res.statusText,
    } as NoteAddedResponse;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

export const deleteNote = createAsyncThunk<
  Status,
  DeleteNoteParamsIF,
  {
    rejectValue: Status;
  }
>("note/deleteNote", async (obj: DeleteNoteParamsIF, { rejectWithValue }) => {
  try {
    const res = await api.publicRequest.patch(
      `/beans/deletenote/${obj.beanId}?noteId=${obj.noteId}`
    );
    return {
      status: res.status,
      message: res.statusText,
    } as Status;
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
