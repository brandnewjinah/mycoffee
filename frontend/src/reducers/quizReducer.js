// Action types
const ADD_PROFILE = "ADD_PROFILE";

// Action creators
export const addProfile = (item) => {
  return (dispatch) => {
    dispatch({
      type: ADD_PROFILE,
      payload: {
        item,
      },
    });
  };
};

// State
const initialState = {
  method: [],
  roast: [],
  beans: [],
  taste: [],
};

// Reducer
const reducer = (state = initialState, action) => {
  if (action.type === ADD_PROFILE) {
    let newMethod = action.payload.item.method;
    let newRoast = action.payload.item.roast;
    let newBeans = action.payload.item.beans;
    let newTaste = action.payload.item.taste;
    return {
      ...state,
      method: newMethod,
      roast: newRoast,
      beans: newBeans,
      taste: newTaste,
    };
  }

  return state;
};

export default reducer;
