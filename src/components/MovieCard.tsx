import styles from "../styles/MovieCard.module.css";

const MovieCard = ({ movie }: { movie: any }) => {
    return (
      <div className={styles.card} >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ width: "100%", borderRadius: "8px" }}
        />
   <div className={styles.overlay}>
        <h3>{movie.title}</h3>
        <div className={styles.buttoncontainer}>
          <button className={styles.button}>Details</button>
          <button className={styles.button}>Watchlist</button>
        </div>
      </div>
      </div>
    );
  };
  
  export default MovieCard;
  