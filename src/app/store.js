import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import countryReducer from "../features/countrySlice";
import savedReducer from "../features/savedSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    countries: countryReducer,
    saved: savedReducer,
  },
});

export default store; // <-- default export
