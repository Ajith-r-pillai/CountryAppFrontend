import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import { toast } from "react-toastify";

// Fetch saved countries
export const getSavedCountries = createAsyncThunk("saved/get", async () => {
  const res = await api.get("/countries/saved/list");
  return res.data;
});

// Save a country
export const saveCountry = createAsyncThunk(
  "saved/add",
  async (code, thunkAPI) => {
    try {
      const res = await api.post("/countries/save", { code });
      toast.success("Country saved");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// Remove a country
export const removeCountry = createAsyncThunk(
  "saved/remove",
  async (code, thunkAPI) => {
    try {
      const res = await api.delete(`/countries/save/${code}`);
      toast.success("Country removed");
      return { code, message: res.data.message };
    } catch (err) {
      toast.error(err.response?.data?.message || "Remove failed");
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

const savedSlice = createSlice({
  name: "saved",
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Load saved list
      .addCase(getSavedCountries.fulfilled, (state, action) => {
        state.list = action.payload;
      })

      // ✅ Save without duplicates
      .addCase(saveCountry.fulfilled, (state, action) => {
        const exists = state.list.some(
          (c) =>
            c.cca2?.toLowerCase() === action.payload.cca2?.toLowerCase() ||
            c.cca3?.toLowerCase() === action.payload.cca3?.toLowerCase()
        );
        if (!exists) {
          state.list.push(action.payload);
        }
      })

      // ✅ Remove using normalized code match
      .addCase(removeCountry.fulfilled, (state, action) => {
        const code = action.payload.code?.toLowerCase();
        state.list = state.list.filter(
          (c) =>
            c.cca2?.toLowerCase() !== code &&
            c.cca3?.toLowerCase() !== code
        );
      });
  },
});

export default savedSlice.reducer;
