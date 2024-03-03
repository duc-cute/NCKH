/** @format */

import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
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
import userReducer from "../redux/user/userSlice";

const commonConfig = {
  key: "app/user",
  storage,
};

const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "token", "current"],
};

export const store = configureStore({
  reducer: {
    user: persistReducer(userConfig, userReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
