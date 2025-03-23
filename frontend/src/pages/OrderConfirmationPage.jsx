import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import AuthContext from "@/context/AuthContext";

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/orders/get-order-details/${orderId}?userId=${user?.user_id}`
        );
        setOrderData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError(err.message || "Failed to fetch order details.");
        setLoading(false);
      }
    };

    if (orderId && user?.user_id) {
      fetchOrderDetails();
    } else if (!user?.user_id) {
      setError("User not authenticated.");
      setLoading(false);
    } else {
      setError("Order ID not found.");
      setLoading(false);
    }
  }, [orderId, user?.user_id]);

  if (loading) {
    return <div className="text-center py-10">Loading order details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  if (!orderData) {
    return <div className="text-center py-10">Order confirmation failed.</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 mt-[100px]">
      <Card className="w-full mx-auto shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-green-500 text-center">
            Order Confirmed!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-700">
            Thank you for your order. Your order has been successfully placed and is being processed.
          </p>
          <p className="text-lg font-semibold text-center">
            Order ID: <span className="text-blue-500">{orderData.order_id}</span>
          </p>

          {orderData.orderItems && orderData.orderItems.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Order Items:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {orderData.orderItems.map((item) => (
                  <div key={item.order_item_id} className="border rounded-lg p-4 shadow-sm flex flex-col">
                    {item.product?.images?.length > 0 && (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-32 object-contain rounded"
                      />
                    )}
                    <h4 className="font-semibold mt-2">{item.product_name_at_purchase}</h4>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">
                          Price: ₹{parseFloat(item.total_price).toFixed(2)}
                        </p>


                    {item.customizations && Object.keys(item.customizations).length > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-semibold">Customizations:</span>{" "}
                        {Object.entries(item.customizations)
                          .map(([key, value]) => `${key}: ${String(value)}`)
                          .join(", ")}
                      </p>
                    )}

                    {item.product?.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {item.product.description.substring(0, 80)}...
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-sm text-gray-600 text-center">
            You will receive a confirmation email with further details shortly.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
            {/* Optionally, add an order history page link */}
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
