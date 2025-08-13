import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import { toast } from "react-toastify";

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await api.post("/auth/login", data);
    toast.success("Logged in successfully");
    return res.data;
  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed");
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

export const register = createAsyncThunk("auth/register", async (data, thunkAPI) => {
  try {
    const res = await api.post("/auth/register", data);
    toast.success("Registered successfully");
    return res.data;
  } catch (err) {
    toast.error(err.response?.data?.message || "Registration failed");
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

export const loadUser = createAsyncThunk("auth/loadUser", async (_, thunkAPI) => {
  try {
    const res = await api.get("/auth/getme");
    return res.data;
  } catch (err) {
    // We don't toast here to avoid spamming on every page load when not logged in
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await api.post("/auth/logout");
    toast.success("Logged out successfully");
    return res.data;
  } catch (err) {
    toast.error("Logout failed");
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, status: "idle" },
  reducers: {},
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


export default authSlice.reducer;
