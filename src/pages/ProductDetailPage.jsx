import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError('');
        const data = await getProductById(productId);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [productId]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value < 1 ? 1 : value);
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    
    // Reset the "Added to Cart" message after 3 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };
  
  if (isLoading) {
    return <div className="loading">Loading product details...</div>;
  }
  
  if (error) {
    return <div className="error-message">{error}</div>;
  }
  
  if (!product) {
    return <div className="error-message">Product not found</div>;
  }
  
  return (
    <div className="product-detail-page">
      <div className="back-link">
        <Link to="/">&larr; Back to Products</Link>
      </div>
      
      <div className="product-detail-container">
        <div className="product-image-container">
          <img src={product.image} alt={product.title} className="product-detail-image" />
        </div>
        
        <div className="product-info-container">
          <h1 className="product-detail-title">{product.title}</h1>
          <p className="product-detail-category">{product.category}</p>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <div className="product-detail-rating">
            <span className="rating-score">★ {product.rating.rate}</span>
            <span className="rating-count">({product.rating.count} reviews)</span>
          </div>
          
          <p className="product-detail-description">{product.description}</p>
          
          <div className="add-to-cart-section">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
            
            <button 
              onClick={handleAddToCart} 
              className="add-to-cart-btn"
              disabled={addedToCart}
            >
              {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
