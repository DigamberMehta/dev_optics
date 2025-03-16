import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EyewearForEveryone({ products }) {
  const navigate = useNavigate();
  const eyewearCategories = [
    { name: "Eye Glasses", img: "https://static.zennioptical.com/marketing/homepage/componentsRedesign/FPO/products-eyeglasses.png", productType: "Eyeglasses" },
    { name: "Blue Light", img: "https://static.zennioptical.com/marketing/homepage/category/bluelight.jpg", productType: "blue_light_glasses" },
    { name: "Sunglasses", img: "https://static.zennioptical.com/marketing/homepage/componentsRedesign/FPO/products-sunglasses.png", productType: "sunglasses" },
    { name: "Transitions", img: "https://static.zennioptical.com/marketing/homepage/componentsRedesign/FPO/products-transitions.png", productType: "prescription_glasses" }, // You might need to adjust productType
    { name: "Sports", img: "https://static.zennioptical.com/marketing/campaign/sports_glasses/2024/HP/102224_Sports-Performance_category_Desktop_Site-Nav.png", productType: "sports" },
    { name: "Designer", img: "https://static.zennioptical.com/marketing/homepage/componentsRedesign/FPO/products-designer-brands.png", productType: "frame" }, // You might need to adjust productType
  ];

  const handleCategoryClick = (categoryName, productType) => {
    navigate(`/EyewearforEveryone/${categoryName.toLowerCase().replace(/ /g, '_')}`, { state: { products } });
  };

  const handleShopAllClick = () => {
    navigate('/EyewearforEveryone/all', { state: { products } });
  };

  return (
    <div className="text-center bg-white mt-12 frame">
      <h2 className="text-4xl font-bold mb-2">Eyewear for Everyone</h2>
      <p className="text-gray-600 mb-6">
        Discover Zenni’s high-quality glasses made for every vision need, every day.
      </p>

      <div className="grid grid-cols-3 gap-4 lg:flex lg:justify-between mb-6">
        {eyewearCategories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col items-center px-4 lg:px-6 border border-transparent hover:border-black rounded-lg p-3 transition-all duration-200 cursor-pointer"
            onClick={() => handleCategoryClick(category.name, category.productType)}
          >
            <img src={category.img} alt={category.name} className="w-24 h-12 mb-2" />
            <p className="text-sm font-medium hover:underline">{category.name}</p>
          </div>
        ))}
        <div className="col-span-3 text-center lg:order-last lg:flex lg:items-center">
          <button
            className="bg-black text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 mx-auto lg:mx-0 cursor-pointer"
            onClick={handleShopAllClick}
          >
            Shop all <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}