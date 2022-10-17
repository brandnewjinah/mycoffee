import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Tool } from "../interfaces/interface";

export interface StatusIF {
  status: number;
  message: string;
}

export interface ToolAddedIF extends StatusIF {
  toolDetails: Tool;
}

export interface Tools {
  isLoading: boolean;
  toolAdded: ToolAddedIF;
  toolDeleted: StatusIF;
}

const initialState: Tools = {
  isLoading: false,
  toolAdded: {
    status: 0,
    message: "",
    toolDetails: {
      _id: "",
      name: "",
      brand: "",
      description: "",
      instructionsUrl: "",
      img: "",
    },
  },
  toolDeleted: {
    status: 0,
    message: "",
  },
};

export const addTool = createAsyncThunk<
  ToolAddedIF,
  Tool,
  {
    rejectValue: StatusIF;
  }
>("tools/addTool", async (tool: Tool, { rejectWithValue }) => {
  try {
    const res = await api.publicRequest.post(`/tools`, tool);
    return {
      status: res.status,
      toolDetails: res.data,
      message: res.statusText,
    } as ToolAddedIF;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

export const deleteTool = createAsyncThunk<
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

const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.toolAdded = {
        status: 0,
        message: "",
        toolDetails: {
          _id: "",
          name: "",
          brand: "",
          description: "",
          instructionsUrl: "",
          img: "",
        },
      };
      state.toolDeleted = {
        status: 0,
        message: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTool.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addTool.fulfilled, (state, action) => {
      state.isLoading = false;
      state.toolAdded.status = action.payload.status;
      state.toolAdded.message = action.payload.message;
      state.toolAdded.toolDetails = action.payload.toolDetails;
    });
    builder.addCase(addTool.rejected, (state, action) => {
      state.isLoading = false;
      state.toolAdded.status = action.payload!.status;
      state.toolAdded.message = action.payload!.message;
      state.toolAdded.toolDetails = {
        _id: "",
        name: "",
        brand: "",
        description: "",
        instructionsUrl: "",
        img: "",
      };
    });
    builder.addCase(deleteTool.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTool.fulfilled, (state, action) => {
      state.isLoading = false;
      state.toolDeleted.status = action.payload.status;
      state.toolDeleted.message = action.payload.message;
    });
    builder.addCase(deleteTool.rejected, (state, action) => {
      state.isLoading = false;
      state.toolDeleted.status = action.payload!.status;
      state.toolDeleted.message = action.payload!.message;
    });
  },
});

export const { reset } = toolsSlice.actions;

export default toolsSlice.reducer;
