import React, { useState } from 'react';
import ProductCard from './components/ProductCard';
import { PRODUCTS } from '../SAMPLE_DATA';
import './styles/app.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [notification, setNotification] = useState('');

  // Get unique categories
  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
    showNotification(`${product.name} added to cart!`);
  };

  // Handle view details
  const handleViewDetails = (product) => {
    showNotification(`Viewing details for: ${product.name}`);
  };

  // Show temporary notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>Product Showcase</h1>
          <p>Explore our collection of premium products</p>
        </div>
        <div className="cart-badge">
          🛒 Cart ({cartItems.length})
          {cartTotal > 0 && (
            <span className="cart-total">${cartTotal.toFixed(2)}</span>
          )}
        </div>
      </header>

      {/* Notification */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      {/* Category Filter */}
      <div className="filter-section">
        <h2>Filter by Category</h2>
        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <main className="products-section">
        <div className="products-count">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
        </div>
        
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; 2026 Product Showcase. Built with React & Props.</p>
      </footer>
    </div>
  );
}

export default App;
