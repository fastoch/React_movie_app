import { Link } from 'react-router-dom';
import { movies } from '../data/movies';
import type { MovieInterface } from '../interfaces/movie';

const Home = () => {
  const featuredMovies: MovieInterface[] = movies.slice(0, 5);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-900 text-white text-center p-8">
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-200 tracking-tight">
          Featured Movies
        </h2>
        <div className="flex justify-center gap-x-6 gap-y-10 flex-wrap">
          {featuredMovies.map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id} className="group">
              <div className="w-40 md:w-48">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-indigo-500/30"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-3xl">
        <h1 className="text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
          Welcome to Your Movie Universe
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Discover, track, and create your personal movie wishlist. All your favorite films in one place.
        </p>
        <Link
          to="/movies"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          Explore Movies
        </Link>
      </div>
    </div>
  );
};

export default Home;