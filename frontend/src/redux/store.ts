import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import roastersReducer from "./roastersRedux";
import beansReducer from "./beanRedux";
import beanActionsReducer from "./beanActionsRedux";
import collectionReducer from "./collectionRedux";
import recipeReducer from "./recipeRedux";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  roasters: roastersReducer,
  beans: beansReducer,
  beanActions: beanActionsReducer,
  collection: collectionReducer,
  recipe: recipeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
