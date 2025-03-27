import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import OpticsCards from './OpticsCards';
import FilterSidebar from './FilterSidebar';

const EyewearforEveryoneResult = () => {
  const { categoryName } = useParams();
  const location = useLocation();
  const products = location.state?.products || [];
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [title, setTitle] = useState('');

  useEffect(() => {
    let initialFilteredProducts = [];
    let newTitle = '';

    if (categoryName.toLowerCase() === 'all') {
      initialFilteredProducts = products; // Show all products when "Shop all" is clicked
      newTitle = 'All Eyewear';
    } else {
      // Determine the product type to filter by
      let productTypeToFilter = categoryName.replace(/_/g, ' ');

      if (productTypeToFilter.toLowerCase() === 'eye glasses') {
        initialFilteredProducts = products.filter(product =>
          product.product_type === 'prescription_glasses' ||
          product.product_type === 'Eyeglasses' ||
          product.product_type === 'Reading_Glasses'
        );
      } else if (productTypeToFilter.toLowerCase() === 'blue light') {
        initialFilteredProducts = products.filter(product =>
          product.product_type === 'blue_light_glasses' ||
          product.product_type === 'computer_glasses'
        );
      } else if (productTypeToFilter.toLowerCase() === 'sunglasses') {
        initialFilteredProducts = products.filter(product => product.product_type === 'sunglasses');
      } else if (productTypeToFilter.toLowerCase() === 'transitions') {
        initialFilteredProducts = products.filter(product => product.product_type === 'prescription_glasses'); // Adjust as needed
      } else if (productTypeToFilter.toLowerCase() === 'sports') {
        initialFilteredProducts = products.filter(product => product.product_type === 'sports'); // Ensure this matches your product data
      } else if (productTypeToFilter.toLowerCase() === 'designer') {
        initialFilteredProducts = products.filter(product => product.product_type === 'frame'); // Adjust as needed
      } else {
        initialFilteredProducts = products.filter(product => product.product_type.toLowerCase() === productTypeToFilter.toLowerCase());
      }
      newTitle = `Shop ${categoryName.replace(/_/g, ' ')}`;
    }
    setFilteredProducts(initialFilteredProducts);
    setTitle(newTitle);
  }, [categoryName, products]);

  const handleFilterChange = (newFilteredProducts) => {
    setFilteredProducts(newFilteredProducts);
  };

  return (
    <div className="pt-[120px]">
      <h2 className="text-3xl font-bold text-center mb-6">
        {title}
      </h2>
      <div className="flex">
        <div className="hidden md:block w-1/4 border-2 border-gray-200 p-2 ">
          <FilterSidebar products={products} onFilterChange={handleFilterChange} />
        </div>
        <div className="w-full md:w-3/4 border-2 border-gray-200 p-2">
          {filteredProducts.length > 0 ? (
            <OpticsCards products={filteredProducts} />
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EyewearforEveryoneResult;