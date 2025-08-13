// import React, { useEffect } from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import { Provider, useDispatch } from "react-redux";
// import store from "./app/store";
// import AppRoutes from "./routes/AppRoutes";
// import { loadUser } from "./features/authSlice";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Separate component for initializing user
// function AppWrapper() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(loadUser());
//   }, [dispatch]);

//   return <AppRoutes />;
// }

// function App() {
//   return (
//     <Provider store={store}>
//       <Router>
//         <AppWrapper />
//         <ToastContainer position="top-right" autoClose={3000} />
//       </Router>
//     </Provider>
//   );
// }

// export default App;
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./app/store";
import AppRoutes from "./routes/AppRoutes";
import { loadUser } from "./features/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return <AppRoutes />;
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppWrapper />
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </Provider>
  );
}

