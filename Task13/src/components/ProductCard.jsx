import React from 'react';
import PropTypes from 'prop-types';
import '../styles/productCard.css';

/**
 * ProductCard Component
 * Displays a product with image, details, price, rating, and action buttons
 * 
 * @component
 * @example
 * <ProductCard
 *   id={1}
 *   name="Product Name"
 *   price={99.99}
 *   originalPrice={149.99}
 *   category="Electronics"
 *   description="Product description"
 *   image="https://example.com/image.jpg"
 *   rating={4.5}
 *   reviews={150}
 *   inStock={true}
 *   discount={33}
 *   onAddToCart={() => console.log('Added to cart')}
 * />
 */
const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  category,
  description,
  image,
  rating = 0,
  reviews = 0,
  inStock = true,
  discount = 0,
  onAddToCart = () => {},
  onViewDetails = () => {}
}) => {
  // Validate required props
  if (!name || typeof price !== 'number' || !image) {
    console.error('ProductCard: Missing or invalid required props');
    return null;
  }

  const handleAddToCart = () => {
    if (inStock) {
      onAddToCart({ id, name, price });
    }
  };

  const handleViewDetails = () => {
    onViewDetails({ id, name });
  };

  const displayRating = Math.min(Math.max(rating, 0), 5);

  return (
    <div className="product-card">
      {/* Product Image Container */}
      <div className="product-image-container">
        <img 
          src={image} 
          alt={name}
          className="product-image"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400?text=Product';
          }}
        />
        {discount > 0 && (
          <div className="discount-badge">
            -{discount}%
          </div>
        )}
        {!inStock && (
          <div className="out-of-stock-overlay">
            <span>Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-info">
        {/* Category */}
        <p className="product-category">{category}</p>

        {/* Product Name */}
        <h3 className="product-name">{name}</h3>

        {/* Product Description */}
        <p className="product-description">{description}</p>

        {/* Rating */}
        <div className="product-rating">
          <span className="stars">
            {'★'.repeat(Math.floor(displayRating))}
            {displayRating % 1 !== 0 && '☆'}
            {'☆'.repeat(5 - Math.ceil(displayRating))}
          </span>
          <span className="rating-text">
            {displayRating.toFixed(1)} ({reviews} reviews)
          </span>
        </div>

        {/* Price Section */}
        <div className="product-pricing">
          <div className="price-container">
            <span className="current-price">${price.toFixed(2)}</span>
            {originalPrice > price && (
              <span className="original-price">${originalPrice.toFixed(2)}</span>
            )}
          </div>
          {originalPrice > price && (
            <span className="savings">
              Save ${(originalPrice - price).toFixed(2)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="product-actions">
          <button
            className={`btn-add-cart ${!inStock ? 'disabled' : ''}`}
            onClick={handleAddToCart}
            disabled={!inStock}
            aria-label={`Add ${name} to cart`}
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <button
            className="btn-view-details"
            onClick={handleViewDetails}
            aria-label={`View details for ${name}`}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * PropTypes validation
 * Ensures type safety and provides helpful warnings during development
 */
ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  originalPrice: PropTypes.number,
  category: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  rating: PropTypes.number,
  reviews: PropTypes.number,
  inStock: PropTypes.bool,
  discount: PropTypes.number,
  onAddToCart: PropTypes.func,
  onViewDetails: PropTypes.func
};

export default ProductCard;
