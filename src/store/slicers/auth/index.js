import { createSlice } from "@reduxjs/toolkit";
import { getSession } from "../../../helpers/cookies";
import { setPassword, signIn } from "./authActions";
import { forgotPassword, createNewPassword } from "./authActions";

const AuthenticationSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: {},
    loading: false,
  },
  reducers: {
    checkSession: (state) => {
      const session = getSession();
      state.isAuthenticated = Boolean(session?.accessToken);
      state.user = session?.user || {};
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // sign
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, () => {
      // const { user, accessToken, refreshToken } = payload.data;
      // state.loading = false;
      // state.isAuthenticated = true;
      // state.accessToken = accessToken;
      // state.refreshToken = refreshToken;
      // state.user = user;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.loading = false;
    })
    builder.addCase(setPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setPassword.fulfilled, () => {
      // const { user, accessToken, refreshToken } = payload.data;
      // state.loading = false;
      // state.isAuthenticated = true;
      // state.accessToken = accessToken;
      // state.refreshToken = refreshToken;
      // state.user = user;
    });
    builder.addCase(setPassword.rejected, (state) => {
      state.loading = false;
    });
    // forgot password
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(forgotPassword.rejected, (state) => {
      state.loading = false;
    });
    // create password
    builder.addCase(createNewPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNewPassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createNewPassword.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { checkSession } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
