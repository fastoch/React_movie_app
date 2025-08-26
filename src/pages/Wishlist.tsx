import { useState, useEffect } from 'react';
import axios from 'axios';
import type { MovieInterface } from '../interfaces/movie';

type WishlistPageProps = {
  wishlist: number[];
  updateWishlist: (movieId: number) => void;
}

const WishlistPage = ({ wishlist, updateWishlist }: WishlistPageProps) => {
  const [moviesDetails, setMoviesDetails] = useState<MovieInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistMovieDetails = async () => {
      if (wishlist.length === 0) {
        setMoviesDetails([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const moviePromises = wishlist.map(id =>
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=fr-FR`)
        );
        const responses = await Promise.all(moviePromises);
        setMoviesDetails(responses.map(res => res.data));
      } catch (error) {
        console.error("Erreur lors de la récupération des détails des films de la wishlist :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistMovieDetails();
  }, [wishlist]);

  const handleRemove = (movieId: number) => {
    updateWishlist(movieId);
  };

  if (loading) {
    return <div className="p-8 text-white text-center">Loading wishlist...</div>;
  }

  return (
    <div className="p-8 text-white max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {moviesDetails.map((movie) => (
            <li className="flex justify-between items-center px-4 py-2 my-2 bg-gray-800 rounded" key={movie.id}>
              <span>{movie.title}</span>
              <button
                onClick={() => handleRemove(movie.id)}
                className="ml-4 p-1 text-2xl leading-none text-red-500 hover:text-red-700 transform transition-transform duration-150 hover:scale-125"
                aria-label={`Remove ${movie.title} from wishlist`}>
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WishlistPage;
