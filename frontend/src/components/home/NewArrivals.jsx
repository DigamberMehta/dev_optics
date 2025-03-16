// /Users/digamber/Desktop/Optics_Website/frontend/src/components/home/NewArrivals.jsx
import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function NewArrivals({ products }) {
  const scrollRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const newArrivalProducts = products ? products.filter(product => product.new_arrivals) : [];

  // Function to handle product click and navigate
  const handleProductClick = (product) => {
    navigate(`/product/${product.product_id}/${product.slug}`);
  };

  return (
    <div className="bg-blue-50 p-8 rounded-lg relative">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">New Arrivals</h2>

      </div>

      {/* Scrollable Product List */}
      <div className="relative">

        {/* <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-blue-50 to-transparent z-10"></div> */}
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-blue-50 to-transparent z-10 hide-scrollbar"></div>


        <button
          className="absolute left-40 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-20 hover:bg-gray-200 transition"
          onClick={() => scroll("left")}
        >
          <ChevronLeft size={20} />
        </button>


        <div

          className="flex gap-6 overflow-x-scroll scroll-smooth no-scrollbar px-3 hide-scrollbar"
        >
        <button className="text-[#4ebac6]  text-3xl font-medium hover:underline whitespace-nowrap">
          View All
        </button>
        <div
         ref={scrollRef}
         className="flex gap-6 overflow-x-scroll scroll-smooth no-scrollbar px-16 hide-scrollbar">
          {newArrivalProducts.map((product) => (
            <motion.div
              key={product.product_id}
              className="bg-white rounded-lg p-4 min-w-[190px] max-w-[210px] flex-shrink-0 cursor-pointer transition h-[250px]"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
              onClick={() => handleProductClick(product)} // Add onClick handler
            >
              <img src={product.images[0]} alt={product.name} className="w-full rounded-lg h-[120px] object-cover" />
              <div className="mt-8">
              <h3 className="mt-1 text-sm text-[#272932]">{product.name}</h3>
              <p className="text-[#8b8fa9] text-xs mt-1">{product.product_type}</p>
              <p className="text-[#4ebac6] text-xs mt-1">₹{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
        </div>

        {/* Right Navigation Button */}
        <button
          className="bg-white p-3 rounded-full shadow-md absolute right-2 top-1/2 -translate-y-1/2 z-20 hover:bg-gray-200 transition"
          onClick={() => scroll("right")}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}