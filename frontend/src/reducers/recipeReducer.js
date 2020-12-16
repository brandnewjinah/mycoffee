// Action types
const ADD_RECIPE = "ADD_RECIPE";

const DELETE_RECIPE = "DELETE_RECIPE";

// Action creators
export const addRecipe = (item) => {
  return (dispatch) => {
    dispatch({
      type: ADD_RECIPE,
      payload: {
        item,
      },
    });
  };
};

export const deleteRecipe = (item) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_RECIPE,
      payload: {
        item,
      },
    });
  };
};

// State
const initialState = {
  recipes: [],
};

// Reducer
const reducer = (state = initialState, action) => {
  if (action.type === ADD_RECIPE) {
    let newDrink = action.payload.item;

    let newRecipes = [...state.recipes, newDrink];

    return { ...state, recipes: newRecipes };
  }

  if (action.type === DELETE_RECIPE) {
    let drink = action.payload.item;
    let newRecipes = [...state.recipes];

    newRecipes = newRecipes.filter((c) => c.id !== drink.id);

    return { ...state, recipes: newRecipes };
  }

  return state;
};

export default reducer;
