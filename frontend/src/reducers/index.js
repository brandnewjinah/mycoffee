import { combineReducers } from "redux";
import authReducer from "./authReducers";
import quizReducer from "./quizReducer";
import collectionReducer from "./collectionReducer";
import toolReducer from "./toolReducer";

export default combineReducers({
  auth: authReducer,
  quiz: quizReducer,
  collection: collectionReducer,
  tools: toolReducer,
});
