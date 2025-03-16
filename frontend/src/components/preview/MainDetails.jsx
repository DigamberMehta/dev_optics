import React from "react";

const Maindetails = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full main-details">
      {product && product.name && (
        <>
          {/* Assuming a brand property exists or can be derived */}
          {product.product_type && (
            <p className="text-[#35bbd1] text-[14px] ">{product.product_type.toUpperCase()}</p>
          )}
          <p className="text-[19px] font-[700] mt-1 text-[#212529]">{product.name}</p>
          {product.price && (
            <p className="text-[19px] font-[700]  mt-2 text-[#212529]">MRP ₹{product.price}</p>
          )}
          {product.price && (
            <p className="text-[#8b8fa9] font-[500] text-[14px] mt-1">Inclusive of all taxes</p>
          )}

          {/* Display Color Name and Thumbnail Image */}
          {product && product.images && product.images.length > 0 && (
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

                {product.frame && product.frame.color && (
                  <span className="text-gray-700 text-sm ml-2">{product.frame.color}</span>
                )}

              </div>
            </div>
          )}

          {/* Conditionally render other color information if available */}
          {/* {product.colors && product.colors.length > 0 && (
            <div className="mt-4">
              <p className="">Available Colors</p>
              <div className="flex gap-2 mt-2">
                {product.colors.map((color, index) => (
                  <span
                    key={index}
                    className={`w-8 h-8 rounded-full border-2 ${color === 'yellow' ? 'border-black' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                    title={color}
                  ></span>
                ))}
              </div>
            </div>
          )} */}
        </>
      )}
      {!product || !product.name ? (
        <p>Product details not available.</p>
      ) : null}
    </div>
  );
};

export default Maindetails;