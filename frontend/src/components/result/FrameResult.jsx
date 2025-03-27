import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import OpticsCards from './OpticsCards';
import FilterSidebar from './FilterSidebar';

const FrameResult = () => {
  const { shapeName } = useParams();
  const location = useLocation();
  const products = location.state?.products || [];
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [title, setTitle] = useState('');

  useEffect(() => {
    let initialFilteredProducts = [];
    let newTitle = '';

    if (shapeName === 'all') {
      initialFilteredProducts = products.filter(
        (product) => product?.frame_measurements?.style
      );
      newTitle = 'All Styled Products';
    } else {
      initialFilteredProducts = products.filter(
        (product) =>
          product?.frame_measurements?.style &&
          product.frame_measurements.style.toLowerCase() === shapeName.toLowerCase()
      );
      newTitle = `Shop By Style: ${shapeName}`;
    }
    setFilteredProducts(initialFilteredProducts);
    setTitle(newTitle);
  }, [shapeName, products]);

  const handleFilterChange = (newFilteredProducts) => {
    setFilteredProducts(newFilteredProducts);
  };

  return (
    <div className="pt-[140px]">
      <h2 className="text-3xl font-bold text-center mb-6">
        {title}
      </h2>
      <div className="flex">
        <div className="hidden md:block w-1/4 border-2 border-gray-200 p-2">
          <FilterSidebar products={products} onFilterChange={handleFilterChange} />
        </div>
        <div className="w-full md:w-3/4 border-2 border-gray-200 p-2">
          {filteredProducts.length > 0 ? (
            <OpticsCards products={filteredProducts} />
          ) : (
            <p className="text-center text-gray-500">
              {shapeName === 'all' ? 'No styled products found.' : `No products found with the style: ${shapeName}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FrameResult;