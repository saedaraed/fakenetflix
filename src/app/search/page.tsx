"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchMovies, searchTVShows } from "../../lib/tmdpApi";
import MovieCard from "@/components/MovieCard";
import {Movie , TVShow} from '../../types/types'

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      searchMovies(debouncedQuery).then((data) => {
        setMovies(data?.results || []);
      });

      searchTVShows(debouncedQuery).then((data) => {
        setTVShows(data?.results || []);
      });
    } else {
      setMovies([]);
      setTVShows([]);
    }
  }, [debouncedQuery]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Search Results for "{debouncedQuery}"</h1>

      {movies.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mt-4">Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4 ">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} type="movies" />
            ))}
          </div>
        </div>
      )}

      {tvShows.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mt-8">TV Shows</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
            {tvShows.map((tv) => (
              <MovieCard key={tv.id} movie={tv} type="tv-show" />
            ))}
          </div>
        </div>
      )}

      {movies.length === 0 && tvShows.length === 0 && debouncedQuery && (
        <p className="mt-4 text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
