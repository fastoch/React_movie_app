import { useParams } from 'react-router-dom';
import { movies } from '../data/movies';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const movie = movies.find(m => m.id === Number(id));

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
}

export default MovieDetails