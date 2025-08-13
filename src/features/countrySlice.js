import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// Fetch countries in batches for infinite scroll
export const fetchCountriesBatch = createAsyncThunk(
  "countries/fetchBatch",
  async ({ offset = 0, limit = 20 }) => {
    const res = await api.get(`/countries?offset=${offset}&limit=${limit}`);
    return res.data;
  }
);

// Search / filter countries
export const searchCountries = createAsyncThunk(
  "countries/search",
  async (filters) => {
    const params = new URLSearchParams();
    if (filters.name) params.append("name", filters.name);
    if (filters.region) params.append("region", filters.region);
    if (filters.timezone) params.append("timezone", filters.timezone);
 console.log(params.toString());
    const res = await api.get(`/countries/search?${params.toString()}`);
   
    
    return res.data;
  }
);

const countrySlice = createSlice({
  name: "countries",
  initialState: { list: [], status: "idle", offset: 0, total: 0 },
  reducers: {
    resetCountries: (state) => {
      state.list = [];
      state.status = "idle";
      state.offset = 0;
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Infinite scroll batch fetch
      .addCase(fetchCountriesBatch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCountriesBatch.fulfilled, (state, action) => {
        state.list = [...state.list, ...action.payload.data];
        state.offset = action.payload.offset + action.payload.limit;
        state.total = action.payload.total;
        state.status = "succeeded";
      })
      // Search / filter
      .addCase(searchCountries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchCountries.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "succeeded";
      });
  },
});

export const { resetCountries } = countrySlice.actions;
export default countrySlice.reducer;