"use client"

import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm) {
      // Implement search functionality
      console.log("Searching for:", searchTerm);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        className="px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 rounded-md bg-white text-black hover:bg-gray-300"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
