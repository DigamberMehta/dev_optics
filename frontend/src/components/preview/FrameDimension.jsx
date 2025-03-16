import React from "react";

const FrameDimension = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
      <h2 className="text-lg font-semibold mb-4">Frame Dimensions</h2>
      <div className="grid grid-cols-4 gap-6 text-center">
        {/* Lens Width */}
        <div>
          <div className="w-16 h-12 mx-auto mb-2">
            <img src="https://d3995ea24pmi7m.cloudfront.net/media/theme/product-details/compatibility/eye.svg" alt="" />
          </div>
          <p className="text-sm">
            {product ? (product.frame ? (product.frame.lens_width ? `${product.frame.lens_width} mm` : 'N/A') : 'N/A') : 'N/A'}
          </p>
          <p className="text-gray-500">Lens Width</p>
        </div>
        {/* Bridge Width */}
        <div>
          <div className="w-16 h-12 mx-auto mb-2">
            <img src="https://d3995ea24pmi7m.cloudfront.net/media/theme/product-details/compatibility/bridge.svg" alt="" />
          </div>
          <p className="text-sm">
            {product ? (product.frame ? (product.frame.bridge_width ? `${product.frame.bridge_width} mm` : 'N/A') : 'N/A') : 'N/A'}
          </p>
          <p className="text-gray-500">Bridge Width</p>
        </div>
        {/* Temple Length */}
        <div>
          <div className="w-16 h-12 mx-auto mb-2">
            <img src="https://d3995ea24pmi7m.cloudfront.net/media/theme/product-details/compatibility/temple.svg" alt="" />
          </div>
          <p className="text-sm">
            {product ? (product.frame ? (product.frame.temple_length ? `${product.frame.temple_length} mm` : 'N/A') : 'N/A') : 'N/A'}
          </p>
          <p className="text-gray-500">Temple Length</p>
        </div>
        {/* Lens Height */}
        <div>
          <div className="w-16 h-12 mx-auto mb-2">
            <img src="https://d3995ea24pmi7m.cloudfront.net/media/theme/product-details/compatibility/lens.svg" alt="" />
          </div>
          <p className="text-sm">{product ? (product.frame ? (product.frame.lens_height ? `${product.frame.lens_height} mm` : 'N/A') : 'N/A') : 'N/A'}</p> {/* Lens height is not directly in the provided data */}
          <p className="text-gray-500">Lens Height</p>
        </div>
      </div>
    </div>
  );
};

export default FrameDimension;