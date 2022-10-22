import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { NewBean, BeanUpdated } from "../interfaces/beanInterface";
import { Status } from "../interfaces/baseInterface";

export interface BeanResponse extends Status {
  beanDetails: {
    _id: string;
  };
}

export interface Beans {
  isLoading: boolean;
  beanAdded: BeanResponse;
  beanUpdated: BeanResponse;
  beanDeleted: Status;
}

const initialState: Beans = {
  isLoading: false,
  beanAdded: {
    status: 0,
    message: "",
    beanDetails: {
      _id: "",
    },
  },
  beanUpdated: {
    status: 0,
    message: "",
    beanDetails: {
      _id: "",
    },
  },
  beanDeleted: {
    status: 0,
    message: "",
  },
};

export const addBean = createAsyncThunk<
  BeanResponse,
  NewBean,
  {
    rejectValue: Status;
  }
>("beans/addBean", async (bean: NewBean, { rejectWithValue }) => {
  try {
    const res = await api.publicRequest.post(`/beans`, bean);
    return {
      status: res.status,
      beanDetails: { _id: res.data._id },
      message: res.statusText,
    } as BeanResponse;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

export const updateBean = createAsyncThunk<
  BeanResponse,
  BeanUpdated,
  {
    rejectValue: Status;
  }
>("beans/updateBean", async (bean: BeanUpdated, { rejectWithValue }) => {
  try {
    const res = await api.publicRequest.patch(`/beans/${bean._id}`, bean);
    return {
      status: res.status,
      beanDetails: res.data,
      message: res.statusText,
    } as BeanResponse;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

export const deleteBean = createAsyncThunk<
  Status,
  string,
  {
    rejectValue: Status;
  }
>("beans/deleteBean", async (beanId: string, { rejectWithValue }) => {
  try {
    const res = await api.publicRequest.delete(`/beans/${beanId}`);
    return { status: res.status, message: res.statusText } as Status;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

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
        },
      };
      state.beanUpdated = {
        status: 0,
        message: "",
        beanDetails: {
          _id: "",
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
      };
    });
    builder.addCase(updateBean.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateBean.fulfilled, (state, action) => {
      state.isLoading = false;
      state.beanUpdated.status = action.payload.status;
      state.beanUpdated.message = action.payload.message;
      state.beanUpdated.beanDetails = action.payload.beanDetails;
    });
    builder.addCase(updateBean.rejected, (state, action) => {
      state.isLoading = false;
      state.beanUpdated.status = action.payload!.status;
      state.beanUpdated.message = action.payload!.message;
      state.beanUpdated.beanDetails = {
        _id: "",
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
