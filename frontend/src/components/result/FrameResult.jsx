import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import OpticsCards from './OpticsCards';
import FilterSidebar from './FilterSidebar';

const FrameResult = () => {
  const { shapeName } = useParams();
  const location = useLocation();
  const products = location.state?.products ||[];

  let filteredProducts = [];
  let title = '';

  if (shapeName === 'all') {
    filteredProducts = products.filter(
      (product) => product?.frame_measurements?.style
    );
    title = 'All Styled Products';
  } else {
    filteredProducts = products.filter(
      (product) =>
        product?.frame_measurements?.style &&
        product.frame_measurements.style.toLowerCase() === shapeName.toLowerCase()
    );
    title = `Shop By Style: ${shapeName}`;
  }

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