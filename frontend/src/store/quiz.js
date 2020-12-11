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

// Reducer
const reducer = (state, action) => {
  if (action.type === ADD_PROFILE) {
    let newHeight = action.payload.item.height;
    let newWeight = action.payload.item.weight;
    let newGoalWeight = action.payload.item.goal_weight;
    let newMethod = action.payload.item.method;
    let newRoast = action.payload.item.roast;
    let newBeans = action.payload.item.beans;
    let newTaste = action.payload.item.taste;
    return {
      ...state,
      height: newHeight,
      weight: newWeight,
      goal_weight: newGoalWeight,
      method: newMethod,
      roast: newRoast,
      beans: newBeans,
      taste: newTaste,
    };
  }

  return state;
};

export default reducer;
