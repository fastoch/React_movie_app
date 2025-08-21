import Movie from '../components/Movie'
import { movies } from '../data/movies';
import type { MovieInterface } from '../interfaces/movie';

type MoviesProps = {
  wishlist: string[];
  updateWishlist: (movieId: number) => void;
}
const Movies = ({ wishlist, updateWishlist }: MoviesProps) => {
  return (
    <>
      <div className='flex items-center justify-center gap-3.5 mx-auto my-2 flex-wrap'>
        {
          movies.length > 0 && movies.map((movie: MovieInterface) => (
            <div key={movie.id}>
              <Movie movieData={movie} movieRate={movie.vote_average} wishlist={wishlist} updateWishlist={updateWishlist} />
            </div>
          ))
        }
      </div>
    </>
   
  );
}

export default Movies