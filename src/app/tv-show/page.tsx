"use client";

import SwiperCards from "@/components/SwiperCards";
import { getPopularTVShows, getCurrentlyAiringTVShows } from "../../lib/tmdpApi";
import { useEffect, useState } from "react";
import {TVShow} from '../../types/types'
import SkeltonCards from "@/components/SkeltonCard";

const TVShowsPage  = () => {
  const [popularTVShows, setPopularTVShows] = useState<TVShow[]>([]);
  const [currentlyAiringTVShows, setCurrentlyAiringTVShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularData = await getPopularTVShows();
        const upcomingData = await getCurrentlyAiringTVShows();

        setPopularTVShows(popularData?.results || []);
        setCurrentlyAiringTVShows(upcomingData?.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <SkeltonCards/>;
  }

  return (
    <div className="max-w-screen-xl mx-auto py-6">
      <SwiperCards movies={popularTVShows} title="Popular TV Shows" type="tv-show" loading={loading}/>
      <SwiperCards movies={currentlyAiringTVShows} title="Currently Airing TV Shows" type="tv-show" loading={loading} />
    </div>
  );
};

export default TVShowsPage ;
