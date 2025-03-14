import { useRef, useEffect } from "react";
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

export default function FrequentlyBought() {
  const scrollRef = useRef(null);
  const intervalRef = useRef();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const autoScroll = () => {
      if (!scrollRef.current) return;

      const container = scrollRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 1) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 300, behavior: "smooth" });
      }
    };

    intervalRef.current = setInterval(autoScroll, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="w-full mt-12 mb-12">
      <div className="bg-gradient-to-b from-[#ffdc5f] to-[#FFDCAF] rounded-lg relative">
        <div className="relative px-12 py-3">
          <h2 className="text-2xl font-bold mb-4 py-2">Frequently Bought</h2>

          {/* Left Scroll Button */}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center shadow-md z-20"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Scrollable Product Container with Gradient Overlays */}
          <div className="relative">
            {/* Gradient Overlays */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-[#ffdc5f] to-transparent" />
              <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#ffdc5f] to-transparent" />
            </div>

            {/* Product List */}
            <div
              ref={scrollRef}
              className="flex space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth hide-scrollbar relative"
            >
              {products.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 w-56 flex-none relative shadow-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-contain"
                  />
                  <h3 className="font-bold mt-2">{item.brand}</h3>
                  <p className="text-sm text-gray-600">{item.name}</p>
                  {item.rating && (
                    <p className="text-yellow-500 flex items-center">
                      {Array.from({ length: item.rating }).map((_, index) => (
                        <span key={index}>⭐</span>
                      ))}
                    </p>
                  )}
                  <p className="text-lg font-bold mt-2">{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Scroll Button */}
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center shadow-md z-20"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
