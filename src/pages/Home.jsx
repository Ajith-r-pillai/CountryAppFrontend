import React, { Suspense } from "react";
import CountryList from "../components/CountryList";
import FilterBar from "../components/FilterBar";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar/>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Explore Countries
          </h1>
          <p className="text-gray-600 text-lg">Discover nations around the world</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <FilterBar />
        </div>
        
        <Suspense 
          fallback={
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="ml-3 text-gray-600">Loading countries...</p>
            </div>
          }
        >
          <CountryList />
        </Suspense>
      </div>
    </div>
  );
}