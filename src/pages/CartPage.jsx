import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

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
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Your Cart</h1>
      
      {checkoutSuccess && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-6 text-center animate-fade-in">
          Order placed successfully!
        </div>
      )}
      
      {cart.length === 0 && !checkoutSuccess ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link to="/" className="btn-secondary">Continue Shopping</Link>
        </div>
      ) : (
        <>
          {cart.length > 0 && (
            <>
              <div className="mb-8">
                <div className="hidden md:grid md:grid-cols-5 gap-4 font-medium text-gray-700 border-b pb-2 mb-4">
                  <div className="col-span-2">Product</div>
                  <div className="text-center">Price</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-right">Total</div>
                </div>
                
                {cart.map(item => (
                  <div 
                    key={item.id}
                    className="grid grid-cols-1 md:grid-cols-5 gap-4 border border-gray-200 rounded-lg p-4 mb-4"
                  >
                    <div className="md:col-span-2 flex gap-4">
                      <div className="w-20 h-20 bg-gray-50 p-2 flex items-center justify-center rounded">
                        <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{item.title}</h3>
                        <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between md:block">
                      <span className="md:hidden font-medium">Price:</span>
                      <span className="md:text-center block">${item.price.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between md:block">
                      <span className="md:hidden font-medium">Quantity:</span>
                      <div className="md:text-center">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, e)}
                          className="form-input w-20 text-center"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center md:flex-col">
                      <span className="md:hidden font-medium">Total:</span>
                      <span className="md:text-right block font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      <button 
                        onClick={() => handleRemove(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm mt-2 transition-colors md:self-end"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-6 text-xl font-bold">
                  <span>Total:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                  <Link to="/" className="btn-secondary text-center">
                    Continue Shopping
                  </Link>
                  <button onClick={handleCheckout} className="btn-primary">
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
