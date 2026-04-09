import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from './CartSlice';
import './App.css';

function CartItem({ onContinueShopping, onHome, onShowCart }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const cartCount = useSelector(selectCartCount);

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleCheckout = () => {
    alert('Coming Soon! Thank you for shopping at Paradise Nursery.');
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <ul className="navbar-links">
          <li><a href="#" onClick={onHome}>Home</a></li>
          <li><a href="#" onClick={onContinueShopping}>Plants</a></li>
          <li>
            <span className="cart-icon" onClick={onShowCart}>
              🛒
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </span>
          </li>
        </ul>
      </nav>
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div>
            <p>Your cart is empty.</p>
            <button className="continue-btn" onClick={onContinueShopping}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div>
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Unit Price: ${item.price.toFixed(2)}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrease(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(item.id)}>+</button>
                  </div>
                </div>
                <button className="delete-btn" onClick={() => handleRemove(item.id)}>
                  Delete
                </button>
              </div>
            ))}
            <div className="cart-total">
              Total Amount: ${cartTotal.toFixed(2)}
            </div>
            <div className="cart-actions">
              <button className="continue-btn" onClick={onContinueShopping}>
                Continue Shopping
              </button>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartItem;
