import { combineReducers } from "redux";
import authReducer from "./authReducers";
import collectReducer from "./collectReducer";
import quizReducer from "./quizReducer";

export default combineReducers({
  auth: authReducer,
  collect: collectReducer,
  quiz: quizReducer,
});
