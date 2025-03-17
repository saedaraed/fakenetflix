"use client";

import { useEffect, useState } from "react";
import {getPopularMovies, getTopRatedMovies, getTopRatedTVShows, getTrendingTVShows } from "@/lib/tmdpApi";
import { Movie, TVShow } from "../types/types";  
import Image from "next/image";
import { Play, Info } from "lucide-react";
import SwiperCards from "@/components/SwiperCards";
import Link from "next/link";
import HomeSkeleton from "../components/HomeSkelton";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingTvShows, setTrendingTvShows] = useState<TVShow[]>([]);
  const [topRated , setTopRated]=useState<Movie[]> ([])
  const [topRatedTv, setTopRatedTv] = useState<TVShow[]>([]);

  useEffect(() => {
      fetchMovies();

  }, []);

  const fetchMovies = async () => {
    try {
      const moviesData  = await getPopularMovies();
      const tvShowsData  = await getTrendingTVShows();
      const topRatedMovieData = await getTopRatedMovies()
      const topRatedTvData = await getTopRatedTVShows()
      setTrendingMovies(moviesData?.results || []);
      setTrendingTvShows(tvShowsData?.results || []);
      setTopRated(topRatedMovieData?.results||[])
      setTopRatedTv(topRatedTvData?.results||[])
      console.log("topRatedTvData" , topRatedTvData)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <HomeSkeleton/>;
  }


  return (
    <>
      <div className="w-full h-[80vh] sm:h-[90vh] relative">
  {trendingMovies.length > 2 && (
    <>
      <Image
        src={`https://image.tmdb.org/t/p/w500${trendingMovies[0]?.poster_path}`}
        alt="Movie Poster"
        layout="fill"
        objectFit="cover"
        className="w-full h-full"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c0818]" />

      <div className="absolute top-1/2 left-1/2 sm:left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-center sm:text-left text-white w-4/5 sm:w-1/3">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4">{trendingMovies[0]?.title}</h1>
        <p className="text-sm sm:text-base mt-2 sm:mt-5 opacity-70">{trendingMovies[0]?.overview}</p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-5 items-center sm:items-start">
          <button className="flex items-center gap-3 px-5 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white text-lg rounded-full">
            <Play size={20} /> Play
          </button>
          <Link href={`/movies/${trendingMovies[0].id}`}>
            <button className="flex items-center gap-3 px-5 sm:px-6 py-2 sm:py-3 bg-[#0c0818] hover:bg-gray-800 text-white text-lg rounded-full">
              <Info size={20} /> More Info
            </button>
          </Link>
        </div>
      </div>
    </>
  )}
</div>

      <div className="container mx-auto  py-6 px-4 ">
        <SwiperCards movies={trendingMovies} title="Trending Movies" type="movies" loading={loading} />
        <SwiperCards movies={trendingTvShows} title="Trending Tv" type="tv-show" loading={loading}/>
        <SwiperCards movies={topRated} title="Top Rated Movies" type="movies" loading={loading}/>
        <SwiperCards movies={topRatedTv} title="Top Rated Tv" type="tv-show" loading={loading}/>

      </div>
    </>
  );
};

export default Home;
