import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CountryDetail from "../pages/CountryDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SavedCountries from "../pages/SavedCountries";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:code" element={<CountryDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/saved"
        element={
          <ProtectedRoute>
            <SavedCountries />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
