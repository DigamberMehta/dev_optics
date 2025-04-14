import React, { useState, useEffect, useContext } from "react";
import { Star, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";

export default function OpticsCards({ products }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const backendURL = 'http://localhost:3000'; // Your backend URL

  const handleProductClick = (product) => {
    navigate(`/product/${product.product_id}/${product.slug}`);
  };

  const handleAddToWishlist = async (event, product) => {
    event.stopPropagation();

    if (!user?.user_id) {
      console.log("User not logged in.");
      navigate('/login');
      return;
    }

    const productId = product.product_id;
    const userId = user.user_id;

    try {
      const response = await fetch(`${backendURL}/api/wishlist/add`, { // Updated URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, userId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        // You would likely update the UI here to reflect the wishlist status
      } else {
        const errorData = await response.json();
        console.error('Error adding to wishlist:', errorData.message || 'Something went wrong');
        // Handle error (e.g., show a notification)
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      // Handle network error
    }
  };

  return (
    <div className="grid md:grid-cols-3 grid-cols-2 lg:grid-cols-4 gap-4">
      {products && products.map((product) => (
        <Card
          key={product.product_id}
          className="rounded-xl shadow-[0px_4px_10px_rgba(0,0,0,0.10)] bg-white transition-all hover:shadow-lg border-0 cursor-pointer relative"
          onClick={() => handleProductClick(product)}
        >
          <button
            onClick={(event) => handleAddToWishlist(event, product)}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md z-10"
            aria-label="Add to wishlist"
          >
            <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors duration-200" />
          </button>
          <img
            src={product.images && product.images.length > 0 ? product.images[0] : 'placeholder-image-url'}
            alt={product.name}
            className="w-full h-40 object-contain rounded-t-xl"
          />
          <CardContent className="p-4">
            {product.rating && product.reviews && (
              <div className="flex items-center text-gray-600 text-sm">
                <span className="text-gray-900">{product.rating}</span>
                <Star className="text-yellow-500 w-4 h-4 mx-1" />
                <span>({product.reviews})</span>
              </div>
            )}
            <p className="text-xs text-gray-900 mt-2 font-medium">{product.name}</p>
            {product.size && <p className="text-gray-500 text-xs">{product.size}</p>}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">{product.price ? `₹${product.price}` : ''}</span>
              {product.oldPrice && (
                <span className="text-gray-400 text-sm line-through">{`₹${product.oldPrice}`}</span>
              )}
              {product.discount && (
                <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded whitespace-no-wrap">
                  {product.discount}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      {!products || products.length === 0 ? (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">No products found for this selection.</p>
        </div>
      ) : null}
    </div>
  );
}