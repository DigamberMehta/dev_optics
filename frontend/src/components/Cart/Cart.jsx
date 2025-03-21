import React, { useState, useEffect, useContext } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AuthContext from "@/context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Cart() {
  const [cartItems, setCartItems] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!user || !user.user_id) {
          setError("User not authenticated.");
          setLoading(false);
          return;
        }
        const response = await axios.get(`http://localhost:3000/api/cart/get-cart-items?userId=${user.user_id}`);
        setCartItems(response.data.items);
        setTotalItems(response.data.totalItems);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        setError(err.message || "Failed to fetch cart items.");
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [user]);

  const calculateTotalPrice = () => {
    if (!cartItems) return 0;
    return cartItems.reduce((sum, item) => sum + Number(item.total_price), 0);
  };

  const calculateTotalDiscount = () => {
    return 0;
  };

  const calculateTotalPayable = () => {
    const totalPrice = calculateTotalPrice();
    const totalDiscount = calculateTotalDiscount();
    return totalPrice - totalDiscount;
  };

  const formatCustomizations = (customizations) => {
    if (!customizations || Object.keys(customizations).length === 0) {
      return "";
    }

    const friendlyNames = {
      power: "Power",
      material: "Material",
      is_tinted: "Tinted",
      lens_type: "Lens Type",
      tint_color: "Tint Color",
      is_polarized: "Polarized",
      has_uv_protection: "UV Protection",
      has_blue_light_filter: "Blue Light Filter",
      has_anti_reflective_coating: "Anti-Reflective Coating",
    };

    return Object.entries(customizations)
      .filter(([key, value]) => value !== null && value !== false)
      .map(([key, value]) => {
        const friendlyKey = friendlyNames[key] || key;
        if (typeof value === 'boolean') {
          return friendlyKey; // Just show the key if the value is true
        }
        return `${friendlyKey}: ${value}`;
      })
      .join(" , ");
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (loading) {
    return <div>Loading cart items...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (cartItems && cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FBF9F7] p-16 pt-[120px] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold pb-6">Your cart is empty</h1>
        <Button onClick={handleContinueShopping}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F7] p-16 pt-[120px]">
      <header className="flex items-center justify-between pb-6">
        <h1 className="text-2xl font-semibold">Cart ({totalItems} items)</h1>
      </header>
      <div className="flex gap-10">
        {/* Cart Section */}
        <div className="w-3/5 space-y-6">
          {cartItems && cartItems.map((item) => (
            <div key={item.cart_item_id} className="p-4 flex border-0 shadow-md bg-white rounded-2xl items-start gap-4">
              { /* Image Container */}
              <div className="w-[120px] h-[120px] flex-shrink-0">
                <img
                  src={item.product?.images?.length > 0 ? item.product.images[0] : "https://via.placeholder.com/150"}
                  alt={item.product?.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Content Container */}
              <div className="flex flex-col justify-between w-[calc(100%-120px)]">
                <div>
                  <h2 className="text-md font-semibold break-words">
                    {item.product?.name}
                    {item.customizations && Object.keys(item.customizations).length > 0 && (
                      <>
                        {" "}
                        (<span className="text-black text-md font-normal">{formatCustomizations(item.customizations)}</span>)
                      </>
                    )}
                  </h2>
                  <p className="text-gray-500 text-sm ">Quantity : {item.quantity}</p>
                  <p className="text-sm text-gray-500">Final Price</p>
                  <p className="text-sm">₹{Number(item.total_price).toFixed(2)}</p>
                </div>
                <div className="flex gap-4 text-sm text-[#4a4a4a]">
                  <button>Remove</button>
                  <button>Repeat</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Bill Details */}
        <div className="w-2/5 space-y-6">
          <Card className="p-6 border-0 shadow-md">
            <div className="flex justify-between text-md">
              <span>Total item price</span>
              <span>₹{calculateTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-md text-green-500">
              <span>Total discount</span>
              <span>-₹{calculateTotalDiscount().toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-sm">
              <span>Total payable</span>
              <span>₹{calculateTotalPayable().toFixed(2)}</span>
            </div>
          </Card>
          <Card className="p-4 flex justify-between items-center border-0 shadow-md">
            <div>
              <p className="text-sm">WELCOME applied</p>
              <p className="text-sm text-gray-500">You are saving ₹320</p>
            </div>
            <button className="text-blue-600 text-sm">REMOVE</button>
          </Card>
          <Card className="p-4 flex justify-between items-center border-0 shadow-md">
            <div>
              <p className="text-sm">Apply Insurance</p>
              <p className="text-sm text-gray-500">Tap to view your benefits</p>
            </div>
            <button className="text-xl">→</button>
          </Card>
          <Button
            className="w-full bg-green-500 text-white py-3 rounded-lg text-lg"
            onClick={handleProceedToCheckout} // Added onClick handler
          >
            Proceed To Checkout →
          </Button>
        </div>
      </div>
    </div>
  );
}