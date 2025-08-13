import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const { user, status } = useSelector((state) => state.auth);

  if (status === "loading") {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
