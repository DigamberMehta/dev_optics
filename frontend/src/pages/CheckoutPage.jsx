// frontend/src/pages/CheckoutPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AuthContext from "@/context/authContext";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom"; // Import useSearchParams

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState();
  const [buyNowProduct, setBuyNowProduct] = useState(null); // State for individual buy now product
  const [userAddress, setUserAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Get query parameters

  useEffect(() => {
    const fetchCheckoutData = async () => {
      setLoading(true);
      setError(null);
      const productId = searchParams.get("productId"); // Get productId from URL

      try {
        if (!user || !user.user_id) {
          setError("User not authenticated.");
          setLoading(false);
          return;
        }

        if (productId) {
          // Fetch details for the single "Buy Now" product
          const productResponse = await axios.get(
            `http://localhost:3000/api/products/get-single-product/${productId}` // Assuming this backend route exists
          );
          setBuyNowProduct([productResponse.data]); // Set as an array to match cartItems structure for rendering
          setCartItems(); // Clear cart items
        } else {
          // Fetch cart items ready for checkout
          const cartResponse = await axios.get(
            `http://localhost:3000/api/cart/get-checkout-items?userId=${user.user_id}`
          );
          setCartItems(cartResponse.data.items);
          setBuyNowProduct(null); // Clear buy now product
        }

        // Fetch user address
        const addressResponse = await axios.get(
          `http://localhost:3000/api/user/profile/${user.user_id}`
        );
        setUserAddress(addressResponse.data.address);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching checkout data:", err);
        setError(err.message || "Failed to fetch checkout information.");
        setLoading(false);
      }
    };

    fetchCheckoutData();
  }, [user, searchParams]);

  const calculateTotalPrice = () => {
    if (buyNowProduct && buyNowProduct.length > 0) {
      return Number(buyNowProduct[0].price);
    }
    if (!cartItems) return 0;
    return cartItems.reduce((sum, item) => sum + Number(item.total_price), 0);
  };

  if (loading) {
    return <div>Loading checkout information...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF9F7] p-16 pt-[120px]">
      <header className="flex items-center justify-between pb-6">
        <h1 className="text-2xl font-semibold">Checkout</h1>
      </header>
      <div className="flex gap-10">
        {/* Items to Checkout */}
        <div className="w-3/5 space-y-6">
          <Card className="p-6 border-0 shadow-md">
            <CardHeader>
              <CardTitle>Items to Checkout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {buyNowProduct && buyNowProduct.length > 0 ? (
                buyNowProduct.map((item) => (
                  <div key={item.product_id} className="flex items-center gap-4">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={item.images?.length > 0 ? item.images[0] : "https://via.placeholder.com/80"}
                        alt={item.name}
                        className="w-full h-full object-contain rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-md font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">Quantity: 1</p> {/* Assuming Buy Now is for single quantity */}
                      <p className="text-sm">₹{Number(item.price).toFixed(2)}</p>
                      {item.customizations && Object.keys(item.customizations).length > 0 && (
                        <p className="text-xs text-gray-600">
                          Customizations:{" "}
                          {Object.entries(item.customizations)
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : cartItems && cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.cart_item_id} className="flex items-center gap-4">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={item.product?.images?.length > 0 ? item.product.images[0] : "https://via.placeholder.com/80"}
                        alt={item.product?.name}
                        className="w-full h-full object-contain rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-md font-semibold">{item.product?.name}</h3>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-sm">₹{Number(item.total_price).toFixed(2)}</p>
                      {item.customizations && Object.keys(item.customizations).length > 0 && (
                        <p className="text-xs text-gray-600">
                          Customizations:{" "}
                          {Object.entries(item.customizations)
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No items to checkout.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary and Address */}
        <div className="w-2/5 space-y-6">
          <Card className="p-6 border-0 shadow-md">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-md">
                <span>Total item price</span>
                <span>₹{calculateTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-md text-green-500">
                <span>Total discount</span>
                <span>-₹0.00</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total payable</span>
                <span>₹{calculateTotalPrice().toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 border-0 shadow-md">
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              {userAddress ? (
                <div className="space-y-2">
                  <p className="font-semibold">{userAddress.full_name}</p>
                  <p>{userAddress.street_address}</p>
                  <p>
                    {userAddress.city}, {userAddress.state} {userAddress.postal_code}
                  </p>
                  <p>{userAddress.country}</p>
                  <p>Phone: {userAddress.phone_number}</p>
                </div>
              ) : (
                <p className="text-gray-500">No address found. Please add an address in your profile.</p>
              )}
            </CardContent>
          </Card>

          <Button className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg">
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;