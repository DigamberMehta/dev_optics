// frontend/src/components/ImageContainer.js
import React, { useState, useEffect, useContext } from "react";
import { Heart, Share2 } from "lucide-react";
import CustomizationSidebar from "../cart/CustomizationSidebar";
import AuthContext from "../../context/authContext";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

const ImageContainer = ({ product }) => {
  const [images, setImages] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setImages(product.images);
      setSelectedImage(product.images[0]);
    } else {
      setImages();
      setSelectedImage(null);
    }
  }, [product]);

  const handleAddToCartClick = () => {
    if (product && product.product_type === "frame" && product.lens_id === null) {
      setIsSidebarOpen(true);
    } else {
      addToCart(product.product_id);
    }
  };

  const handleAddToCartWithCustomization = async (customLensOptions) => {
    if (!user || !user.user_id) {
      toast.error("Please log in to add to cart.");
      return;
    }

    try {
      const response = await fetch(`${backendURL}/api/cart/add-custom-frame`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.product_id,
          lensOptions: customLensOptions,
          userId: user.user_id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Custom product added to cart!");
        setIsSidebarOpen(false);
      } else {
        toast.error(data?.message || "Failed to add custom product to cart.");
      }
    } catch (error) {
      console.error("Error adding custom product to cart:", error);
      toast.error("Failed to add custom product to cart. Please try again.");
    }
  };

  const addToCart = async (productId) => {
    if (!user || !user.user_id) {
      toast.error("Please log in to add to cart.");
      return;
    }

    try {
      const response = await fetch(`${backendURL}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, userId: user.user_id }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Product added to cart!");
      } else {
        toast.error(data?.message || "Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart. Please try again.");
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleBuyNowClick = () => {
    navigate(`/checkout?productId=${product.product_id}`);
  };

  if (!product || !product.images || product.images.length === 0) {
    return (
      <div className="flex flex-col p-6 items-center bg-white rounded-2xl shadow-md h-fit relative">
        <div>No images available</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col pb-6 items-center bg-white rounded-2xl shadow-md h-fit relative">
        <div className="w-[70%] flex justify-center items-center">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt={product ? product.name : "Product"}
              className="w-96 h-64 object-contain object-center"
            />
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

        {images && images.length > 0 && (
          <div className="flex items-center px-4 mt-4 w-full justify-center space-x-6 overflow-x-auto hide-scrollbar">
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
                className={`w-8 h-8 lg:w-16 lg:h-16 p-1 border  rounded cursor-pointer object-contain ${
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
              disabled={
                !selectedImage ||
                images.indexOf(selectedImage) === images.length - 1
              }
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center justify-around p-4 mt-4 space-x-4">
        <button
          className="px-8 md:px-16 py-4 text-white bg-[#00BFCB] hover:bg-[#00A7B2] rounded-xl shadow-md transition duration-300"
          onClick={handleBuyNowClick}
        >
          Buy Now
        </button>

        <button
          className="px-8 md:px-16 py-4  text-[#00BFCB] border border-[#00BFCB] rounded-xl shadow-md"
          onClick={handleAddToCartClick}
        >
          Add to Cart
        </button>
      </div>

      {isSidebarOpen && (
        <div className="fixed top-0 right-0 h-screen w-80 bg-white shadow-lg p-6 z-50 overflow-y-auto">
          <CustomizationSidebar
            product={product}
            onAddToCart={handleAddToCartWithCustomization}
            onClose={closeSidebar}
          />
        </div>
      )}
    </>
  );
};

export default ImageContainer;