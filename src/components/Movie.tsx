import type { MovieInterface } from "../interfaces/movie";
import { useState } from "react";
import { Link } from "react-router-dom";

type MovieComponentProps = {
    movieData: MovieInterface;
    movieRate: number;
    wishlist: number[];
    updateWishlist: (movieId: number) => void;
}

const Movie = ({ movieData, movieRate, wishlist, updateWishlist }: MovieComponentProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false)

  const isInWishlist = wishlist.includes(movieData.id);

  return (
    <div>
      <Link to={`/movies/${movieData.id}`}>
          <img className="w-[350px]" src={'https://image.tmdb.org/t/p/w500' + movieData.poster_path} alt={movieData.title} />
      </Link>
      <h2>{movieData.title}</h2>
      <div className="flex items-center gap-1 my-2">
        <button onClick={() => setIsLiked(!isLiked)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {isLiked ? 'Dislike' : 'Like'}
        </button>
        <button onClick={() => updateWishlist(movieData.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        </button>
        <img src="/star.svg" alt="star icon" className="w-4 h-4 ml-1" />
        <span>{movieRate.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default Movie;