import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const WishlistPage = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const backendURL = 'http://localhost:3000'; // Your backend URL

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!user?.user_id) {
          console.log("User not logged in or user ID not available.");
          setLoading(false);
          return;
        }

        const userId = user.user_id;
        const response = await fetch(`${backendURL}/api/wishlist?userId=${userId}`); // Updated URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWishlistItems(data);
      } catch (err) {
        setError(err.message || "Failed to fetch wishlist.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user?.user_id, backendURL]); // Added backendURL to dependency array

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await fetch(`${backendURL}/api/wishlist/remove/${productId}`, { // Updated URL
        method: 'DELETE',
      });
      if (response.ok) {
        setWishlistItems(prevItems => prevItems.filter(item => item.product_id !== productId));
      } else {
        const errorData = await response.json();
        console.error('Error removing from wishlist:', errorData.message || 'Something went wrong');
        // Handle error (e.g., show a notification)
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      // Handle network error
    }
  };

  if (loading) {
    return <div>Loading your wishlist...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pt-[120px] container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Your Wishlist</h2>
      <Card className="border-0 shadow-none">
        <CardContent className="grid md:grid-cols-3 grid-cols-2 lg:grid-cols-4 gap-4">
          {wishlistItems.length > 0 ? (
            wishlistItems.map(product => (
              <Card
                key={product.product_id}
                className="rounded-xl shadow-md bg-white border"
              >
                <img
                  src={product.images && product.images.length > 0 ? product.images[0] : 'placeholder-image-url'}
                  alt={product.name}
                  className="w-full h-48 object-contain rounded-t-xl"
                />
                <CardContent className="p-4">
                  <p className="text-sm text-gray-900 font-medium">{product.name}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{product.price ? `₹${product.price}` : ''}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 flex justify-end">
                  <Button
                    onClick={() => handleRemoveFromWishlist(product.product_id)}
                    variant="outline"
                    className="text-red-500 hover:bg-red-100"
                  >
                    <Heart className="mr-2 h-4 w-4" /> Remove
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">Your wishlist is empty.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WishlistPage;