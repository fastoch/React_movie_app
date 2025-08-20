import { useState } from 'react';

type WishListProps = {
  movieList: string[];
}

const WishList = ( { movieList }: WishListProps) => {
  const [visible, setVisible] = useState(false);

  // Toggles menu visibility
  const handleVisibility = () => setVisible(!visible);

  return (
    <div>
      <button onClick={handleVisibility}>
        WishList ({movieList.length})
      </button>
      {visible && (
        <div className="bg-amber-50 text-black rounded">
          <ul>
            {movieList.map((movie) => (
              <li className="p-0.5" key={movie}>{movie}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default WishList;
