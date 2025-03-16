import React, { useEffect, useState } from "react";
import { useParams, useLocation } from 'react-router-dom';
import OpticsCards from "./OpticsCards";
import FilterSidebar from "./FilterSidebar";

const PriceResults = () => {
  const { priceRange } = useParams();
  const location = useLocation();
  const products = location.state?.products || []; // Access products from route state
  const [filteredProducts, setFilteredProducts] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (priceRange && products.length > 0) {
      setLoading(true);
      const maxPrice = parseInt(priceRange.split('-')[1], 10);
      const filtered = products.filter(product => product.price && parseInt(product.price.replace('₹', ''), 10) <= maxPrice);
      setFilteredProducts(filtered);
      console.log("Filtered products by price:", filtered);
      setLoading(false);
    } else if (priceRange && products.length === 0) {
      console.log("Products data not received for price filtering in PriceResults component.");
      setLoading(false);
    }
  }, [priceRange, products]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="flex pt-[140px]">
      <div className="hidden md:block w-1/4 ">
        <FilterSidebar />
      </div>
      <div className="w-full md:w-3/4">
        <OpticsCards products={filteredProducts} />
      </div>
    </div>
  );
};

export default PriceResults;