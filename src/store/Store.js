import { configureStore } from "@reduxjs/toolkit";
import AuthenticationSlice from "./slicers/auth";
import LoadingSlice from "./slicers/Loading";
import { notificationReducer } from "./slicers/Notification";
import DashboardSlice from "./slicers/Dashboard";

const rootReducer = {
  loading: LoadingSlice,
  notification: notificationReducer,
  auth: AuthenticationSlice,
  Dashboard: DashboardSlice,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});
