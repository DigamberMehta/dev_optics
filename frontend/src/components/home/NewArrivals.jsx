import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    id: 1,
    image: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/F/T/FT1510UFA1MBLV_1_lar.jpg",
    brand: "Fastrack",
    name: "Red Geometric Rimmed Eyeglasses For Men And Women",
    price: "₹800",
    rating: null,
  },
  {
    id: 2,
    image: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/p/3/p357bk2_1_lar.jpg",
    brand: "Fastrack",
    name: "Black Square Polarized Sunglasses For Men",
    price: "₹1,600",
    rating: 4.0,
  },
  {
    id: 3,
    image: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/p/4/p420bk3p_1_lar.jpg",
    brand: "Tees By Fastrack",
    name: "Blue Aviator Sunglasses For Men And Women",
    price: "₹1,250",
    rating: null,
  },
  {
    id: 4,
    image: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/p/3/p357bk4_1_lar.jpg",
    brand: "Tees By Fastrack",
    name: "Grey Wayfarer Polarized Sunglasses For Men And Women",
    price: "₹1,350",
    rating: null,
  },
  {
    id: 5,
    image: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/F/T/FT1278WFP6MOLV_1_lar.jpg",
    brand: "Fastrack",
    name: "Black Wayfarer Men Sunglasses",
    price: "₹950",
    rating: null,
  },
  {
    id: 6,
    image: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/P/5/P513GY5V_1_lar.jpg",
    brand: "Fastrack",
    name: "Blue Rectangle Rimmed Eyeglasses For Men And Women",
    price: "₹1,100",
    rating: null,
  },
  {
    id: 7,
    image: "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/p/3/p357bk2_1_lar.jpg",
    brand: "Fastrack",
    name: "Blue Rectangle Rimmed Eyeglasses For Men And Women",
    price: "₹1,100",
    rating: null,
  },
];

export default function NewArrivals() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-blue-50 p-8 rounded-lg relative">
      {/* Header with "View All" Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">New Arrivals</h2>
       
      </div>

      {/* Scrollable Product List */}
      <div className="relative">
        {/* Gradient Overlays */}
        {/* <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-blue-50 to-transparent z-10"></div> */}
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-blue-50 to-transparent z-10 hide-scrollbar"></div>

        {/* Left Navigation Button */}
        <button
          className="absolute left-40 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-20 hover:bg-gray-200 transition"
          onClick={() => scroll("left")}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scrollable Cards */}
        <div
         
          className="flex gap-6 overflow-x-scroll scroll-smooth no-scrollbar px-3 hide-scrollbar"
        >
        <button className="text-[#4ebac6]  text-3xl font-medium hover:underline whitespace-nowrap">
          View All 
        </button>
        <div
         ref={scrollRef}
         className="flex gap-6 overflow-x-scroll scroll-smooth no-scrollbar px-16 hide-scrollbar">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg p-4 min-w-[190px] max-w-[210px] flex-shrink-0 cursor-pointer transition h-[250px]"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
            >
              <img src={product.image} alt={product.name} className="w-full rounded-lg" />
              <div className="mt-8">
              <h3 className="mt-1 text-sm text-[#272932]">{product.brand}</h3>
              <p className="text-[#8b8fa9] text-xs mt-1">{product.name}</p>
              <p className="text-[#4ebac6] text-xs mt-1">{product.price}</p>
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