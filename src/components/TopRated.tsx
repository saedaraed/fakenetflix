"use client"

import { Swiper, SwiperSlide } from "swiper/react";

import MovieCard from "./MovieCard";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "swiper/css";

import {  Navigation } from "swiper/modules";

const TopRated = ({ movies }: { movies: any[] }) => {

  return (
    <div className="mt-5">
      <h2 className='text-white text-xl font-bold'>Top Rated on Fakenetflix</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        centeredSlides={false}
        navigation={true}
        loop={false}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView:6 },
        }}
        modules={[ Navigation]}
        className="mt-4"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
   
  );
};

export default TopRated;
