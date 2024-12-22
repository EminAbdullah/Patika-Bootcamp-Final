import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    // Yükleme durumu için bir yükleyici gösterebilirsiniz
    return null;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  
  return children;
};

export default ProtectedRoute;
