import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import OpticsCards from './OpticsCards';
import FilterSidebar from './FilterSidebar';

const EyewearforEveryoneResult = () => {
  const { categoryName } = useParams();
  const location = useLocation();
  const products = location.state?.products || [];

  // Determine the product type to filter by
  let productTypeToFilter = categoryName.replace(/_/g, ' ');

  let filteredProducts = [];

  if (productTypeToFilter.toLowerCase() === 'eye glasses') {
    filteredProducts = products.filter(product =>
      product.product_type === 'prescription_glasses' ||
      product.product_type === 'Eyeglasses' ||
      product.product_type === 'Reading_Glasses'
    );
  } else if (productTypeToFilter.toLowerCase() === 'blue light') {
    filteredProducts = products.filter(product =>
      product.product_type === 'blue_light_glasses' ||
      product.product_type === 'computer_glasses'
    );
  } else if (productTypeToFilter.toLowerCase() === 'sunglasses') {
    filteredProducts = products.filter(product => product.product_type === 'sunglasses');
  } else if (productTypeToFilter.toLowerCase() === 'transitions') {
    filteredProducts = products.filter(product => product.product_type === 'prescription_glasses'); // Adjust as needed
  } else if (productTypeToFilter.toLowerCase() === 'sports') {
    filteredProducts = products.filter(product => product.product_type === 'sports'); // Ensure this matches your product data
  } else if (productTypeToFilter.toLowerCase() === 'designer') {
    filteredProducts = products.filter(product => product.product_type === 'frame'); // Adjust as needed
  } else {
    filteredProducts = products.filter(product => product.product_type.toLowerCase() === productTypeToFilter.toLowerCase());
  }

  const title = `Shop ${categoryName.replace(/_/g, ' ')}`;

  return (
    <div className="pt-[140px]">
      <h2 className="text-3xl font-bold text-center mb-6">
        {title}
      </h2>
      <div className="flex">
        <div className="hidden md:block w-1/4 ">
          <FilterSidebar />
        </div>
        <div className="w-full md:w-3/4">
          {filteredProducts.length > 0 ? (
            <OpticsCards products={filteredProducts} />
          ) : (
            <p className="text-center text-gray-500">No products found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EyewearforEveryoneResult;