import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartCount } from './CartSlice';
import './App.css';

const plantsData = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { id: 1, name: 'Peace Lily', price: 12.99, description: 'Elegant white flowers, great for air purification.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Spathiphyllum_cochlearispathum_RTBG.jpg/400px-Spathiphyllum_cochlearispathum_RTBG.jpg' },
      { id: 2, name: 'Spider Plant', price: 8.99, description: 'Easy to grow, removes toxins from the air.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chlorophytum_comosum0.jpg/400px-Chlorophytum_comosum0.jpg' },
      { id: 3, name: 'Snake Plant', price: 14.99, description: 'Low maintenance, perfect for beginners.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg/400px-Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg' },
      { id: 4, name: 'Aloe Vera', price: 9.99, description: 'Medicinal plant with soothing gel.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloe_vera_flower_inset.png/400px-Aloe_vera_flower_inset.png' },
      { id: 5, name: 'Boston Fern', price: 11.99, description: 'Lush green fronds, excellent humidifier.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Boston_fern_on_display_at_Lyman_Plant_House.jpg/400px-Boston_fern_on_display_at_Lyman_Plant_House.jpg' },
      { id: 6, name: 'Rubber Plant', price: 16.99, description: 'Bold glossy leaves, great focal point.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Ficus_elastica_26022012.jpg/400px-Ficus_elastica_26022012.jpg' },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { id: 7, name: 'Lavender', price: 10.99, description: 'Calming fragrance, perfect for relaxation.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Lavender.jpg/400px-Hapus_Lavender.jpg' },
      { id: 8, name: 'Jasmine', price: 13.99, description: 'Sweet-smelling flowers, ideal for indoors.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Jasminum_polyanthum2.jpg/400px-Jasminum_polyanthum2.jpg' },
      { id: 9, name: 'Gardenia', price: 15.99, description: 'Beautiful white flowers with rich fragrance.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Gardenia_jasminoides.jpg/400px-Gardenia_jasminoides.jpg' },
      { id: 10, name: 'Mint', price: 6.99, description: 'Fresh aromatic herb, great in kitchen.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Lavender.jpg/400px-Hapus_Lavender.jpg' },
      { id: 11, name: 'Rosemary', price: 7.99, description: 'Fragrant herb with culinary uses.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Jasminum_polyanthum2.jpg/400px-Jasminum_polyanthum2.jpg' },
      { id: 12, name: 'Eucalyptus', price: 11.99, description: 'Fresh minty scent, great for home decor.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Gardenia_jasminoides.jpg/400px-Gardenia_jasminoides.jpg' },
    ],
  },
  {
    category: 'Succulent Plants',
    plants: [
      { id: 13, name: 'Echeveria', price: 7.99, description: 'Rosette-shaped succulent, drought tolerant.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Echeveria.jpg/400px-Echeveria.jpg' },
      { id: 14, name: 'Jade Plant', price: 9.99, description: 'Lucky plant with thick glossy leaves.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/JadePlant.jpg/400px-JadePlant.jpg' },
      { id: 15, name: 'Haworthia', price: 8.99, description: 'Compact succulent great for small spaces.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Haworthia_attenuata1.jpg/400px-Haworthia_attenuata1.jpg' },
      { id: 16, name: 'Cactus', price: 5.99, description: 'Low maintenance desert plant.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Lavender.jpg/400px-Hapus_Lavender.jpg' },
      { id: 17, name: 'Agave', price: 12.99, description: 'Architectural succulent with striking form.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Echeveria.jpg/400px-Echeveria.jpg' },
      { id: 18, name: 'Sedum', price: 6.99, description: 'Colorful ground cover succulent.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/JadePlant.jpg/400px-JadePlant.jpg' },
    ],
  },
];

function ProductList({ onHome, onShowCart }) {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const cartItems = useSelector(state => state.cart.items);
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedItems(prev => ({ ...prev, [plant.id]: true }));
  };

  const isInCart = (plantId) => {
    return cartItems.some(item => item.id === plantId) || addedItems[plantId];
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <ul className="navbar-links">
          <li><a href="#" onClick={onHome}>Home</a></li>
          <li><a href="#">Plants</a></li>
          <li>
            <span className="cart-icon" onClick={onShowCart}>
              🛒
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </span>
          </li>
        </ul>
      </nav>
      <div className="product-list">
        {plantsData.map(category => (
          <div key={category.category} className="category">
            <h2>{category.category}</h2>
            <div className="plants-grid">
              {category.plants.map(plant => (
                <div key={plant.id} className="plant-card">
                  <img src={plant.image} alt={plant.name} />
                  <div className="plant-info">
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="plant-price">${plant.price.toFixed(2)}</p>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.id)}
                    >
                      {isInCart(plant.id) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
