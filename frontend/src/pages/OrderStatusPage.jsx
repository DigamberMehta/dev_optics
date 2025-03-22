// frontend/src/pages/OrderStatusPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderStatusPage = () => {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState("Verifying payment...");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cfOrderId = searchParams.get("cf_order_id");
    const token = searchParams.get("token");

    const verifyPayment = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/orders/verify-cashfree-payment",
          { orderId: orderId, cfOrderId: cfOrderId, token: token }
        );
        if (response.data.paymentStatus === "SUCCESS") {
          setPaymentStatus("Payment Successful!");
          // Optionally, redirect the user to an order confirmation page
          navigate(`/order-confirmation/${orderId}`);
        } else {
          setPaymentStatus("Payment Failed.");
          setError(response.data.message || "Something went wrong during payment verification.");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setPaymentStatus("Payment Verification Error.");
        setError(error.message || "Failed to connect to the server.");
      }
    };

    if (cfOrderId && orderId) {
      verifyPayment();
    } else {
      setPaymentStatus("Invalid Order Information.");
      setError("Missing order ID or Cashfree order ID.");
    }
  }, [orderId, searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold text-gray-800">Order Status</h1>
          <div className="mt-6">
            <p>{paymentStatus}</p>
            {error && <p className="text-red-500">{error}</p>}
            {paymentStatus === "Payment Successful!" && (
              <p className="mt-4">Your order ID is: {orderId}</p>
            )}
            {/* Add a link to the order details page if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPage;