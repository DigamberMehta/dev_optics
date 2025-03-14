import React from "react";

const Maindetails = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
      <h3 className="text-[#35bbd1]  text-lg">FASTRACK</h3>
      <h2 className="text-xl font-semibold mt-1">Yellow Cateye Rimmed Eyeglasses for Women</h2>
      <p className="text-sm  font-semibold mt-2">MRP ₹800</p>
      <p className="text-gray-500 text-sm mt-1">Inclusive of all taxes</p>
      <div className="mt-4">
        <p className="">Available Color</p>
        <div className="flex gap-2 mt-2">
          <span className="w-8 h-8 rounded-full bg-blue-600 border-2 border-transparent"></span>
          <span className="w-8 h-8 rounded-full bg-red-600 border-2 border-transparent"></span>
          <span className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-black"></span>
          <span className="w-8 h-8 rounded-full bg-green-600 border-2 border-transparent"></span>
        </div>
      </div>
    </div>
  );
};

export default Maindetails;
