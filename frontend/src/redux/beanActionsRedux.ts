import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Bean } from "../interfaces/interface";

export interface StatusIF {
  status: number;
  message: string;
}

export interface BeanAddedIF extends StatusIF {
  beanDetails: Bean;
}

export interface Beans {
  isLoading: boolean;
  beanAdded: BeanAddedIF;
  beanDeleted: StatusIF;
}

const initialState: Beans = {
  isLoading: false,
  beanAdded: {
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
  beanDeleted: {
    status: 0,
    message: "",
  },
};

export const addBean = createAsyncThunk<
  BeanAddedIF,
  Bean,
  {
    rejectValue: StatusIF;
  }
>("beans/addBean", async (bean: Bean, { rejectWithValue }) => {
  try {
    const res = await api.publicRequest.post(`/beans`, bean);
    return {
      status: res.status,
      beanDetails: res.data,
      message: res.statusText,
    } as BeanAddedIF;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

export const deleteBean = createAsyncThunk<
  StatusIF,
  string,
  {
    rejectValue: StatusIF;
  }
>("beans/deleteBean", async (beanId: string, { rejectWithValue }) => {
  try {
    const res = await api.publicRequest.delete(`/beans/${beanId}`);
    return { status: res.status, message: res.statusText } as StatusIF;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
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
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.beanAdded = {
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
      state.beanDeleted = {
        status: 0,
        message: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBean.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addBean.fulfilled, (state, action) => {
      state.isLoading = false;
      state.beanAdded.status = action.payload.status;
      state.beanAdded.message = action.payload.message;
      state.beanAdded.beanDetails = action.payload.beanDetails;
    });
    builder.addCase(addBean.rejected, (state, action) => {
      state.isLoading = false;
      state.beanAdded.status = action.payload!.status;
      state.beanAdded.message = action.payload!.message;
      state.beanAdded.beanDetails = {
        _id: "",
        roaster: "",
        name: "",
        level: "",
        img: "",
        notes: [],
      };
    });
    builder.addCase(deleteBean.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBean.fulfilled, (state, action) => {
      state.isLoading = false;
      state.beanDeleted.status = action.payload.status;
      state.beanDeleted.message = action.payload.message;
    });
    builder.addCase(deleteBean.rejected, (state, action) => {
      state.isLoading = false;
      state.beanDeleted.status = action.payload!.status;
      state.beanDeleted.message = action.payload!.message;
    });
  },
});

export const { reset } = beansSlice.actions;

export default beansSlice.reducer;
