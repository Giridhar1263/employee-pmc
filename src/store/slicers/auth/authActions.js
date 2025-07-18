import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../../helpers/client";
import {
  // setSession,
  getTokenExpiry,
  CookieNames,
  setCookieItem,
  setSession,
} from "../../../helpers/cookies";
import { showSnackBar } from "../../../helpers/snackbar";
// import { showLoader } from "../../../helpers/loader";
import { config } from "../../../helpers/config";
import { showLoader } from "../Loading";

export const signIn = createAsyncThunk(
  "signIn",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      dispatch(showLoader(true));
      const url = `${config.AUTH_API}/Login`;
      const response = await client.post(url, params);
      setSession(response);
      return Promise.resolve(response);
    } catch (error) {
      showSnackBar(dispatch, "error", error?.message);
      return rejectWithValue(error);
    } finally {
      dispatch(showLoader(false));
    }
  }
);

export const setPassword = createAsyncThunk(
  "setpassword",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      dispatch(showLoader(true));
      const url = `${config.AUTH_API}/SetPassword`;
      const response = await client.post(url, params);
      return Promise.resolve(response);
    } catch (error) {
      showSnackBar(dispatch, "error", error?.message);
      return rejectWithValue(error);
    } finally {
      dispatch(showLoader(false));
    }
  }
);

export const refreshToken = async (rToken) => {
  try {
    const url = `${config.USER_API}/users/refreshToken`;
    const data = { refreshToken: rToken };
    const response = await client.post(url, data);
    const tokenExpiry = getTokenExpiry();
    setCookieItem(CookieNames.REFRESH_TOKEN, rToken, tokenExpiry);
    setCookieItem(
      CookieNames.ACCESS_TOKEN,
      response.data.accessToken,
      tokenExpiry
    );
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Forgot password
export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (payload, { dispatch }) => {
    console.log(payload, dispatch);
    try {
      dispatch(showLoader(true));
      const url = `${config.AUTH_API}/ForgotPassword?email=${payload?.email}`;
      const response = await client.post(url);
      if (response.status === 200) {
        showSnackBar(dispatch, "success", response?.message);
        return response
      } else if (response.status === 409) {
        showSnackBar(dispatch, "error", response?.message);
        return response
      } else {
        showSnackBar(dispatch, "warning", response?.message);
        return response
      }
    } catch (error) {
      if (error?.status === 400)
        showSnackBar(dispatch, "error", error?.title);
      else if (error?.status === 404) {
        showSnackBar(dispatch, "error", error?.message);
      } else if (error?.status === 409) {
        showSnackBar(dispatch, "error", error?.message);
      }
    } finally {
      dispatch(showLoader(false));
    }
  }
);

// create new password
export const createNewPassword = createAsyncThunk(
  "createNewPassword",
  async (payload, { dispatch }) => {
    try {
      dispatch(showLoader(true));
      const url = `${config.AUTH_API}/UpdatePassword`;
      const response = await client.post(url, payload);
      if (response.status === 200) {
        showSnackBar(dispatch, "success", response?.message);
        return response
      } else if (response.status === 409) {
        showSnackBar(dispatch, "error", response?.message);
        return response
      } else {
        showSnackBar(dispatch, "warning", response?.message);
        return response
      }
    }
    catch (error) {
      if (error?.status === 400)
        showSnackBar(dispatch, "error", error?.title);
      else if (error?.status === 404) {
        showSnackBar(dispatch, "error", error?.message);
      } else if (error?.status === 409) {
        showSnackBar(dispatch, "error", error?.message);
      }
    } finally {
      dispatch(showLoader(false));
    }
  }
);
