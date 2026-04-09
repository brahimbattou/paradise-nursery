import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import CartItem from './CartItem';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

function AppContent() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
    setShowCart(false);
  };

  const handleShowCart = () => {
    setShowCart(true);
    setShowProductList(false);
  };

  const handleShowProducts = () => {
    setShowCart(false);
    setShowProductList(true);
  };

  const handleHome = () => {
    setShowCart(false);
    setShowProductList(false);
  };

  if (showCart) {
    return <CartItem onContinueShopping={handleShowProducts} onHome={handleHome} onShowCart={handleShowCart} />;
  }

  if (showProductList) {
    return <ProductList onHome={handleHome} onShowCart={handleShowCart} />;
  }

  return (
    <div className="landing-page">
      <h1>Paradise Nursery</h1>
      <p>Where Green Meets Serenity</p>
      <button className="get-started-btn" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
