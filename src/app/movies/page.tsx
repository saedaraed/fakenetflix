"use client";

import SwiperCards from "@/components/SwiperCards";
import { getPopularMovies, getUpcomingMovies } from "../../lib/tmdpApi";
import { useEffect, useState } from "react";
import {Movie} from '../../types/types'


const MoviesPage = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularData = await getPopularMovies();
        const upcomingData = await getUpcomingMovies();

        setPopularMovies(popularData?.results || []);
        setUpcomingMovies(upcomingData?.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <div className="container mx-auto py-6">
      <SwiperCards movies={popularMovies} title="Popular Movies" type="movies" loading={loading} />
      <SwiperCards movies={upcomingMovies} title="Upcoming Movies" type="movies" loading={loading} />
    </div>
  );
};

export default MoviesPage;
