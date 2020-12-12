import { combineReducers } from "redux";
import authReducer from "./authReducers";
import collectReducer from "./collectReducer";

export default combineReducers({
  auth: authReducer,
  collect: collectReducer,
});
