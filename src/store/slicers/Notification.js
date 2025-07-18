import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  open: false,
  type: "info",
  message: "",
  timeout: 3000,
  vertical: "top",
  horizontal: "right",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification: (_state, action) => ({
      ...initialState,
      ...action.payload,
      open: true,
      type: action.payload?.status
    }),
    clearNotification: (state) => ({ ...state, open: false, message: "" }),
  },
});

export const { createNotification, clearNotification } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
