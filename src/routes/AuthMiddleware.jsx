import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCookieItem, CookieNames } from "../helpers/cookies";
import Layout from "../components/layout";

const AuthMiddleware = ({ allowedRoles, children }) => {
  const location = useLocation();
  const token = getCookieItem(CookieNames.ACCESS_TOKEN);
  if (!token || token === "") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const user = decodeURIComponent(getCookieItem(CookieNames?.USER)) && JSON.parse(decodeURIComponent(getCookieItem(CookieNames?.USER)));
  const userRole = user?.roleName;
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return (
    <Layout>
      {children}
    </Layout>
  );
};

export default React.memo(AuthMiddleware);
