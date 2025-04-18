import React, { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/authContext";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUserOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!user || !user.user_id) {
          setError("User not authenticated.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${backendUrl}/api/orders/user-orders?userId=${user.user_id}`);
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [user, backendUrl]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Skeleton className="h-10 w-40" />
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 pt-24">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Your Orders</h1>
      </header>
      <ScrollArea className="max-w-4xl mx-auto">
        <div className="space-y-6">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={order.order_id}>
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Order ID: {order.order_id}</span>
                      <Badge>{order.status}</Badge>
                    </CardTitle>
                    <CardDescription>
                      Ordered on: {order.order_date ? new Date(order.order_date).toLocaleDateString() : "N/A"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">Total: ₹{Number(order.total_amount).toFixed(2)}</p>
                    {order.payment_status && <p>Payment: {order.payment_status} via {order.payment_method}</p>}
                    {order.transaction_id && <p>Transaction ID: {order.transaction_id}</p>}
                    <Separator className="my-4" />
                    <div>
                      <h4 className="text-md font-semibold mb-2">Order Items:</h4>
                      {order.orderItems.length > 0 ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {order.orderItems.map((item) => (
                            <li key={item.order_item_id} className="flex items-start gap-4">
                              {item.product?.images?.length > 0 && (
                                <img
                                  src={item.product.images[0]}
                                  alt={item.product_name_at_purchase}
                                  className="w-16 h-16 rounded-md object-cover"
                                />
                              )}
                              <div>
                                <p className="font-medium">{item.product_name_at_purchase}</p>
                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                <p className="text-sm">₹{Number(item.total_price).toFixed(2)}</p>
                                {item.customizations && Object.keys(item.customizations).length > 0 && (
                                  <p className="text-xs text-gray-600">
                                    Customizations: {Object.entries(item.customizations)
                                      .filter(([_, value]) => value !== null && value !== false)
                                      .map(([key, value]) => {
                                        const aliasMap = {
                                          power: "Power",
                                          material: "Material",
                                          is_tinted: "Tinted",
                                          lens_type: "Lens Type",
                                          tint_color: "Tint Color",
                                          is_polarized: "Polarized",
                                          has_uv_protection: "UV Protection",
                                          has_blue_light_filter: "Blue Light Filter",
                                          has_anti_reflective_coating: "Anti-Reflective Coating"
                                        };
                                        return `${aliasMap[key] || key}: ${value}`;
                                      })
                                      .join(", ")}
                                  </p>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500">No items found.</p>
                      )}
                    </div>
                    <Separator className="my-4" />
                    <p className="text-sm text-gray-600">
                      Shipping to: {order.shipping_houseNumber}, {order.shipping_buildingName && `${order.shipping_buildingName}, `}{order.shipping_locality}, {order.shipping_street}, {order.shipping_district}, {order.shipping_state} - {order.shipping_pincode}
                    </p>
                  </CardContent>
                </Card>
                {index !== orders.length - 1 && <Separator className="my-6" />}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">You haven't placed any orders yet.</div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default UserOrdersPage;