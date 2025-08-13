import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCountries, resetCountries } from "../features/countrySlice";

export default function FilterBar() {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ name: "", region: "", timezone: "" });

  const handleSearch = () => {
    dispatch(resetCountries());      // Clear previous results
    dispatch(searchCountries(filters));
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 mb-4">
      <input
        type="text"
        placeholder="Search by name"
        value={filters.name}
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        className="border p-2 flex-1"
      />
      <select
        value={filters.region}
        onChange={(e) => setFilters({ ...filters, region: e.target.value })}
        className="border p-2"
      >
        <option value="">All Regions</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Oceania">Oceania</option>
      </select>
      <input
        type="text"
        placeholder="Timezone (e.g. UTC+05:30)"
        value={filters.timezone}
        onChange={(e) => setFilters({ ...filters, timezone: e.target.value })}
        className="border p-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Apply
      </button>
    </div>
  );
}
