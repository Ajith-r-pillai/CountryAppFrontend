import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../services/api";

// Load current user from server (cookie-based)
export const loadUser = createAsyncThunk("auth/loadUser", async (_, thunkAPI) => {
  try {
    const { data } = await api.get("/auth/getme");
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || null);
  }
});

export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/login", credentials);
    localStorage.setItem("user", JSON.stringify(data));
    toast.success("Logged in successfully ");
    return data;
  } catch (err) {
    const errorMsg = err.response?.data?.message || "Login failed ";
    toast.error(errorMsg);
    return thunkAPI.rejectWithValue(errorMsg);
  }
});

export const register = createAsyncThunk("auth/register", async (formData, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/register", formData);
    localStorage.setItem("user", JSON.stringify(data));
    toast.success("Registered successfully 🎉");
    return data;
  } catch (err) {
    const errorMsg = err.response?.data?.message || "Registration failed ";
    toast.error(errorMsg);
    return thunkAPI.rejectWithValue(errorMsg);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await api.post("/auth/logout"); // clears cookie on backend
    localStorage.removeItem("user");
    toast.info("Logged out successfully ");
  } catch (err) {
    toast.error("Failed to log out ");
    return thunkAPI.rejectWithValue("Logout failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "loading", // start in loading so ProtectedRoute waits
  },
  reducers: {
    setUserFromStorage: (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(loadUser.rejected, (state) => {
        state.user = null;
        state.status = "failed";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
      });
  },
});

export const { setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
