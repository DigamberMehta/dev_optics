// frontend/src/components/checkout/CheckoutItems.jsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const CheckoutItems = ({ buyNowProduct, cartItems }) => {
  return (
    <Card className="border-0 shadow-md">
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
                <p className="text-sm text-gray-500">Quantity: 1</p>
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
  );
};

export default CheckoutItems;