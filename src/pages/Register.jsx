// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { register } from "../features/authSlice";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(register(form));
//     navigate("/");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4">
//       <input
//         type="text"
//         placeholder="Name"
//         value={form.name}
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//         className="border p-2 mb-2 block w-full"
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={form.email}
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//         className="border p-2 mb-2 block w-full"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//         className="border p-2 mb-2 block w-full"
//       />
//       <button className="bg-blue-500 text-white px-4 py-1 rounded">Register</button>
//     </form>
//   );
// }
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(register(form));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-blue-100 text-sm">Join us today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-4">
              {/* Name Field */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none group-hover:border-gray-400"
                />
              </div>

              {/* Email Field */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none group-hover:border-gray-400"
                />
              </div>

              {/* Password Field */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none group-hover:border-gray-400"
                />
              </div>
            </div>

            {/* Register Button */}
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-300 focus:outline-none shadow-md hover:shadow-lg"
            >
              Register
            </button>

            {/* Decorative Elements */}
            <div className="text-center pt-4">
              <div className="text-sm text-gray-500">
                Secure registration powered by advanced encryption
              </div>
            </div>
          </form>
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-8 text-gray-400 text-xs">
          Protected by industry-standard security measures
        </div>
      </div>
    </div>
  );
}