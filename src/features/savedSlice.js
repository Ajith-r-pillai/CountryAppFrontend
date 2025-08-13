import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const getSavedCountries = createAsyncThunk("saved/get", async () => {
  const res = await api.get("/countries/saved/list");
  return res.data;
});

export const saveCountry = createAsyncThunk("saved/add", async (code) => {
  const res = await api.post("/countries/save", { code });
  return res.data;
});

export const removeCountry = createAsyncThunk("saved/remove", async (code) => {
  const res = await api.delete(`/countries/save/${code}`);
  return res.data;
});

const savedSlice = createSlice({
  name: "saved",
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSavedCountries.fulfilled, (state, action) => { state.list = action.payload; });
  },
});

export default savedSlice.reducer;
