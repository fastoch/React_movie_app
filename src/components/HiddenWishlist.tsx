import { useState } from 'react';

function MenuButton() {
  const [visible, setVisible] = useState(false);

  // Toggles menu visibility
  const handleClick = () => setVisible(!visible);

  return (
    <div>
      <button onClick={handleClick}>
        WishList
      </button>
      {visible && (
        <div className="menu">
          {/* Menu content */}
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default MenuButton;
