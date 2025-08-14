import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeCountry, getSavedCountries } from "../features/savedSlice";
import { Link } from "react-router-dom";

export default function SavedCountries() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.saved);

  useEffect(() => {
    dispatch(getSavedCountries());
  }, [dispatch]);

  const handleRemove = (code) => {
    dispatch(removeCountry(code));
  };

  if (!list || list.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="mb-6 text-8xl">🌍</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No Saved Countries Yet</h2>
            <p className="text-gray-600 text-lg mb-8">Start exploring and save your favorite countries to see them here!</p>
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Explore Countries
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Saved Countries
          </h1>
          <p className="text-gray-600 text-lg">Your collection of favorite destinations</p>
          <div className="mt-4">
            <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              ❤️ {list.length} {list.length === 1 ? 'Country' : 'Countries'} Saved
            </span>
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((country) => (
            <div
              key={country.countryCode || country.cca2 || country.cca3}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] group"
            >
              {/* Flag Image */}
              <div className="relative overflow-hidden">
                <img
                  src={country.flags?.png}
                  alt={country.name?.common}
                  className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                    {country.name?.common}
                  </h3>
                  <p className="text-gray-600 font-medium">{country.region}</p>
                </div>

                {/* Current Time */}
                {country.currentTime && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Current Time:</span>
                      <span className="text-blue-600 font-bold">{country.currentTime}</span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <Link
                    to={`/country/${country.countryCode || country.cca2}`}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md"
                  >
                    View Details
                  </Link>
                  
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Discover More Countries</h3>
            <p className="text-gray-600 mb-4">Continue exploring and add more countries to your collection!</p>
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}