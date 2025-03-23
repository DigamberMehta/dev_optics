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
import AuthContext from "@/context/AuthContext"; // Adjust the path if needed

const ShippingAndPayment = ({
  userAddress,
  handleProceedToPayment,
  isPaymentModalOpen,
  setIsPaymentModalOpen,
  handleCashOnDelivery,
  totalAmount,
  buyNowProduct, // Receive buyNowProduct prop
}) => {
  const navigate = useNavigate();
  const [cashfreeInstance, setCashfreeInstance] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("useEffect for initializing Cashfree SDK called");
    const initializeCashfree = async () => {
      try {
        console.log("Attempting to load Cashfree SDK");
        const cf = await load({
          mode: process.env.NODE_ENV === 'production' ? "production" : "sandbox",
        });
        setCashfreeInstance(cf);
        console.log("Cashfree SDK loaded successfully:", cf);
      } catch (error) {
        console.error("Error loading Cashfree SDK:", error);
        toast.error("Failed to load payment gateway.");
      }
    };

    initializeCashfree();
  },[]);

  const handlePayWithCashfree = async () => {
    console.log("handlePayWithCashfree function called");
    if (!cashfreeInstance) {
      console.warn("Cashfree instance is not ready yet.");
      toast.error("Payment gateway not ready.");
      return;
    }
    console.log("Total Amount being sent to backend:", totalAmount);
    try {
      console.log("Attempting to create Cashfree order on backend...");
      let response;
      if (buyNowProduct && buyNowProduct.length > 0) {
        const product = buyNowProduct[0];
        response = await axios.post("http://localhost:3000/api/orders/create-cashfree-buy-now-order", {
          totalAmount: totalAmount,
          userId: user?.user_id,
          shippingAddress: userAddress,
          productId: product.product_id,
          quantity: 1,
          customizations: product.customizations || {},
        });
      } else {
        response = await axios.post("http://localhost:3000/api/orders/create-cashfree-order", {
          totalAmount: totalAmount,
          userId: user?.user_id,
          shippingAddress: userAddress,
        });
      }
      console.log("Backend Response Data:", response.data);

      const sessionId = response.data?.payment_session_id; // Updated key name
      console.log("Type of payment_session_id:", typeof sessionId);
      console.log("Value of payment_session_id:", sessionId);

      if (sessionId) {
        const checkoutOptions = {
          paymentSessionId: sessionId, // Cashfree SDK expects this key
          redirectTarget: "_self",
        };
        console.log("Payment Session ID received:", sessionId);
        console.log("Calling cashfreeInstance.checkout with options:", checkoutOptions);
        cashfreeInstance.checkout(checkoutOptions);
        console.log("cashfreeInstance.checkout called");
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