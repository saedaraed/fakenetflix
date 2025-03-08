import { cookies } from 'next/headers'; 
import { fetchMoviesWithToken } from '@/lib/fetchMoviesWithToken';
import MovieList from '@/components/MovieList';
import Image from 'next/image';
import { Play, Info } from 'lucide-react';
import TopRated from '@/components/TopRated';

const Home = async () => {
  // قراءة الكوكيز (ولكننا لن نحتاجها هنا بعد التعديل في fetchMoviesWithToken)
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken')?.value;

  // استدعاء fetchMoviesWithToken بدون تمرير authToken لأنه لا يحتاجه
  const popularMovies  = await fetchMoviesWithToken("popular");
  const topRatedMovies  = await fetchMoviesWithToken("top_rated");

  return (
    <>
      <div className="bg-red-500 w-full h-[90vh] relative">
        {popularMovies .length > 2 && (
          <>
            <Image
              src={`https://image.tmdb.org/t/p/w500${popularMovies[2]?.poster_path}`}
              alt="Movie Poster"
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c0818]" />
            <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-left text-white lg:w-1/3">
              <h1 className="text-4xl font-bold mb-4">{popularMovies[2]?.title}</h1>
              <p className="mt-5 opacity-50">{popularMovies[2]?.overview}</p>
              <div className="flex gap-6 mt-5">
                <button className="flex gap-3 items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-lg rounded-full">
                  <Play size={20} /> Play
                </button>
                <button className="flex gap-3 items-center px-6 py-3 bg-[#0c0818] hover:bg-[#0c0818]-700 text-white text-lg rounded-full">
                  <Info size={20} /> More Info
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="container mx-auto  py-6">

        <MovieList movies={popularMovies} />
        <TopRated movies={topRatedMovies}/>
      </div>
    </>
  );
};

export default Home;
