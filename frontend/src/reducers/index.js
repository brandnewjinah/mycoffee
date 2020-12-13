import { combineReducers } from "redux";
import authReducer from "./authReducers";
import collectReducer from "./collectReducer";
import quizReducer from "./quizReducer";
import collectionReducer from "./collectionReducer";

export default combineReducers({
  auth: authReducer,
  collect: collectReducer,
  quiz: quizReducer,
  collection: collectionReducer,
});
