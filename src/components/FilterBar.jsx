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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Search & Filter Countries</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Name Search */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Country Name</label>
          <input
            type="text"
            placeholder="Search by name"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
          />
        </div>

        {/* Region Select */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Region</label>
          <select
            value={filters.region}
            onChange={(e) => setFilters({ ...filters, region: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-white"
          >
            <option value="">All Regions</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        {/* Timezone Search */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Timezone</label>
          <input
            type="text"
            placeholder="e.g. UTC+05:30"
            value={filters.timezone}
            onChange={(e) => setFilters({ ...filters, timezone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
          />
        </div>

        {/* Apply Button */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 opacity-0">Apply</label>
          <button
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-300 focus:outline-none shadow-md hover:shadow-lg"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}