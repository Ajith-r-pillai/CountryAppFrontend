import React, { Suspense } from "react";
import CountryList from "../components/CountryList";
import FilterBar from "../components/FilterBar";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="p-4">
   <Navbar/>
      <h1 className="text-2xl font-bold mb-4">Countries</h1>
      <FilterBar />
      <Suspense fallback={<p>Loading countries...</p>}>
        <CountryList />
      </Suspense>
    </div>
  );
}
