"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "swiper/css";
import { Navigation } from "swiper/modules";
import SkeltonCad from "./SkeltonLoader";
import {Movie ,  TVShow} from '../types/types'

interface SwiperProps {
  movies: (Movie | TVShow)[];
  title: string;
  type: "movies" | "tv-show"; 
  loading?:boolean;
}

const SwiperCards: React.FC<SwiperProps> = ({ movies, title, type , loading }) => {
  return (
    <div className="mt-5">
      <h2 className="text-white text-xl font-bold">{title}</h2>
      <Swiper
        slidesPerView={2}
        spaceBetween={0}
        centeredSlides={false}
        navigation={true}
        loop={false}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 }, 
          1280: { slidesPerView: 6 }, 
        }}
        modules={[Navigation]}
        className="mt-4"
      >
       {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SwiperSlide key={index}>
                <SkeltonCad/>
              </SwiperSlide>
            ))
          : movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard movie={movie} type={type} />
              </SwiperSlide>
            ))}
       
      </Swiper>
    </div>
  );
};

export default SwiperCards;
