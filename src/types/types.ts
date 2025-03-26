export type LoginFormData ={
  email: string;
  password: string;
}
export type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};
interface Genre {
  id: number;
  name: string;
}
interface Companies {
  id: number;
  logo_path: string;
  name: string;
}
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview?: string;
  vote_average?: number;
  release_date?: string;
  genres?: Genre[];
  production_companies?: Companies[];
}

interface Genre {
    id: number;
    name: string;
  }
  interface Created {
    id: number;
    profile_path: string;
    name: string;
  }
 export interface TVShow {
    id: number;
    name: string;
    poster_path: string;
    overview?: string;
    vote_average?: number;
    first_air_date?: string;
    genres?: Genre[];
    created_by?: Created[];
  }
  
  // export interface WatchlistItem {
  //   movieId: number;
  //   title?: string;
  //   name?: string;  
  //   poster_path: string;
  //   isMovie: boolean; 
  // }
  export interface WatchlistItem extends Partial<Movie>, Partial<TVShow> {
    movieId: number;
    isMovie: boolean;
  }
  