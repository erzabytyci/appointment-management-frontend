import React from 'react';
import { Navigate } from 'react-router-dom';
import { decodeToken } from '../utils/jwtUtils';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  const decodedToken = decodeToken(token);
  if (decodedToken.role !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
