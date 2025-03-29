import Image from "next/image";
import { getMovieDetails ,getMovieRecommendations } from "../../../lib/tmdpApi";
import { Play } from "lucide-react";
import { Star } from "lucide-react"; 

const MovieDetailsPage =async({ params }: { params: { id: string } })=>{
  const showId = parseInt(params.id, 10);
  const movie = await getMovieDetails(showId);

  
  if (!movie) {
    return <p className="text-white text-center">not found</p>;
  }
  const renderStars = (voteAverage: number) => {
    const fullStars = Math.floor(voteAverage / 2); 
    const halfStars = voteAverage % 2 >= 1 ? 1 : 0; 
    const emptyStars = 5 - fullStars - halfStars;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="text-white" />);
    }
    if (halfStars > 0) {
      stars.push(<Star key="half" className="text-white/50" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-white/10" />);
    }
    return stars;
  };


  return (
    <>
      <div
        className="relative container mx-auto mt-5"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.poster_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#0c0818]/90 backdrop-blur-lg"></div>

        <div className="container mx-auto flex flex-col-reverse lg:flex-row justify-between gap-5 backdrop-blur-lg rounded-lg p-6">
          <div className="w-full lg:w-[50%]">
            <h1 className="text-[50px] font-bold text-white">{movie.title}</h1>
            <div className="flex gap-1">
                {movie.vote_average !== undefined && renderStars(movie.vote_average)} 
              </div>    
              <hr className="mt-4 mb-4 opacity-50"/>
            <div className="flex items-center gap-4">
              <p className="text-white">{movie.release_date}</p>
              <p className="text-white">|</p>
              <div className="flex gap-3">
                {movie?.genres?.map((item) => (
                  <p key={item.id}>{item.name}</p>
                ))}
              </div>
            </div>
            <div className="flex gap-5 items-center mt-5">
              {/* <h2 className="text-[20px] w-[200px]">Overview</h2> */}
              <p className="opacity-70 mt-4 text-md leading-relaxed font-light">
                {movie.overview}
              </p>
            </div>
            <div className="flex gap-5 items-center mt-5">
              {/* <h2 className="text-[20px] w-[200px]">Production Companies</h2> */}
              <div className="flex gap-5 items-center">
                {movie?.production_companies?.map((item) => (
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
                </div>
          <div className="relative mt-4 w-full lg:w-[50%]  mx-auto flex justify-center">
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
              <div className="w-[60px] h-[60px] bg-red-600/20 backdrop-blur-md shadow-xl rounded-full flex justify-center items-center">
                <button className="flex gap-3 items-center px-3 py-3 bg-red-600 hover:bg-red-700 text-white text-lg rounded-full">
                  <Play size={20} />
                </button>
              </div>
              <p className="text-white text-lg">Watch Now</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-5">
        <h2 className="text-white text-xl font-bold">Recommendations</h2>
      </div>
    </>
  );
  
}

export default MovieDetailsPage