import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Authentication token not found. Please log in.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/admin/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching admin orders:', err);
        if (err.response) {
          if (err.response.status === 401 || err.response.status === 403) {
            setError(err.response.data.message || 'Access denied. Admin privileges required.');
          } else {
            setError(`Failed to fetch orders: ${err.response.data.message || err.response.statusText}`);
          }
        } else if (err.request) {
          setError('No response from server. Please check network or server status.');
        } else {
          setError(`Error: ${err.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const RenderCustomizations = ({ customizations }) => {
    if (!customizations || typeof customizations !== 'object' || Object.keys(customizations).length === 0) {
      return <span className="text-sm text-muted-foreground">No customizations</span>;
    }

    const customizationString = Object.entries(customizations)
      .map(([key, value]) => {
        const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim();
        return `${formattedKey}: ${typeof value === 'object' ? JSON.stringify(value) : String(value)}`;
      })
      .join(', ');

    return (
      <div className="mt-2">
        <p className="text-sm font-medium">Customizations:</p>
        <p className="text-sm text-muted-foreground">{customizationString}</p>
      </div>
    );
  };

  if (isLoading) {
    return <div className="p-4">Loading orders...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (orders.length === 0) {
    return <div className="p-4 text-muted-foreground">No orders found.</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Customer Orders</h1>
      {orders.map((order) => (
        <Card key={order.order_id} className="shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Order ID: {order.order_id}</CardTitle>
              <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                {order.status || 'N/A'}
              </Badge>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Date: {formatDate(order.order_date)}</span>
              <span>Total: ₹{order.total_amount ? parseFloat(order.total_amount).toFixed(2) : 'N/A'}</span>
              {order.User && (
                <span>
                  Customer: {order.User.name} ({order.User.email})
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.orderItems && order.orderItems.length > 0 ? (
                  order.orderItems.map((item) => (
                    <TableRow key={item.order_item_id}>
                      <TableCell>
                        {item.product && item.product.images && item.product.images.length > 0 ? (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name || 'Product'}
                            className="w-12 h-12 object-contain rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-muted flex items-center justify-center rounded text-xs">
                            No Image
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.product ? (
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Type: {item.product.product_type}, Gender: {item.product.gender}
                            </p>
                            <RenderCustomizations customizations={item.customizations} />
                          </div>
                        ) : (
                          <span>Product ID: {item.product_id} (Details missing)</span>
                        )}
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        ₹{(item.total_price / item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell>₹{parseFloat(item.total_price).toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No items found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="mt-4">
              <h4 className="text-sm font-medium">Shipping Address</h4>
              <p className="text-sm text-muted-foreground">
                {order.shipping_houseNumber} {order.shipping_buildingName}, {order.shipping_locality}
                <br />
                {order.shipping_street}, {order.shipping_district}
                <br />
                {order.shipping_state} - {order.shipping_pincode}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default AdminOrders;