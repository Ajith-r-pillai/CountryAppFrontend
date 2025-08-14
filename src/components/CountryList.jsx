import React, { useState, useEffect, useRef } from "react";
import CountryCard from "./CountryCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountriesBatch } from "../features/countrySlice";
import { Link } from "react-router-dom";

export default function CountryList() {
  const dispatch = useDispatch();
  const { list, status, offset } = useSelector((state) => state.countries);
  const [visibleCount, setVisibleCount] = useState(20);
  const [timeMap, setTimeMap] = useState({});
  const loader = useRef(null);

  // Initial batch fetch
  useEffect(() => {
    dispatch(fetchCountriesBatch({ offset: 0, limit: 20 }));
  }, [dispatch]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && offset < 250) { // optional max limit
          dispatch(fetchCountriesBatch({ offset, limit: 20 }));
          setVisibleCount((prev) => prev + 20);
        }
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [loader, offset, dispatch]);

  // Update time for visible countries
  useEffect(() => {
    const updateTimes = () => {
      const newTimeMap = {};
      list.slice(0, visibleCount).forEach((country) => {
        if (country.timezones?.[0]) {
          try {
            newTimeMap[country.cca2] = new Date().toLocaleString("en-US", {
              timeZone: country.timezones[0],
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });
          } catch {
            newTimeMap[country.cca2] = "N/A";
          }
        } else {
          newTimeMap[country.cca2] = "N/A";
        }
      });
      setTimeMap(newTimeMap);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 60000); // every 1 min
    return () => clearInterval(interval);
  }, [list, visibleCount]);

  if (status === "loading" && list.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600 text-lg">Discovering countries...</p>
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mb-4 text-6xl">🌍</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No countries found</h3>
        <p className="text-gray-600">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Found {list.length} countries
        </h2>
        <div className="text-sm text-gray-600">
          Showing {Math.min(visibleCount, list.length)} countries
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {list.slice(0, visibleCount).map((country) => (
          <Link 
            key={country.cca2} 
            to={`/country/${country.cca2}`}
            className="group block transform transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden group-hover:shadow-xl transition-all duration-200">
              <CountryCard country={{ ...country, currentTime: timeMap[country.cca2] }} />
            </div>
          </Link>
        ))}
      </div>

      {/* Loading indicator for infinite scroll */}
      {status === "loading" && list.length > 0 && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
          <span className="text-gray-600">Loading more countries...</span>
        </div>
      )}

      {/* Infinite scroll trigger */}
      <div ref={loader} className="h-4"></div>

      {/* End of results indicator */}
      {offset >= 250 && (
        <div className="text-center py-8 text-gray-500">
          <div className="mb-2">🎉</div>
          <p>You've explored all available countries!</p>
        </div>
      )}
    </div>
  );
}