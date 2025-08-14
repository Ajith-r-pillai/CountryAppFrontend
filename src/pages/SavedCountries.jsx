import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeCountry, getSavedCountries } from "../features/savedSlice";
import { Link } from "react-router-dom";

export default function SavedCountries() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.saved);

  useEffect(() => {
    // ✅ Load saved countries when component mounts
    dispatch(getSavedCountries());
  }, [dispatch]);

  const handleRemove = (code) => {
    dispatch(removeCountry(code));
  };

  if (!list || list.length === 0) {
    return <p className="text-center mt-4">No saved countries yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {list.map((country) => (
        <div
          key={country.countryCode || country.cca2 || country.cca3}
          className="border rounded-lg p-4 shadow hover:shadow-lg"
        >
          <img
            src={country.flags?.png}
            alt={country.name?.common}
            className="w-full h-32 object-cover"
          />
          <h3 className="font-bold mt-2">{country.name?.common}</h3>
          <p>{country.region}</p>
          {country.currentTime && (
            <p>
              <strong>Current Time:</strong> {country.currentTime}
            </p>
          )}
          <div className="flex justify-between items-center mt-2">
            <Link
              to={`/country/${country.countryCode || country.cca2}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          
          </div>
        </div>
      ))}
    </div>
  );
}
