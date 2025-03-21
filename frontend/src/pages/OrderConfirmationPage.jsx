import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#FBF9F7] flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-green-600">Order Placed Successfully!</h2>
          <p className="text-gray-600">Thank you for your order.</p>
          <p className="text-gray-600">Redirecting to homepage in <span className="font-bold">{countdown}</span> seconds...</p>
          <Button onClick={() => navigate("/")} variant="outline">Go to Homepage</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderConfirmationPage;