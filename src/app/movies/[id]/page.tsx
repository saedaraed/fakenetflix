import Image from "next/image";
import { getMovieDetails } from "../../../lib/tmdpApi";
import { Play } from "lucide-react";
import { Movie } from "../../../types/types";

const MovieDetailsPage = async ({ params }: { params: { id: string } }) => {
  const movieId = parseInt(params.id, 10);
  const movie = await getMovieDetails(movieId);

  if (!movie) {
    return;
  }

  return (
    <>
      <div
        className="relative container mx-auto  "
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.poster_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-lg"></div>

        <div className="container mx-auto  flex justify-between gap-5 bg-white/10 backdrop-blur-lg rounded-lg p-6 ">
          <div className="w-[50%] ">
            <h1 className="text-[8 0px] font-bold text-white">{movie.title}</h1>

            <div className="flex items-center gap-4">
              <p className="text-white ">{movie.release_date}</p>
              <p className="text-white ">|</p>
              <div className="flex gap-3">
                {movie?.genres.map((item) => (
                  <p key={item.id}>{item.name}</p>
                ))}
              </div>
            </div>
            <div className="flex gap-5 items-center mt-5">
              <h2 className="text-[20px]   w-[200px]">Overview</h2>
              <p className="opacity-70 mt-4 text-md leading-relaxed font-light">
                {movie.overview}{" "}
              </p>
            </div>
            <div className="flex gap-5 items-center mt-5">
              <h2 className="text-[20px]  w-[200px]">Production Companies</h2>
              <div className="flex gap-5 items-center">
                {movie.production_companies.map((item) => (
                  <div key={item.id}>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                      alt={item.name}
                      width={100}
                      height={50}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
            <p className="text-white mt-4"> {movie.vote_average}</p>
          </div>
          <div className="relative mt-4 w-[50%] mx-auto flex justify-center">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
              layout="responsive"
              className="w-full max-w-sm"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0.1))",
                maskImage:
                  "linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0.1))",
              }}
            />

            <div className="absolute flex top-[85%] left-[25%] flex items-center gap-4">
              <div className=" w-[60px] h-[60px] bg-red-600/20 backdrop-blur-md shadow-xl rounded-full flex justify-center items-center">
                <button className="flex gap-3 items-center px-3 py-3 bg-red-600 hover:bg-red-700 text-white text-lg rounded-full">
                  <Play size={20} />
                </button>
              </div>
              <p className=" text-white text-lg ">Watch Now</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-5">
        <h2 className="text-white text-xl font-bold">Recommendations</h2>
      </div>
    </>
  );
};

export async function generateStaticParams() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY"
    );
    if (!response.ok) throw new Error("Failed to fetch movie data");

    const data = await response.json();

    if (!data.results) {
      console.error("No results found in API response");
      return [];
    }

    const paths = data.results.map((movie: Movie) => ({
      id: movie.id.toString(),
    }));

    return paths;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return [];
  }
}

export const revalidate = 60;

export default MovieDetailsPage;
