import React from 'react';
import AuthMiddleware from './AuthMiddleware';
import PageNotFound from '../components/PageNotFound';
import Login from '../pages/authentication/Login';
import ForgotPassword from '../pages/authentication/ForgotPassword';
import SetPassword from '../pages/authentication/SetPassword';
import CreateNewPassword from '../pages/authentication/CreateNewPassword';
import Dashboard from '../pages/dashboard/index'

const router = [
  { path: '/dashboard', element: <AuthMiddleware><Dashboard /> </AuthMiddleware> },
  {
    path: '',
    element: <Login />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'forgot-password',
    element: <ForgotPassword />
  },
  {
    path: 'set-password',
    element: <SetPassword />
  },
  {
    path: 'create-new-password',
    element: <CreateNewPassword />
  },
  {
    path: '*',
    element: <PageNotFound />
  },
];

export default router;
