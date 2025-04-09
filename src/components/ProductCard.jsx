import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="card h-full flex flex-col">
      <div className="h-48 bg-gray-50 p-4 flex items-center justify-center">
        <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-medium mb-1 line-clamp-2 h-10">{product.title}</h3>
        <p className="text-gray-900 font-bold mb-1">${product.price.toFixed(2)}</p>
        <p className="text-gray-500 text-xs capitalize mb-4">{product.category}</p>
        <Link 
          to={`/product/${product.id}`} 
          className="mt-auto btn-primary text-center text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
