import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthMiddleware from './AuthMiddleware';

const ProtectedRoute = ({ allowedRoles }) => {
  console.log(allowedRoles, "roles")
  return (<>
    <AuthMiddleware allowedRoles={allowedRoles}>
      <Outlet />
    </AuthMiddleware>
  </>);
};

export default ProtectedRoute;
