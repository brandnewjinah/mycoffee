import { GET_COLLECTION } from "../actions/types";

const initialState = {
  data: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COLLECTION:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
