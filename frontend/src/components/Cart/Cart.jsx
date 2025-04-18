import React, { useState, useEffect, useContext } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AuthContext from "@/context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
        const response = await axios.get(
          `${backendUrl}/api/cart/get-cart-items?userId=${user.user_id}`
        );
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
  }, [user, backendUrl]);

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
        if (typeof value === "boolean") {
          return friendlyKey;
        }
        return `${friendlyKey}: ${value}`;
      })
      .join(" , ");
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading cart items...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
  }

  if (cartItems && cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FBF9F7] p-4 md:p-8 lg:p-16 pt-[120px] flex flex-col items-center justify-center">
        <h1 className="text-xl md:text-2xl font-semibold pb-6">Your cart is empty</h1>
        <Button onClick={handleContinueShopping}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F7] p-3 md:p-8 lg:p-16 !pt-[80px]">
      <header className="flex items-center justify-between pb-6">
        <h1 className="text-xl md:text-2xl font-semibold">Cart ({totalItems} items)</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        {/* Cart Section */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {cartItems &&
            cartItems.map((item) => (
              <Card
              key={item.cart_item_id}
              className="p-4 flex flex-row border-0 shadow-md rounded-2xl gap-4"
            >
              {/* Image Container */}
              <div className="w-[120px] h-[120px] flex-shrink-0">
                <img
                  src={
                    item.product?.images?.length > 0
                      ? item.product.images[0]
                      : "https://via.placeholder.com/150"
                  }
                  alt={item.product?.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Content Container */}
              <div className="flex flex-col justify-between w-full">
                <div className="space-y-2">
                  <h2 className="text-base md:text-md font-semibold break-words">
                    {item.product?.name}
                    {item.customizations && Object.keys(item.customizations).length > 0 && (
                      <span className="block text-sm text-muted-foreground font-normal">
                        ({formatCustomizations(item.customizations)})
                      </span>
                    )}
                  </h2>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm">
                    <p className="text-muted-foreground">Quantity: {item.quantity}</p>
                    <p className="text-muted-foreground">Price: ₹{Number(item.total_price).toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground mt-4">
                  <button className="hover:text-primary">Remove</button>
                  <button className="hover:text-primary">Repeat</button>
                </div>
              </div>
            </Card>
            ))}
        </div>

        {/* Bill Details */}
        <div className="lg:col-span-1 space-y-4 md:space-y-6">
          <Card className="p-4 md:p-6 border-0 shadow-md space-y-4">
            <div className="flex justify-between text-sm md:text-base">
              <span>Total item price</span>
              <span>₹{calculateTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm md:text-base text-green-500">
              <span>Total discount</span>
              <span>-₹{calculateTotalDiscount().toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-base md:text-lg font-semibold">
              <span>Total payable</span>
              <span>₹{calculateTotalPayable().toFixed(2)}</span>
            </div>
          </Card>

          <Card className="p-4 flex justify-between items-center border-0 shadow-md">
            <div>
              <p className="text-sm">WELCOME applied</p>
              <p className="text-xs text-muted-foreground">You are saving ₹320</p>
            </div>
            <button className="text-primary text-sm">REMOVE</button>
          </Card>

          <Card className="p-4 flex justify-between items-center border-0 shadow-md">
            <div>
              <p className="text-sm">Apply Insurance</p>
              <p className="text-xs text-muted-foreground">Tap to view your benefits</p>
            </div>
            <button className="text-primary text-xl">→</button>
          </Card>

          <Button
            className="w-full text-sm md:text-base py-4 md:py-6 "
            onClick={handleProceedToCheckout}
          >
            Proceed To Checkout →
          </Button>
        </div>
      </div>
    </div>
  );
}