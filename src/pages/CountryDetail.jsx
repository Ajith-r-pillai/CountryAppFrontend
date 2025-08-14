import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";
import {
  saveCountry,
  removeCountry,
  getSavedCountries,
} from "../features/savedSlice";

export default function CountryDetail() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [time, setTime] = useState("N/A");

  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.saved);

  const isSaved = list.some(
    (c) =>
      c.cca2?.toLowerCase() === code?.toLowerCase() ||
      c.cca3?.toLowerCase() === code?.toLowerCase()
  );

  // Load saved countries
  useEffect(() => {
    dispatch(getSavedCountries());
  }, [dispatch]);

  // Fetch country details
  useEffect(() => {
    api
      .get(`/countries/${code}`)
      .then((res) => setCountry(res.data[0]))
      .catch(() => setCountry(null));
  }, [code]);

  // Timezone updater
  useEffect(() => {
    if (!country?.timezones?.[0]) return;

    const updateTime = () => {
      const tz = country.timezones[0];
      let formattedTime = "N/A";

      try {
        if (tz.startsWith("UTC")) {
          const match = tz.match(/UTC([+-]\d{1,2})(?::(\d{2}))?/);
          if (match) {
            const sign = match[1].startsWith("-") ? -1 : 1;
            const hours = Math.abs(parseInt(match[1]));
            const minutes = match[2] ? parseInt(match[2]) : 0;
            const now = new Date();
            const utc = now.getTime() + now.getTimezoneOffset() * 60000;
            const targetTime = new Date(
              utc + sign * (hours * 60 + minutes) * 60000
            );
            formattedTime = targetTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
          }
        } else {
          formattedTime = new Date().toLocaleString("en-US", {
            timeZone: tz,
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        }
      } catch {
        formattedTime = "N/A";
      }

      setTime(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [country]);

  // Toggle save/remove
  const toggleSave = () => {
    const normalizedCode = (country?.cca3 || country?.cca2 || code)?.toLowerCase();
    if (isSaved) {
      dispatch(removeCountry(normalizedCode));
    } else {
      dispatch(saveCountry(normalizedCode));
    }
  };

  if (!country) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Loading country details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  className="w-32 h-20 object-cover rounded-lg shadow-lg border-2 border-white/20"
                />
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-2">{country.name.common}</h1>
                  <p className="text-blue-100 text-lg">{country.name.official}</p>
                </div>
                <button
                  onClick={toggleSave}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg ${
                    isSaved 
                      ? "bg-red-500 hover:bg-red-600 text-white" 
                      : "bg-white text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {isSaved ? "❤️ Saved" : "🤍 Save Country"}
                </button>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                📍 Basic Information
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Region:</span>
                  <span className="text-gray-800 font-semibold">{country.region}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Population:</span>
                  <span className="text-gray-800 font-semibold">{country.population.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Capital:</span>
                  <span className="text-gray-800 font-semibold">{country.capital?.[0] || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-gray-600">Current Time:</span>
                  <span className="text-blue-600 font-bold text-lg">{time}</span>
                </div>
              </div>
            </div>

            {/* Cultural Information */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                🌍 Cultural Details
              </h2>
              <div className="space-y-4">
                <div className="py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-600 block mb-1">Currency:</span>
                  <span className="text-gray-800 font-semibold">{Object.values(country.currencies || {})[0]?.name || "N/A"}</span>
                </div>
                <div className="py-2">
                  <span className="font-medium text-gray-600 block mb-2">Languages:</span>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(country.languages || {}).map((lang, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Card */}
          {country.coatOfArms?.png && (
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🛡️ Coat of Arms</h2>
              <div className="flex justify-center">
                <img 
                  src={country.coatOfArms.png} 
                  alt={`${country.name.common} coat of arms`}
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}