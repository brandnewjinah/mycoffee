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
import beanDetailsReducer from "./beanDetailsRedux";
import beanActionsReducer from "./beanActionsRedux";
import noteActionsReducer from "./noteActionsRedux";
import recipeReducer from "./recipeRedux";
import recipeDetailsReducer from "./recipeDetailsRedux";
import recipeActionsReducer from "./recipeActionsRedux";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  roasters: roastersReducer,
  beans: beansReducer,
  beanDetails: beanDetailsReducer,
  beanActions: beanActionsReducer,
  noteActions: noteActionsReducer,
  recipes: recipeReducer,
  recipeDetails: recipeDetailsReducer,
  recipeActions: recipeActionsReducer,
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
