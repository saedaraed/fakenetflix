"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  useEffect(() => {
    if (query) {
      router.push(`/search?query=${query}`, { scroll: false });
    } else {
      router.push(`/`, { scroll: false });
    }
  }, [query, router]);

  return (
    <input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className=" p-2 border rounded-md"
    />
  );
};

export default SearchBar;
