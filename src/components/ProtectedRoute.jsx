import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    // Redirect to login and save the current path for redirect after login
    return <Navigate to="/login" state={{ returnPath: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
