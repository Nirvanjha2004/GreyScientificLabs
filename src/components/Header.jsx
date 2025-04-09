import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  if (!isAuthenticated) return null;
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between">
      <div className="mb-4 md:mb-0">
        <Link to="/" className="text-xl font-bold text-gray-800 hover:text-primary transition-colors">
          Shopping App
        </Link>
      </div>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="font-medium text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/cart" className="font-medium text-gray-700 hover:text-primary transition-colors relative">
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
          <li>
            <button 
              onClick={handleLogout} 
              className="font-medium text-gray-700 hover:text-primary transition-colors bg-transparent border-0 p-0"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
