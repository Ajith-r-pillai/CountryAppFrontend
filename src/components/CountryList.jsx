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

  if (status === "loading" && list.length === 0) return <p>Loading...</p>;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {list.slice(0, visibleCount).map((country) => (
          <Link key={country.cca2} to={`/country/${country.cca2}`}>
            <CountryCard country={{ ...country, currentTime: timeMap[country.cca2] }} />
          </Link>
        ))}
      </div>
      <div ref={loader} className="h-10"></div>
    </>
  );
}
