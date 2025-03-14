import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductInfo = () => {
  const [isOpen, setIsOpen] = useState(true);

  const productDetails = [
    { label: 'SKU', value: 'RxM258GR5V' },
    { label: 'Brand', value: 'Fastrack' },
    { label: 'Gender', value: 'Unisex' },
    { label: 'Size', value: 'Medium' },
    { label: 'Lens Color', value: 'Black' },
    { label: 'Frame Shape', value: 'Aviator' },
    { label: 'Frame Material', value: 'Metal' },
    { label: 'Lens Type', value: '100% UV Protected' },
    { label: 'Rim Details', value: 'Rimmed' },
    { label: 'Warranty', value: '6 months' },
    { label: 'Country of Origin', value: 'China' },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full mt-6">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-semibold">Product Information</h2>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="rounded-lg overflow-hidden mt-3 text-sm">
          {productDetails.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between p-3 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
            >
              <span className="text-gray-600">{item.label}</span>
              <span className="text-gray-800 ">{item.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductInfo;
