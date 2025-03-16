import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FrameShapeShop({ products }) {
  const navigate = useNavigate();
  const frameShapes = [
    { name: "Rectangle", img: "https://static.zennioptical.com/marketing/homepage/componentsRedesign/0820/frame_shape-Rectangle.svg" },
    { name: "Square", img: "https://static.zennioptical.com/marketing/homepage/componentsRedesign/0820/frame_shape-Square.svg" },
    { name: "Round", img: "https://static.zennioptical.com/marketing/homepage/componentsRedesign/0820/frame_shape-Round.svg" },
    { name: "Cat-Eye", img: "https://static.zennioptical.com/marketing/homepage/componentsRedesign/0820/frame_shape-Cat-eye.svg" },
    { name: "Aviator", img: "https://static.zennioptical.com/marketing/homepage/componentsRedesign/0820/frame_shape-Aviator.svg" },
    { name: "Browline", img: "https://static.zennioptical.com/marketing/homepage/componentsRedesign/0820/frame_shape-Browline.svg" },
  ];

  const handleShapeClick = (shapeName) => {
    navigate(`/frame-shape/${shapeName.toLowerCase()}`, { state: { products } });
  };

  const handleShopAllClick = () => {
    navigate('/frame-shape/all', { state: { products } });
  };

  return (
    <div className="text-center py-10 bg-white mt-12 frame">
      <h2 className="text-4xl font-bold mb-2">Shop By Frame Shape</h2>
      <p className="text-gray-600 mb-6">
        Choose your perfect frames from our stylish colors and patterns.
      </p>

      <div className="grid grid-cols-3 gap-4 lg:flex lg:justify-between mb-6">
        {frameShapes.map((shape) => (
          <div
            key={shape.name}
            className="flex flex-col items-center hover:underline px-4 lg:px-6 border border-transparent hover:border-black rounded-lg p-3 transition-all duration-200 cursor-pointer"
            onClick={() => handleShapeClick(shape.name)}
          >
            <img src={shape.img} alt={shape.name} className="w-24 h-24" />
            <p className="text-sm font-medium">{shape.name}</p>
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