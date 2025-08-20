import Movie from './components/Movie'
import NavigationBar from './components/NavigationBar';
import { movies } from './data/movies';
import type { MovieInterface } from './interfaces/movie';
import { useState } from 'react';

const App = () => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const updateWishlist = (movieId: number) => {
    const movie = movies.find((m) => m.id === movieId);
    if (!movie) return; 

    setWishlist((currentWishlist) => {
      // if the movie is not already in the wishlist, add it
      if (!currentWishlist.includes(movie.title)) {
        return [...currentWishlist, movie.title];;
      } 
      // else, remove it
      return currentWishlist.filter((title) => title !== movie.title);
    })
  }

  return (
    <>
      <NavigationBar wishlist={wishlist} updateWishlist={updateWishlist} />
      <div className='flex items-center justify-center gap-3.5 mx-auto flex-wrap'>
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
};

export default App;