import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};

const LoadingSlice = createSlice({
  name: "Loading",
  initialState,
  reducers: {
    showLoader: (state, action) => {
      return {
        ...state,
        show: action.payload,
      };
    },
  },
});

export const { showLoader } = LoadingSlice.actions;
export default LoadingSlice.reducer;
