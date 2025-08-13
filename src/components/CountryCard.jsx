import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveCountry, removeCountry } from "../features/savedSlice";

export default function CountryCard({ country }) {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.saved);
  const [currentTime, setCurrentTime] = useState("N/A");

  const isSaved = list.some((c) => c.countryCode === country.cca2);

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

      setCurrentTime(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [country]);

  const toggleSave = () => {
    if (isSaved) dispatch(removeCountry(country.cca2));
    else dispatch(saveCountry(country.cca2));
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg">
      <img src={country.flags?.png} alt={country.name.common} className="w-full h-32 object-cover" />
      <h3 className="font-bold mt-2">{country.name.common}</h3>
      <p>{country.region}</p>
      <p><strong>Current Time:</strong> {currentTime}</p>
    
    </div>
  );
}
