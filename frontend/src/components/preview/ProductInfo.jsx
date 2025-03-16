import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductInfo = ({ product }) => {
  const [isOpen, setIsOpen] = useState(true);

  // Dynamically create product details based on the 'product' prop
  const productDetails = product ? [
    { label: 'SKU', value: product.product_id || 'N/A' },
    { label: 'Product Type', value: product.product_type ? product.product_type.toUpperCase() : 'N/A' },
    { label: 'Gender', value: product.gender || 'N/A' },
    { label: 'Size', value: 'N/A' }, // Size information might not be directly available
    { label: 'Lens Color', value: product.lens ? product.lens.color || 'N/A' : 'N/A' },
    { label: 'Frame Shape', value: product.frame ? product.frame.style || 'N/A' : 'N/A' },
    { label: 'Frame Material', value: product.frame ? product.frame.material || 'N/A' : 'N/A' },
    { label: 'Lens Type', value: product.lens ? (product.lens.is_prescription ? 'Prescription' : product.lens.lens_type || 'Plano') : 'N/A' },
    { label: 'Rim Details', value: product.frame ? (product.frame.rim_details ? product.frame.rim_details : 'N/A') : 'N/A' }, // Example: 'glasses' -> 'Glasses'
    { label: 'Warranty', value: 'N/A' }, // Warranty information might need a specific field
    { label: 'Country of Origin', value: 'N/A' }, // Country of origin might need a specific field
    { label: 'Price', value: product.price ? `₹${product.price}` : 'N/A' },
    { label: 'Lens Width', value: product.frame && product.frame.lens_width ? `${product.frame.lens_width} mm` : 'N/A' },
    { label: 'Bridge Width', value: product.frame && product.frame.bridge_width ? `${product.frame.bridge_width} mm` : 'N/A' },
    { label: 'Temple Length', value: product.frame && product.frame.temple_length ? `${product.frame.temple_length} mm` : 'N/A' },
    { label: 'Lens Material', value: product.lens ? product.lens.material || 'N/A' : 'N/A' },
    { label: 'Power', value: product.lens ? product.lens.power || 'N/A' : 'N/A' },
    { label: 'Prescription', value: product.lens ? (product.lens.is_prescription ? 'Yes' : 'No') : 'N/A' },
    { label: 'Polarized', value: product.lens && product.lens.is_polarized ? 'Yes' : 'No' },
    { label: 'Blue Light Filter', value: product.lens && product.lens.has_blue_light_filter ? 'Yes' : 'No' },
    { label: 'Photochromic', value: product.lens && product.lens.is_photochromic ? 'Yes' : 'No' },
  ] : [];

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