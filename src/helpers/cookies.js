import { deleteCookie, getCookies, setCookie } from "cookies-next";

export const CookieNames = {
  ACCESS_TOKEN: "mercedes.token",
  REFRESH_TOKEN: "mercedes.refreshToken",
  USER: "mercedes.user",
};

export function getTokenExpiry() {
  const addThirtyDays = 30 * 24 * 60 * 60 * 1000;
  const currentDate = new Date();
  const futureDate = new Date(currentDate.getTime() + addThirtyDays);

  return futureDate;
}

export const getSession = () => {
  const cookies = getCookies();
  const user = cookies[CookieNames.USER];
  if (user) {
    return {
      accessToken: cookies[CookieNames.ACCESS_TOKEN] || "",
      refreshToken: cookies[CookieNames.REFRESH_TOKEN] || "",
      user: user && JSON.parse(decodeURIComponent(user)),
    };
  }
};

export const setSession = (response) => {
  const { accessToken, refreshToken, data } = response;
  const userData = JSON.stringify(data);

  const tokenExpiry = getTokenExpiry();
  setCookie(CookieNames.ACCESS_TOKEN, accessToken, { expires: tokenExpiry });
  setCookie(CookieNames.REFRESH_TOKEN, refreshToken, { expires: tokenExpiry });
  setCookie(CookieNames.USER, userData, { expires: tokenExpiry });
};

export const clearSession = (redirectToHome = false) => {
  deleteCookie(CookieNames.ACCESS_TOKEN);
  deleteCookie(CookieNames.USER);
  deleteCookie(CookieNames.REFRESH_TOKEN);
  if (redirectToHome) window.location.href = "/";
};

export const setCookieItem = (cName, cValue, expDays) => {
  const cookieDetails = `${cName}=${cValue};`;
  if (expDays) {
    const expires = `expires=${expDays};`;
    document.cookie = `${cookieDetails} ${expires} path=/`;
  } else {
    document.cookie = `${cookieDetails} path=/`;
  }
};

export const getCookieItem = (cName) => {
  const match = document.cookie.match(new RegExp(`(^| )${cName}=([^;]+)`));
  if (match) return match[2];
  return "";
};
