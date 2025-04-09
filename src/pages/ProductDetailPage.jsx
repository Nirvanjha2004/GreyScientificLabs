import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';

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
    return <div className="text-center py-12 text-gray-500">Loading product details...</div>;
  }
  
  if (error) {
    return <div className="bg-red-50 text-red-600 p-4 rounded mx-4 my-6 text-center">{error}</div>;
  }
  
  if (!product) {
    return <div className="bg-red-50 text-red-600 p-4 rounded mx-4 my-6 text-center">Product not found</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Link to="/" className="text-gray-600 hover:text-primary">&larr; Back to Products</Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden md:flex">
        <div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-80 max-w-full object-contain"
          />
        </div>
        
        <div className="md:w-1/2 p-6 md:p-8">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">{product.title}</h1>
          <p className="text-gray-500 mb-4 capitalize">{product.category}</p>
          <p className="text-2xl font-bold text-gray-900 mb-4">${product.price.toFixed(2)}</p>
          
          <div className="flex items-center mb-6">
            <span className="bg-primary text-white px-2 py-1 rounded text-sm mr-2">
              ★ {product.rating.rate}
            </span>
            <span className="text-gray-500 text-sm">({product.rating.count} reviews)</span>
          </div>
          
          <p className="mb-6 text-gray-700 leading-relaxed">{product.description}</p>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <label htmlFor="quantity" className="mr-3 font-medium text-gray-700">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="form-input w-20 text-center"
              />
            </div>
            
            <button 
              onClick={handleAddToCart} 
              className={`btn-primary flex-grow sm:flex-grow-0 ${addedToCart ? 'bg-green-500 hover:bg-green-600' : ''}`}
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
