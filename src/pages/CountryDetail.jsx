import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";
import { saveCountry, removeCountry } from "../features/savedSlice";

export default function CountryDetail() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [time, setTime] = useState("N/A");
  
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.saved);
  const isSaved = list.some((c) => c.countryCode === code);

  useEffect(() => {
    api.get(`/countries/${code}`)
      .then((res) => setCountry(res.data[0]))
      .catch(() => setCountry(null));
  }, [code]);

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
            const targetTime = new Date(utc + sign * (hours * 60 + minutes) * 60000);
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

  const toggleSave = () => {
    if (isSaved) dispatch(removeCountry(code));
    else dispatch(saveCountry(code));
  };

  if (!country) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <img src={country.flags.png} alt={country.name.common} className="w-40 mb-4" />
      <h1 className="text-3xl font-bold mb-2">{country.name.common}</h1>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
      <p><strong>Currency:</strong> {Object.values(country.currencies || {})[0]?.name || "N/A"}</p>
      <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(", ")}</p>
      <p><strong>Current Time:</strong> {time}</p>

      <button
        onClick={toggleSave}
        className={`mt-4 px-4 py-1 rounded ${isSaved ? "bg-red-500" : "bg-blue-500"} text-white`}
      >
        {isSaved ? "Remove" : "Save"}
      </button>
    </div>
  );
}
