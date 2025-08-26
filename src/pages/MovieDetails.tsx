import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import type { MovieInterface } from '../interfaces/movie';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=fr-FR`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du film :", error);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-white text-2xl mt-10">Chargement...</div>;
  }

  if (!movie) {
    return <div className="text-center text-white text-2xl mt-10">Movie not found!</div>;
  }

  return (
    <div className="p-8 text-white max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <img 
          className="w-full md:w-1/3 rounded-lg shadow-lg"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title} 
        />
        <div className="md:w-2/3">
          <h2 className="text-2xl font-semibold mb-2">Overview</h2>
          <p className="text-lg mb-4">{movie.overview}</p>
          <p><span className="font-bold">Release Date:</span> {movie.release_date}</p>
          <p><span className="font-bold">Rating:</span> {movie.vote_average.toFixed(1)} / 10</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;