// frontend/src/pages/OrderConfirmationPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real application, you would likely fetch the complete order details
    // from your backend using the orderId.
    // For this basic example, we'll just simulate a successful confirmation.
    if (orderId) {
      setLoading(false);
      setOrderData({ order_id: orderId }); // Just setting the order ID for now
    } else {
      setError("Order ID not found.");
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return <div>Loading order details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!orderData) {
    return <div>Order confirmation failed.</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-green-500">
            Order Confirmed!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Thank you for your order. Your order has been successfully placed and is being processed.
          </p>
          <p className="text-lg font-semibold">
            Order ID: <span className="text-blue-500">{orderData.order_id}</span>
          </p>
          {/* In a real application, you would display more order details here,
             like shipping address, items ordered, total amount, etc. */}
          <p className="text-sm text-gray-600">
            You will receive a confirmation email with further details shortly.
          </p>
          <div className="flex justify-end">
            <Link to="/" className="mr-2">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
            {/* You might want to link to an order history page */}
            {/* <Link to="/order-history">
              <Button>View Order History</Button>
            </Link> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderConfirmationPage;