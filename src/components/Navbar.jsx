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
    <nav className="p-4 bg-gray-900 text-white flex justify-between">
      <div>
        <Link to="/" className="mr-4">Home</Link>
        {user && <Link to="/saved">Saved</Link>}
      </div>
      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="mr-3">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
