import React, { useState, useEffect } from "react";
import { Heart, Share2 } from "lucide-react";

const ImageContainer = ({ product }) => {
  const [images, setImages] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setImages(product.images);
      setSelectedImage(product.images[0]);
    } else {
      setImages();
      setSelectedImage(null);
    }
  }, [product]);

  if (!product || !product.images || product.images.length === 0) {
    return (
      <div className="flex flex-col p-6 items-center bg-white rounded-2xl shadow-md h-fit relative">
        <div>No images available</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 items-center bg-white rounded-2xl shadow-md h-fit relative">
      {/* Main Image */}
      <div className="">
        {selectedImage ? (
          <img src={selectedImage} alt={product ? product.name : "Product"} className="w-96 h-64 object-contain" />
        ) : (
          <div>No main image selected</div>
        )}
        {product && (
          <div className="absolute top-2 right-2 flex flex-col space-y-2">
            <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      {images && images.length > 0 && (
        <div className="flex items-center space-x-2 mt-4">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => {
              const currentIndex = images.indexOf(selectedImage);
              if (currentIndex > 0) {
                setSelectedImage(images[currentIndex - 1]);
              }
            }}
            disabled={!selectedImage || images.indexOf(selectedImage) === 0}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className={`w-16 h-16 p-1 border rounded cursor-pointer object-contain ${
                selectedImage === img ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => {
              const currentIndex = images.indexOf(selectedImage);
              if (currentIndex < images.length - 1) {
                setSelectedImage(images[currentIndex + 1]);
              }
            }}
            disabled={!selectedImage || images.indexOf(selectedImage) === images.length - 1}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageContainer;