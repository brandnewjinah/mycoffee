import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import quizReducer from "./quiz";

//persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const initialStore = {
  method: [],
  roast: [],
  beans: [],
  taste: [],
};

const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, quizReducer);

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const store = createStore(
    persistedReducer,
    initialStore,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
