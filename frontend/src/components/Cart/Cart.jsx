import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export default function Cart() {
  return (
    <div className="min-h-screen bg-[#FBF9F7] p-16 pt-[120px]">
      <header className="flex items-center justify-between pb-6">
        <h1 className="text-2xl font-semibold">Cart (2 items)</h1>
      </header>
      
      <div className="flex gap-10">
        {/* Cart Section */}
        <div className="w-3/5 space-y-6">
          {[1, 2].map((item) => (
            <Card key={item} className="p-4 flex gap-6 border-0 shadow-md">
              <img src="https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/black-full-rim-square-lenskart-studio-ls-e15666-c2-eyeglasses_csvfile-1705966162422-akaran33.png" alt="glasses" className="w-32 h-24 object-contain"  />
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <h2 className="text-lg">Black Full Rim Square Lenskart STUDIO LS E15666-C2 Eyeglasses</h2>
                  <p className="text-sm text-gray-500">Final Price</p>
                  <p className="text-sm">₹2000</p>
                </div>
                <div className="flex gap-4 text-sm text-[#4a4a4a]">
                  <button>Remove</button>
                  <button>Repeat</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Bill Details */}
        <div className="w-2/5 space-y-6">
          <Card className="p-6 border-0 shadow-md">
            <div className="flex justify-between text-md">
              <span>Total item price</span>
              <span>₹5500</span>
            </div>
            <div className="flex justify-between text-md text-green-500">
              <span>Total discount</span>
              <span>-₹320</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-sm">
              <span>Total payable</span>
              <span>₹5180</span>
            </div>
          </Card>
          
          <Card className="p-4 flex justify-between items-center border-0 shadow-md">
            <div>
              <p className="text-sm">WELCOME applied</p>
              <p className="text-sm text-gray-500">You are saving ₹320</p>
            </div>
            <button className="text-blue-600 text-sm">REMOVE</button>
          </Card>
          
          <Card className="p-4 flex justify-between items-center border-0 shadow-md">
            <div>
              <p className="text-sm">Apply Insurance</p>
              <p className="text-sm text-gray-500">Tap to view your benefits</p>
            </div>
            <button className="text-xl">→</button>
          </Card>
          
          <Button className="w-full bg-green-500 text-white py-3 rounded-lg text-lg">
            Proceed To Checkout →
          </Button>
        </div>
      </div>
    </div>
  );
}
