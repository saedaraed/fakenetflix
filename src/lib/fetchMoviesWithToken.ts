import axios from "axios";

const TOKEN = process.env.TMDB_ACCESS_TOKEN;
// const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMoviesWithToken = async (category = "popular") => {
  try {
    const res = await axios(`https://api.themoviedb.org/3/movie/${category}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    // Axios automatically parses the response, no need for .json()
    return res.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; 
  }
};
