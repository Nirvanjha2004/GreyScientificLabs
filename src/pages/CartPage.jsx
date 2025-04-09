import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  
  const handleQuantityChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };
  
  const handleRemove = (productId) => {
    removeFromCart(productId);
  };
  
  const handleCheckout = () => {
    setCheckoutSuccess(true);
    clearCart();
    
    // Hide success message after 4 seconds
    setTimeout(() => {
      setCheckoutSuccess(false);
    }, 4000);
  };
  
  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      
      {checkoutSuccess && (
        <div className="checkout-success-message">
          Order placed successfully!
        </div>
      )}
      
      {cart.length === 0 && !checkoutSuccess ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      ) : (
        <>
          {cart.length > 0 && (
            <>
              <div className="cart-items">
                <div className="cart-header">
                  <div className="cart-item-product">Product</div>
                  <div className="cart-item-price">Price</div>
                  <div className="cart-item-quantity">Quantity</div>
                  <div className="cart-item-total">Total</div>
                  <div className="cart-item-actions">Actions</div>
                </div>
                
                {cart.map(item => (
                  <div className="cart-item" key={item.id}>
                    <div className="cart-item-product">
                      <div className="cart-item-image">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="cart-item-details">
                        <h3>{item.title}</h3>
                        <p className="cart-item-category">{item.category}</p>
                      </div>
                    </div>
                    <div className="cart-item-price">${item.price.toFixed(2)}</div>
                    <div className="cart-item-quantity">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e)}
                      />
                    </div>
                    <div className="cart-item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="cart-item-actions">
                      <button 
                        onClick={() => handleRemove(item.id)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-summary">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="cart-actions">
                  <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
                  <button onClick={handleCheckout} className="checkout-btn">
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;
