/**
 * @format
 */
import axios from "axios";
import { refreshToken } from "../store/slicers/auth/authActions";
import { clearSession, CookieNames, getCookieItem } from "./cookies";

let isAlreadyFetchingAccessToken = false;

let subscribers = [];

function onAccessTokenFetched(accessToken) {
  subscribers = subscribers.filter((callback) => callback(accessToken));
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

const client = axios.create({
  headers: { "Content-Type": "application/json" },
});

const ROUTE_WITHOUT_TOKEN = ["login"];

client.interceptors.request.use(
  (request) => {
    // console.log(request["Content-Type"])
    const authRoutes = ROUTE_WITHOUT_TOKEN.some((i) =>
      request?.url?.includes(i)
    );
    const accessToken = getCookieItem(CookieNames.ACCESS_TOKEN);
    if (!authRoutes && request.headers && accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
      if (request["Content-Type"])
        request.headers["Content-Type"] = request["Content-Type"]
    }
    return request;

  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    if (response.data.error) {
      return Promise.reject(response.data);
    }

    return Promise.resolve(response.data);
  },
  async (error) => {
    if (error?.config?.url?.includes("refreshToken")) {
      clearSession(true);

      return Promise.reject(error.response?.data);
    }

    if (error.response?.status === 401) {
      const originalRequest = error.config;

      const retryOriginalRequest = new Promise((resolve) => {
        addSubscriber((accessToken) => {
          if (originalRequest?.headers && accessToken) {
            originalRequest.headers.Authorization = accessToken;
          }
          if (originalRequest) {
            resolve(client(originalRequest));
          }
        });
      });
      try {
        const rToken = getCookieItem(CookieNames.REFRESH_TOKEN);
        if (!isAlreadyFetchingAccessToken && rToken) {
          isAlreadyFetchingAccessToken = true;
          const data = await refreshToken(rToken);
          isAlreadyFetchingAccessToken = false;
          onAccessTokenFetched(data.accessToken);
        }

        return await retryOriginalRequest;
      } catch (err) {
        clearSession(true);
        return retryOriginalRequest;
      }
    }

    return Promise.reject(error.response?.data);
  }
);

export default client;
