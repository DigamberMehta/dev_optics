// frontend/src/components/checkout/OrderSummary.jsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const OrderSummary = ({ calculateTotalPrice }) => {
  return (
    <Card className="border-0 shadow-md">
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
  );
};

export default OrderSummary;