import { useState } from 'react';

type WishListProps = {
  wishlist: string[];
}

const WishList = ( { wishlist }: WishListProps) => {
  const [visible, setVisible] = useState(false);

  // Toggles menu visibility
  const handleVisibility = () => setVisible(!visible);

  return (
    <div>
      <button onClick={handleVisibility}>
        WishList ({wishlist.length})
      </button>
      {visible 
        ? (<div className="">
            {/* Menu content */}
            <ul>
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
            </ul>
          </div>)
        : (<span></span>)
      }
    </div>
  );
}

export default WishList;
