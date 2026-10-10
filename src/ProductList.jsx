import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

// Builds a small thumbnail image (SVG data URI) so every plant has a picture
// that always loads. You can replace any `image` value with a real photo URL.
const thumb = (emoji, bg) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">` +
      `<rect width="300" height="300" fill="${bg}"/>` +
      `<text x="150" y="190" font-size="130" text-anchor="middle">${emoji}</text>` +
      `</svg>`
  );

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: thumb('🌿', '#c8e6c9'), description: 'Produces oxygen at night and removes toxins.', cost: 15 },
      { name: 'Spider Plant', image: thumb('🍃', '#dcedc8'), description: 'Filters formaldehyde and xylene from the air.', cost: 12 },
      { name: 'Peace Lily', image: thumb('🌼', '#f1f8e9'), description: 'Removes mold spores and purifies the air.', cost: 18 },
      { name: 'Boston Fern', image: thumb('🌱', '#c5e1a5'), description: 'Natural humidifier that removes pollutants.', cost: 20 },
      { name: 'Rubber Plant', image: thumb('🪴', '#a5d6a7'), description: 'Absorbs airborne chemicals and is easy to care for.', cost: 17 },
      { name: 'Aloe Vera', image: thumb('🌵', '#b2dfdb'), description: 'Purifies air and soothes burns and cuts.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: thumb('💜', '#e1bee7'), description: 'Calming scent that promotes relaxation and sleep.', cost: 20 },
      { name: 'Jasmine', image: thumb('🤍', '#f5f5f5'), description: 'Sweet floral fragrance that uplifts the mood.', cost: 18 },
      { name: 'Rosemary', image: thumb('🌾', '#d7ccc8'), description: 'Fragrant herb that improves focus and memory.', cost: 15 },
      { name: 'Mint', image: thumb('🍀', '#b9f6ca'), description: 'Refreshing aroma that repels insects.', cost: 12 },
      { name: 'Lemon Balm', image: thumb('🍋', '#fff9c4'), description: 'Lemony scent that reduces stress and anxiety.', cost: 14 },
      { name: 'Gardenia', image: thumb('🌸', '#f8bbd0'), description: 'Rich, sweet blossoms that perfume the room.', cost: 22 },
    ],
  },
  {
    category: 'Succulents and Cacti',
    plants: [
      { name: 'Jade Plant', image: thumb('💚', '#c8e6c9'), description: 'Symbol of good luck, very low maintenance.', cost: 13 },
      { name: 'Echeveria', image: thumb('🌹', '#ffccbc'), description: 'Rosette-shaped succulent in soft pastel colors.', cost: 11 },
      { name: 'Zebra Haworthia', image: thumb('🦓', '#cfd8dc'), description: 'Striped leaves, thrives in small pots.', cost: 10 },
      { name: 'Burro\'s Tail', image: thumb('🐴', '#dcedc8'), description: 'Trailing stems, perfect for hanging baskets.', cost: 16 },
      { name: 'Barrel Cactus', image: thumb('🌵', '#ffe0b2'), description: 'Round, sun-loving cactus that needs little water.', cost: 19 },
      { name: 'Panda Plant', image: thumb('🐼', '#eceff1'), description: 'Fuzzy silver leaves that are soft to the touch.', cost: 15 },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  // Total number of items in the cart (sum of all quantities)
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  const handleHome = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handlePlants = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleCart = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  // If an item was removed from the cart, its button should be enabled again
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  return (
    <div>
      {/* Navbar: shown on both the Plants page and the Cart page */}
      <nav className="navbar">
        <div className="navbar-brand">🌿 Paradise Nursery</div>
        <div className="navbar-links">
          <a href="#home" onClick={handleHome}>Home</a>
          <a href="#plants" onClick={handlePlants}>Plants</a>
          <a href="#cart" onClick={handleCart} className="cart-icon" aria-label="Cart">
            🛒
            <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-page">
          {plantsArray.map((group) => (
            <section key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="product-grid">
                {group.plants.map((plant) => {
                  const disabled = addedToCart[plant.name] && isInCart(plant.name);
                  return (
                    <div className="product-card" key={plant.name}>
                      <img src={plant.image} alt={plant.name} />
                      <h3>{plant.name}</h3>
                      <p className="product-description">{plant.description}</p>
                      <p className="product-price">${plant.cost}</p>
                      <button
                        className="add-to-cart-button"
                        onClick={() => handleAddToCart(plant)}
                        disabled={disabled}
                      >
                        {disabled ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
