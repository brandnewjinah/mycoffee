// Action types
const ADD_TOOL = "ADD_TOOL";

const DELETE_TOOL = "DELETE_TOOL";

// Action creators
export const addTool = (item) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TOOL,
      payload: {
        item,
      },
    });
  };
};

export const deleteTool = (item) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_TOOL,
      payload: {
        item,
      },
    });
  };
};

// State
const initialState = {
  tools: [],
};

// Reducer
const reducer = (state = initialState, action) => {
  if (action.type === ADD_TOOL) {
    let newTool = action.payload.item;

    let newTools = [...state.tools, newTool];

    return { ...state, tools: newTools };
  }

  if (action.type === DELETE_TOOL) {
    let tool = action.payload.item;
    let newTools = [...state.tools];

    newTools = newTools.filter((c) => c.id !== tool.id);

    return { ...state, tools: newTools };
  }

  return state;
};

export default reducer;
