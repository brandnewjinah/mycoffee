import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

const initialState = {};
const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(
    persistedReducer,
    initialState,
    // compose(applyMiddleware(...middleware))
    compose(
      applyMiddleware(...middleware),
      window.navigator.userAgent.includes("Chrome")
        ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        : compose
    )
  );
  let persistor = persistStore(store);
  return { store, persistor };
};

// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

// export default store;
