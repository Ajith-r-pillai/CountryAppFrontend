import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { loadUser, setUserFromStorage } from "../features/authSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.auth);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUserFromStorage(JSON.parse(storedUser)));
    } else {
      dispatch(loadUser()); // Try from cookie on refresh
    }
  }, [dispatch]);

  if (status === "loading") {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
