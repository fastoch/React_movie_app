import { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import type { MovieInterface } from '../interfaces/movie';

type MoviesProps = {
  wishlist: number[];
  updateWishlist: (movieId: number) => void;
};

const Movies = ({ wishlist, updateWishlist }: MoviesProps) => {
  const [movies, setMovies] = useState<MovieInterface[]>([]); // new state that will store the data provided by the API

  // Fetching popular movies from TMDB's API using the axios library
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
      }
    };

    fetchMovies();
  }, []); // this empty array ensures the fetching happens only once, when the component is mounted

  return (
    <div className="flex items-center justify-center gap-3.5 mx-auto my-2 flex-wrap">
      {movies.length > 0 ? (
        movies.map((movie: MovieInterface) => (
          <div key={movie.id}>
            <Movie movieData={movie} movieRate={movie.vote_average} wishlist={wishlist} updateWishlist={updateWishlist} />
          </div>
        ))
      ) : (
        <p className="text-white">Chargement des films...</p>
      )}
    </div>
  );
};

export default Movies;