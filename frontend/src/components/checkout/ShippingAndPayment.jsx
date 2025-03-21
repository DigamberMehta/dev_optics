// frontend/src/components/checkout/ShippingAndPayment.jsx
import React from "react";
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

const ShippingAndPayment = ({
  userAddress,
  handleProceedToPayment,
  isPaymentModalOpen,
  setIsPaymentModalOpen,
  handleCashOnDelivery,
}) => {
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-md">
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

      <AlertDialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <AlertDialogTrigger asChild>
          <Button className="w-full bg-[#46BAC8] text-white py-3 rounded-lg text-lg">
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
            <Button variant="secondary" onClick={() => setIsPaymentModalOpen(false)}>
              Pay Now (Coming Soon)
            </Button>
            <Button className="!mt-0" onClick={handleCashOnDelivery}>
              Cash on Delivery
            </Button>
            <AlertDialogAction  className="!mt-0 bg-red-600 hover:bg-red-700 text-white">
              Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ShippingAndPayment;