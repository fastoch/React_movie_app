import { movies } from '../data/movies';

type WishlistPageProps = {
  wishlist: string[];
  updateWishlist: (movieId: number) => void;
}

const WishlistPage = ({ wishlist, updateWishlist }: WishlistPageProps) => {
  const handleRemove = (movieTitle: string) => {
    const movie = movies.find((m) => m.title === movieTitle);
    if (movie) {
      updateWishlist(movie.id);
    }
  };

  return (
    <div className="p-8 text-white max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {wishlist.map((movie) => (
            <li className="flex justify-between items-center px-4 py-2 my-2 bg-gray-800 rounded" key={movie}>
              <span>{movie}</span>
              <button
                onClick={() => handleRemove(movie)}
                className="ml-4 p-1 text-2xl leading-none text-red-500 hover:text-red-700 transform transition-transform duration-150 hover:scale-125"
                aria-label={`Remove ${movie} from wishlist`}>
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

