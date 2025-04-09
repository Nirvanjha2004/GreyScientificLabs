import React, { useState, useEffect } from 'react';
import { getAllProducts, getProductsByCategory, getAllCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import './ProductListingPage.css';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    
    fetchCategories();
  }, []);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError('');
      
      try {
        let data;
        
        if (selectedCategory) {
          data = await getProductsByCategory(selectedCategory);
        } else {
          data = await getAllProducts();
        }
        
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [selectedCategory]);
  
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredProducts = searchTerm
    ? products.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
        <div className="md:w-1/2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-input"
          />
        </div>
        
        <div className="md:w-1/3">
          <select 
            value={selectedCategory} 
            onChange={handleCategoryChange}
            className="form-input bg-white"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded mb-6 text-center">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="text-center py-12 text-gray-500">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No products found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
