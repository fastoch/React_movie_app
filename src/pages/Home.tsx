import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-900 text-white text-center p-8">
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