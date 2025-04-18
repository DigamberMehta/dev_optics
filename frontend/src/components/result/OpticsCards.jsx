import React, { useState, useEffect, useContext } from "react";
import { Star, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";

export default function OpticsCards({ products }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleProductClick = (product) => {
    navigate(`/product/${product.product_id}/${product.slug}`);
  };

  const handleAddToWishlist = async (event, product) => {
    event.stopPropagation();

    if (!user?.user_id) {
      navigate('/login');
      return;
    }

    const productId = product.product_id;
    const userId = user.user_id;

    try {
      const response = await fetch(`${backendURL}/api/wishlist/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, userId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        const errorData = await response.json();
        console.error('Error adding to wishlist:', errorData.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  return (
    <div className="grid md:grid-cols-3 grid-cols-2 lg:grid-cols-4 gap-6">
      {products && products.map((product) => (
        <Card
          key={product.product_id}
          className="flex flex-col overflow-hidden cursor-pointer group"
          onClick={() => handleProductClick(product)}
        >
          <CardHeader className="p-0 relative">
            <button
              onClick={(event) => handleAddToWishlist(event, product)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md z-10"
              aria-label="Add to wishlist"
            >
              <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors duration-200" />
            </button>

            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.new_arrivals && <Badge variant="destructive">New</Badge>}
              {product.frequently_bought && <Badge variant="secondary">Popular</Badge>}
            </div>
          </CardHeader>

          <CardContent className="p-4 flex-grow">
            <CardTitle className="text-base font-semibold mb-1 truncate">{product.name}</CardTitle>
            <CardDescription className="text-sm text-gray-600 mb-2 line-clamp-2">
              {product.description || "No description available."}
            </CardDescription>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold text-primary">{product.price ? `₹${parseFloat(product.price).toFixed(2)}` : 'N/A'}</span>
              {product.oldPrice && <span className="text-sm text-gray-400 line-through">₹{product.oldPrice}</span>}
              {product.discount && <Badge className="bg-green-100 text-green-600 text-xs">{product.discount}</Badge>}
            </div>

            {product.rating && product.reviews && (
              <div className="flex items-center text-gray-600 text-sm">
                <span className="text-gray-900">{product.rating}</span>
                <Star className="text-yellow-500 w-4 h-4 mx-1" />
                <span>({product.reviews})</span>
              </div>
            )}

            <div className="flex flex-wrap gap-1 mt-2 text-xs">
              {product.product_type && <Badge variant="outline">{product.product_type.replace(/_/g, ' ')}</Badge>}
              {product.gender && <Badge variant="outline">{product.gender}</Badge>}
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