// frontend/src/components/checkout/ShippingAndPayment.jsx
import React, { useState, useEffect, useContext } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/context/AuthContext";

const ShippingAndPayment = ({
  userAddress,
  handleProceedToPayment,
  isPaymentModalOpen,
  setIsPaymentModalOpen,
  handleCashOnDelivery,
  totalAmount,
  buyNowProduct,
}) => {
  const navigate = useNavigate();
  const [cashfreeInstance, setCashfreeInstance] = useState(null);
  const { user } = useContext(AuthContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const initializeCashfree = async () => {
      try {
        const cf = await load({
          mode: process.env.NODE_ENV === 'production' ? "production" : "sandbox",
        });
        setCashfreeInstance(cf);
      } catch (error) {
        console.error("Error loading Cashfree SDK:", error);
        toast.error("Failed to load payment gateway.");
      }
    };

    initializeCashfree();
  }, []);

  const handlePayWithCashfree = async () => {
    if (!cashfreeInstance) {
      toast.error("Payment gateway not ready.");
      return;
    }

    try {
      let response;
      const apiUrl = `${backendUrl}/api/orders`;
      const buyNowApiUrl = `${backendUrl}/api/orders/create-cashfree-buy-now-order`;

      if (buyNowProduct && buyNowProduct.length > 0) {
        const product = buyNowProduct[0];
        response = await axios.post(buyNowApiUrl, {
          totalAmount: totalAmount,
          userId: user?.user_id,
          shippingAddress: userAddress,
          productId: product.product_id,
          quantity: 1,
          customizations: product.customizations || {},
        });
      } else {
        response = await axios.post(apiUrl + "/create-cashfree-order", {
          totalAmount: totalAmount,
          userId: user?.user_id,
          shippingAddress: userAddress,
        });
      }

      const sessionId = response.data?.payment_session_id;

      if (sessionId) {
        const checkoutOptions = {
          paymentSessionId: sessionId,
          redirectTarget: "_self",
        };
        cashfreeInstance.checkout(checkoutOptions);
      } else {
        toast.error("Failed to initiate payment.");
        console.error("Cashfree order creation failed:", response.data);
      }
    } catch (error) {
      console.error("Error initiating Cashfree payment:", error);
      toast.error("Failed to initiate payment.");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 border-0 shadow-md">
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent>
          {userAddress ? (
            <div className="space-y-2">
              {userAddress.full_name && <p className="font-semibold">{userAddress.full_name}</p>}
              <p>
                {userAddress.houseNumber} {userAddress.buildingName && `- ${userAddress.buildingName}`}, {userAddress.locality}
              </p>
              <p>
                {userAddress.street}, {userAddress.district}
              </p>
              <p>
                {userAddress.state} - {userAddress.pincode}
              </p>
              {userAddress.country && <p>{userAddress.country}</p>}
              {userAddress.phone_number && <p>Phone: {userAddress.phone_number}</p>}
            </div>
          ) : (
            <p className="text-gray-500">No address found. Please add an address in your profile.</p>
          )}
        </CardContent>
      </Card>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="w-full bg-[#46BAC8] hover:bg-[#46BAC8] text-white py-3 rounded-lg text-lg">
            Proceed to Payment
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Choose Payment Method</AlertDialogTitle>
            <AlertDialogDescription>
              Select your preferred payment method to complete your order.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-end items-center ">
            <Button className="!mt-0" onClick={handleCashOnDelivery}>
              Cash on Delivery
            </Button>
            <Button className="!mt-0" onClick={handlePayWithCashfree}>
              Pay with Cashfree
            </Button>
            <Button variant="destructive" className="!mt-0" onClick={() => setIsPaymentModalOpen(false)}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ShippingAndPayment;