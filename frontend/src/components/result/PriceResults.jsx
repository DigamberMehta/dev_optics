// PriceResults.js
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import OpticsCards from "./OpticsCards";
import FilterSidebar from "./FilterSidebar";

const PriceResults = () => {
  // Extract priceRange from URL params and products from location state
  const { priceRange } = useParams();
  const location = useLocation();
  const products = location.state?.products || []; // Fallback to empty array if no products

  // State for filtered products and loading status
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(false);

  // Memoized callback to handle filter changes from FilterSidebar
  const handleFilterChange = useCallback((newFilteredProducts) => {
    setFilteredProducts(newFilteredProducts);
  }, []); // Empty dependency array ensures stability across renders

  // Effect to filter products based on priceRange when it or products change
  useEffect(() => {
    if (priceRange && products.length > 0) {
      setLoading(true);
      const maxPrice = parseInt(priceRange.split('-')[1], 10);
      const initialFiltered = products.filter((product) =>
        product.price && parseInt(product.price.replace('₹', ''), 10) <= maxPrice
      );
      setFilteredProducts(initialFiltered);
      console.log("Filtered products by price:", initialFiltered);
      setLoading(false);
    } else if (priceRange && products.length === 0) {
      console.log("Products data not received for price filtering in PriceResults component.");
      setLoading(false);
    }
  }, [priceRange, products]);

  // Render loading state
  if (loading) {
    return <div>Loading products...</div>;
  }

  // Render the component with FilterSidebar and OpticsCards
  return (
    <div className="flex pt-[100px]">
      {/* Sidebar (hidden on mobile) */}
      <div className="hidden md:block w-1/4 border-2 border-gray-200 p-2 ">
        <FilterSidebar products={products} onFilterChange={handleFilterChange} />
      </div>
      {/* Main content */}
      <div className="w-full md:w-3/4 border-2 border-gray-200 p-2">
        <OpticsCards products={filteredProducts} />
      </div>
    </div>
  );
};

export default PriceResults;