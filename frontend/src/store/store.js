import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./quiz";

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
  height: {},
  weight: {},
  goal_weight: {},
};

const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
  const store = createStore(
    persistedReducer,
    initialStore,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
