// Action types
const ADD_TOOL = "ADD_TOOL";
const EDIT_COFFEE = "EDIT_COFFEE";
const DELETE_TOOL = "DELETE_TOOL";
const RESET_COFFEE = "RESET_COFFEE";

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

export const editCoffee = (item) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_COFFEE,
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

export const resetCoffee = (item) => {
  return (dispatch) => {
    dispatch({
      type: RESET_COFFEE,
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

  if (action.type === EDIT_COFFEE) {
    let updatedCoffee = action.payload.item;
    let newCollection = [...state.collection];
    const index = newCollection.findIndex(
      (item) => item.id === updatedCoffee.id
    );
    newCollection[index] = updatedCoffee;

    return { ...state, collection: newCollection };
  }

  if (action.type === DELETE_TOOL) {
    let tool = action.payload.item;
    let newTools = [...state.tools];

    newTools = newTools.filter((c) => c.id !== tool.id);

    return { ...state, tools: newTools };
  }

  if (action.type === RESET_COFFEE) {
    let newCollection = [];

    return { ...state, collection: newCollection };
  }

  return state;
};

export default reducer;
