import { useState, useRef, useEffect } from 'react';

type WishListProps = {
  movieList: string[];
}

const WishList = ( { movieList }: WishListProps) => {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Toggles wishlist's visibility
  const handleVisibility = () => setVisible(!visible);

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
              <li className="cursor-pointer px-4 py-2 hover:bg-amber-100" key={movie}>{movie}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default WishList;
