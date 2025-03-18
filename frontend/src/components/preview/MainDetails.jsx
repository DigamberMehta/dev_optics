import React from "react";

const Maindetails = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full main-details">
      {product && product.name ? (
        <>
          {product.product_type && (
            <p className="text-[#35bbd1] text-[14px] ">
              {product.product_type.toUpperCase()}
            </p>
          )}
          <p className="text-[19px] font-[700] mt-1 text-[#212529]">
            {product.name}
          </p>
          {product.price && (
            <p className="text-[19px] font-[700] mt-2 text-[#212529]">
              MRP ₹{product.price}
            </p>
          )}
          {product.price && (
            <p className="text-[#8b8fa9] font-[500] text-[14px] mt-1">
              Inclusive of all taxes
            </p>
          )}

          {/* Display Color Name and Thumbnail Image */}
          {product.images && product.images.length > 0 && (
            <div className="mt-4">
              <p className="">Color</p>
              <div className="flex flex-col items-start mt-2">
                <div className="mt-1">
                  <img
                    src={product.images[0]}
                    alt={`${product.name} - Color Thumbnail`}
                    className="w-12 h-12 rounded-full object-contain border border-gray-300 mb-2"
                  />
                </div>

                {/* Display all available colors */}
                {product.frame &&
                  product.frame.color &&
                  Array.isArray(product.frame.color) &&
                  product.frame.color.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {product.frame.color.map((color, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <span
                            className="w-6 h-6 rounded-full border border-gray-300"
                            style={{ backgroundColor: color }}
                            title={color}
                          ></span>
                          <span className="text-gray-700 text-sm">{color}</span>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Product details not available.</p>
      )}
    </div>
  );
};

export default Maindetails;
