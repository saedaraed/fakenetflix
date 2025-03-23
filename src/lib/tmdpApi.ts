import axios from "axios";
import {TVShow , Movie} from '../types/types'
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
console.log("API Key:", API_KEY);

interface ApiResponse<T> {
  results: T[];
}
export const fetchData = async <T>(endpoint: string): Promise<T | null> => {
  try {
    const response = await axios.get<T>(`${BASE_URL}${endpoint}`, {
      params: { api_key: API_KEY },
      timeout: 5000, 
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
export const getTrendingMovies = () =>
  fetchData<ApiResponse<Movie>>("/trending/movie/week");
export const getTrendingTVShows = () =>
  fetchData<ApiResponse<TVShow>>("/trending/tv/week");
export const getTopRatedMovies = () =>
  fetchData<ApiResponse<Movie>>("/movie/top_rated");
export const getTopRatedTVShows = () =>
  fetchData<ApiResponse<TVShow>>("/tv/top_rated");

export const getPopularMovies = () =>
  fetchData<ApiResponse<Movie>>("/movie/popular");
export const getUpcomingMovies = () =>
  fetchData<ApiResponse<Movie>>("/movie/upcoming");

export const getPopularTVShows = () =>
  fetchData<ApiResponse<TVShow>>("/tv/popular");
export const getCurrentlyAiringTVShows = () =>
  fetchData<ApiResponse<TVShow>>("/tv/on_the_air");

export const searchMovies = (query: string) =>
  fetchData<ApiResponse<Movie>>(`/search/movie?query=${query}`);
export const searchTVShows = (query: string) =>
  fetchData<ApiResponse<TVShow>>(`/search/tv?query=${query}`);

export const getMovieDetails = (movieId: number) =>
  fetchData<Movie>(`/movie/${movieId}`);
export const getTVShowDetails = (tvId: number) =>
  fetchData<TVShow>(`/tv/${tvId}`);

export const getMovieRecommendations = (movieId: number) => {
  return fetchData<ApiResponse<Movie>>(`/movie/${movieId}/recommendations`);
};
