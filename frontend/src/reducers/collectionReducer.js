// Action types
const ADD_COFFEE = "ADD_COFFEE";
const EDIT_COFFEE = "EDIT_COFFEE";
const DELETE_COFFEE = "DELETE_COFFEE";
const RESET_COFFEE = "RESET_COFFEE";
const ADD_NOTE = "ADD_NOTE";
const DELETE_NOTE = "DELETE_NOTE";

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

export const deleteCoffee = (item) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_COFFEE,
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

export const addNote = (item) => {
  return (dispatch) => {
    dispatch({
      type: ADD_NOTE,
      payload: {
        item,
      },
    });
  };
};

export const deleteNote = (item) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_NOTE,
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

  if (action.type === EDIT_COFFEE) {
    let updatedCoffee = action.payload.item;
    let newCollection = [...state.collection];
    const index = newCollection.findIndex(
      (item) => item.id === updatedCoffee.id
    );
    newCollection[index] = updatedCoffee;

    return { ...state, collection: newCollection };
  }

  if (action.type === ADD_NOTE) {
    let newNote = action.payload.item;
    let newCollection = [...state.collection];

    const index = newCollection.findIndex(
      (item) => item.id === newNote.coffeeId
    );

    let thisCoffee = newCollection[index];
    let notes = [...thisCoffee.notes, newNote];
    thisCoffee = { ...thisCoffee, notes: notes };

    newCollection[index] = thisCoffee;

    return { ...state, collection: newCollection };
  }

  if (action.type === DELETE_NOTE) {
    let thisNote = action.payload.item;
    let newCollection = [...state.collection];

    const index = newCollection.findIndex(
      (item) => item.id === thisNote.coffeeId
    );

    let thisCoffee = newCollection[index];
    let notes = [...thisCoffee.notes];

    notes = notes.filter((n) => n.id !== thisNote.id);
    thisCoffee = { ...thisCoffee, notes: notes };

    newCollection[index] = thisCoffee;

    return { ...state, collection: newCollection };
  }

  if (action.type === DELETE_COFFEE) {
    let coffee = action.payload.item;
    let newCollection = [...state.collection];

    newCollection = newCollection.filter((c) => c.id !== coffee.id);

    return { ...state, collection: newCollection };
  }

  if (action.type === RESET_COFFEE) {
    let newCollection = [];

    return { ...state, collection: newCollection };
  }

  return state;
};

export default reducer;
