import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;