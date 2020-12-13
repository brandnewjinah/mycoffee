// Action types
const ADD_COFFEE = "ADD_COFFEE";

// Action creators
export const addCoffee = (item) => {
  return (dispatch) => {
    dispatch({
      type: ADD_COFFEE,
      payload: {
        item,
      },
    });
  };
};

// State
const initialState = {
  collection: [],
};

// Reducer
const reducer = (state = initialState, action) => {
  if (action.type === ADD_COFFEE) {
    let newCoffee = action.payload.item;
    let newCollection = [...state.collection, newCoffee];

    return { ...state, collection: newCollection };
  }

  return state;
};

export default reducer;
