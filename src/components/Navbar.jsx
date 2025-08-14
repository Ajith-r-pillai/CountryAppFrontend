import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap(); // ensures thunk completes
      navigate("/"); // redirect to home
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white shadow-lg border-b border-blue-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent hover:from-white hover:to-blue-100 transition-all duration-200"
            >
              CountryExplorer
            </Link>
            <div className="flex space-x-4">
              <Link 
                to="/" 
                className="px-3 py-2 rounded-lg hover:bg-blue-700/50 transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              {user && (
                <Link 
                  to="/saved" 
                  className="px-3 py-2 rounded-lg hover:bg-blue-700/50 transition-colors duration-200 font-medium"
                >
                  Saved Countries
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-blue-200 text-sm">Welcome, {user.name || 'User'}!</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-lg border border-blue-400 hover:bg-blue-700/30 transition-colors duration-200 font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}