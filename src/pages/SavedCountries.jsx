import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedCountries } from "../features/savedSlice";

export default function SavedCountries() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.saved);

  useEffect(() => {
    dispatch(getSavedCountries());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Saved Countries</h1>
      <ul>
        {list.map((c) => (
          <li key={c._id}>{c.countryCode}</li>
        ))}
      </ul>
    </div>
  );
}
