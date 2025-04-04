
"use client";

import { useWatchlist } from "../../context/WatchListContext";
import MovieCard from "@/components/MovieCard";
import { Movie, TVShow } from "../../types/types";

const MyList = () => {
  const { watchlist } = useWatchlist();

  return (
    <div className="max-w-screen-xl mx-auto py-6 px-4">
      <h2 className="text-white text-xl font-bold">My Watchlist</h2>
      <div>
     
      {watchlist.length === 0 ? (
        <p className="text-gray-400">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-4">
          {watchlist.map((item, index) => (
            <MovieCard key={index} movie={item as Movie | TVShow} type={item.isMovie ? "movies" : "tv-show"} />
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default MyList;