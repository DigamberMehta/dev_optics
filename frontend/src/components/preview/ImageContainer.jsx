// frontend/src/components/ImageContainer.js
import React, { useState, useEffect, useContext } from "react"; // Import useContext
import { Heart, Share2 } from "lucide-react";
import CustomizationSidebar from "../cart/CustomizationSidebar";
import AuthContext from "../../context/authContext"; // Import AuthContext
import { toast } from "sonner"; // Import Sonner
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ImageContainer = ({ product }) => {
  const [images, setImages] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const navigate = useNavigate(); // Get the navigate function

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
      // Logic to add a complete product directly to the cart
      console.log("Adding complete product to cart:", product);
      // You would likely call an API here
      addToCart(product.product_id);
    }
  };

  const handleAddToCartWithCustomization = async (customLensOptions) => {
    if (!user || !user.user_id) {
      console.error("User not authenticated.");
      toast.error("Please log in to add to cart.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/cart/add-custom-frame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.product_id,
          lensOptions: customLensOptions,
          userId: user.user_id, // User ID is being passed here
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Custom product add to cart request received (Frontend):", data);
        toast.success("Custom product added to cart!");
        setIsSidebarOpen(false);
        // Optionally, show a success message or update cart state
      } else {
        console.error("Error adding custom product to cart:", data);
        toast.error(data?.message || "Failed to add custom product to cart.");
        // Optionally, show an error message
      }
    } catch (error) {
      console.error("Error adding custom product to cart:", error);
      toast.error("Failed to add custom product to cart. Please try again.");
      // Optionally, show an error message
    }
  };

  const addToCart = async (productId) => {
    if (!user || !user.user_id) {
      console.error("User not authenticated.");
      toast.error("Please log in to add to cart.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, userId: user.user_id }), // Pass userId here
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Product add to cart request received (Frontend):", data);
        toast.success("Product added to cart!");
        // Optionally, show a success message or update cart state
      } else {
        console.error("Error adding product to cart:", data);
        toast.error(data?.message || "Failed to add product to cart.");
        // Optionally, show an error message
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart. Please try again.");
      // Optionally, show an error message
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleBuyNowClick = () => {
    navigate(`/checkout?productId=${product.product_id}`); // Pass productId as a query parameter
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
        {/* Main Image */}
        <div className="w-full flex justify-center items-center">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt={product ? product.name : "Product"}
              className="w-96 h-64 object-cover object-center"
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

        {/* Thumbnail Images */}
        {images && images.length > 0 && (
          <div className="flex items-center px-4 mt-4 w-full justify-between">
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
        {/* Buy Now - Filled Button */}
        <button
          className="px-16 py-4 text-white bg-[#00BFCB] hover:bg-[#00A7B2] rounded-xl shadow-md transition duration-300"
          onClick={handleBuyNowClick} // Added onClick handler
        >
          Buy Now
        </button>

        {/* Add to Cart - Outlined Button */}
        <button
          className="px-16 py-4  text-[#00BFCB] border border-[#00BFCB] rounded-xl shadow-md"
          onClick={handleAddToCartClick}
        >
          Add to Cart
        </button>
      </div>

      {/* Customization Sidebar */}
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