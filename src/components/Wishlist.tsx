import { useState, useRef, useEffect } from 'react';
import { movies } from '../data/movies';

type WishListProps = {
  movieList: string[];
  updateWishlist: (movieId: number) => void;
}

const WishList = ( { movieList, updateWishlist }: WishListProps) => {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Toggles wishlist's visibility
  const handleVisibility = () => setVisible(!visible);

  const handleRemove = (movieTitle: string) => {
    const movie = movies.find((m) => m.title === movieTitle);
    if (movie) {
      updateWishlist(movie.id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setVisible(false);
      }
    };

    if (visible) {
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);

  return (
    <div ref={wrapperRef}>
      <button onClick={handleVisibility}>
        WishList ({movieList.length})
      </button>
      {visible && (
        <div className="w-100 absolute z-10 mt-2 bg-amber-50 text-black rounded shadow-lg">
          <ul>
            {movieList.map((movie) => (
              <li className="flex justify-between items-center px-4 py-2 hover:bg-amber-100" key={movie}>
                <span>{movie}</span>
                <button
                  onClick={() => handleRemove(movie)}
                  className="ml-4 p-1 text-lg leading-none text-red-500 hover:text-red-700"
                  aria-label={`Remove ${movie} from wishlist`}>
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default WishList;
