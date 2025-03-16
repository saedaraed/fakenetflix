import { Movie, TVShow, WatchlistItem } from "../types/types";
import Link from "next/link";
import styles from "../styles/MovieCard.module.css";
import { useWatchlist } from "../context/WatchListContext";
import { CircleMinus, CirclePlay, CirclePlus, Eye } from "lucide-react";

interface MovieCardProps {
  movie: Movie | TVShow;
  type: "movies" | "tv-show";
}

const MovieCard = ({ movie, type }: MovieCardProps) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  
  const isInWatchlist = watchlist.some((item) => item.movieId === movie.id);

  const handleWatchlistClick = () => {
    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      const newItem: WatchlistItem = {
        movieId: movie.id,
        isMovie: type === "movies",
        ...movie,
      };
      addToWatchlist(newItem);
    }
  };

  const title = type === "movies" ? (movie as Movie).title : (movie as TVShow).name;
  const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/path/to/default-image.jpg'; 

  return (
    <div className={styles.card}>
      <img
        src={posterPath}
        alt={title}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <div className={styles.overlay}>
     
        <div className={styles.buttoncontainer}>
          <Link href='/'><CirclePlay className=" hover:fill-red-500  hover:text-white w-8 h-8" strokeWidth={1}/></Link>
          <button  onClick={handleWatchlistClick}>
            {isInWatchlist ? <CircleMinus className=" hover:fill-white hover:text-black/80 w-7 h-7" strokeWidth={1}/>  :<CirclePlus className=" hover:fill-white hover:text-black/80  w-7 h-7" strokeWidth={1}/>}
          </button>
          <Link href={`/${type}/${movie.id}`} >
          <Eye className=" hover:fill-white hover:text-black/80 w-8 h-8" strokeWidth={1}/>
          </Link>
    
        </div>
        <h6 className="font-bold">{title}</h6>
        
      </div>
    </div>
  );
};

export default MovieCard;