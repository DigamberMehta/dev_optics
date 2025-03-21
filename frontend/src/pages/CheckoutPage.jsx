// frontend/src/pages/CheckoutPage.jsx
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/authContext";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import ShippingAndPayment from "@/components/checkout/ShippingAndPayment";
import CheckoutItems from "@/components/checkout/CheckoutItems";
import OrderSummary from "@/components/checkout/OrderSummary";
 

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState();
  const [buyNowProduct, setBuyNowProduct] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      setLoading(true);
      setError(null);
      const productId = searchParams.get("productId");

      try {
        if (!user || !user.user_id) {
          setError("User not authenticated.");
          setLoading(false);
          return;
        }

        if (productId) {
          const productResponse = await axios.get(
            `http://localhost:3000/api/products/get-single-product/${productId}`
          );
          setBuyNowProduct([productResponse.data]);
          setCartItems();
        } else {
          const cartResponse = await axios.get(
            `http://localhost:3000/api/cart/get-checkout-items?userId=${user.user_id}`
          );
          setCartItems(cartResponse.data.items);
          setBuyNowProduct(null);
        }

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

  const handleProceedToPayment = () => {
    setIsPaymentModalOpen(true);
  };

  const handleCashOnDelivery = async () => {
    setIsPaymentModalOpen(false);
    setLoading(true);
    setError(null);

    try {
      let response;
      const shippingAddress = userAddress;

      if (buyNowProduct && buyNowProduct.length > 0) {
        const product = buyNowProduct[0];
        const orderData = {
          userId: user.user_id,
          productId: product.product_id,
          quantity: 1,
          customizations: product.customizations || {},
          shippingAddress: shippingAddress,
        };
        response = await axios.post("http://localhost:3000/api/orders/create-buy-now", orderData);
      } else if (cartItems && cartItems.length > 0) {
        const orderItems = cartItems.map((item) => ({
          product_id: item.product.product_id,
          quantity: item.quantity,
          customizations: item.customizations || {},
        }));

        const orderData = {
          userId: user.user_id,
          orderItems: orderItems,
          paymentMethod: "Cash on Delivery",
          totalAmount: calculateTotalPrice(),
          shippingAddress: shippingAddress,
        };
        response = await axios.post("http://localhost:3000/api/orders/create", orderData);
        if (response.status === 201) {
          await axios.delete(`http://localhost:3000/api/cart?userId=${user.user_id}`);
        }
      } else {
        setError("No items to checkout.");
        setLoading(false);
        return;
      }

      if (response && response.status === 201) {
        navigate("/order-confirmation", { state: { orderId: response.data.orderId } });
      } else {
        setError("Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setError(error.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
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
        <div className="w-3/5 space-y-6">
          <CheckoutItems buyNowProduct={buyNowProduct} cartItems={cartItems} />
        </div>
        <div className="w-2/5 space-y-6">
          <OrderSummary calculateTotalPrice={calculateTotalPrice} />
          <ShippingAndPayment
            userAddress={userAddress}
            handleProceedToPayment={handleProceedToPayment}
            isPaymentModalOpen={isPaymentModalOpen}
            setIsPaymentModalOpen={setIsPaymentModalOpen}
            handleCashOnDelivery={handleCashOnDelivery}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;