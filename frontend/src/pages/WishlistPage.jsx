import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OpticsCards from "../components/result/OpticsCards"; // Adjust the import path as needed

const WishlistPage = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace 'YOUR_USER_ID' with the actual way you get the logged-in user's ID
        const userId = 'YOUR_USER_ID'; // Example: You might get this from context or local storage
        const response = await fetch(`/api/wishlist?userId=${userId}`);
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
  }, []);

  if (loading) {
    return <div>Loading your wishlist...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pt-[120px] container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Your Wishlist</h2>
      {wishlistItems.length > 0 ? (
        <OpticsCards products={wishlistItems} />
      ) : (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default WishlistPage;