import Image from "next/image";
import { getTVShowDetails } from "../../../lib/tmdpApi";
import { Play, Star } from "lucide-react";

const TVDetailsPage = async ({ params }: { params: { id: string } }) => {
  const showId = parseInt(params.id, 10);
  const tvShow = await getTVShowDetails(showId);

  if (!tvShow) {
    return <p className="text-white text-center"> not available </p>;
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
        className="relative container mx-auto"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${tvShow.poster_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-lg"></div>

        <div className="container mx-auto flex flex-col-reverse md:flex-row justify-between gap-5 bg-white/10 backdrop-blur-lg rounded-lg p-6">
  <div className="w-full md:w-[50%]">
    <h1 className="text-[40px] font-bold text-white">{tvShow.name}</h1>
    <div className="flex gap-1 mt-4">
                {tvShow.vote_average !== undefined && renderStars(tvShow.vote_average)} 
              </div>   
              <hr className="mt-4 mb-4 opacity-50"/>

    <div className="flex items-center gap-4">
      <p className="text-white">{tvShow.first_air_date}</p>
      <p className="text-white">|</p>
      <div className="flex gap-3">
        {tvShow?.genres?.map((item) => (
          <p key={item.id} className="text-white">{item.name}</p>
        ))}
      </div>
    </div>

    <div className="flex gap-5 items-center mt-5">
      <p className="opacity-70 mt-4 text-md leading-relaxed font-light text-white">
        {tvShow.overview}
      </p>
    </div>

    <div className="flex gap-5 items-center mt-5">
      <div className="flex gap-5 items-center">
        {tvShow?.created_by?.map((item) => (
          <div key={item.id} className="w-[60px] h-[60px] overflow-hidden rounded-full">
            <Image
              src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
              alt={item.name}
              width={60}
              height={60}
              className="object-cover" 
            />
          </div>
        ))}
      </div>
    </div>

  </div>

  <div className="relative mt-4 w-full md:w-[50%] mx-auto flex justify-center">
    <Image
      src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
      alt={tvShow.name}
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
      <p className="text-white text-lg"> Watch Now</p>
    </div>
  </div>
</div>

      </div>

      <div className="container mx-auto mt-5">
        {/* <h2 className="text-white text-xl font-bold">Recommendations</h2> */}
      </div>
    </>
  );
};


export default TVDetailsPage;
