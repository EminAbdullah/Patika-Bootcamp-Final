import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    // Yükleme durumu eklenebilir.
    return null;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
