import React from "react";
import { useNavigate } from 'react-router-dom';

const ShopByPrice = ({ products }) => {
  const navigate = useNavigate();
  const priceOptions = [
    { label: "Under ₹50", value: 50 },
    { label: "Under ₹100", value: 100 },
    { label: "Under ₹150", value: 150 },
    { label: "Under ₹200", value: 200 },
  ];

  const handlePriceClick = (price) => {
    const routePrice = price.value;
    const routePath = `/price/0-${routePrice}`;
    navigate(routePath, { state: { products } });
  };

  return (
    <div className="text-center py-10 mb-12">
      <h2 className="text-3xl font-bold">Shop by Price</h2>
      <p className="text-gray-500 mt-2">Find affordable frames to fit your budget and style.</p>
      <div className="grid grid-cols-2 gap-4 mt-6 lg:flex lg:justify-around">
        {priceOptions.map((price, index) => (
          <button
            key={index}
            className="w-full lg:w-auto border border-gray-400 px-4 py-3 rounded-lg text-base font-bold hover:bg-gray-200 transition flex items-center justify-center gap-2 lg:px-6 lg:text-lg"
            onClick={() => handlePriceClick(price)}
          >
            {price.label} <span className="text-lg">&rarr;</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShopByPrice;