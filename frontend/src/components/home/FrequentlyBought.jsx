import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function FrequentlyBought({ products }) {
  const scrollRef = useRef(null);
  const intervalRef = useRef();
  const navigate = useNavigate(); // Get the navigate function

  // Filter products to show only frequently bought items
  const frequentlyBoughtProducts = products ? products.filter(product => product.frequently_bought) : [];

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
  },);

  const handleProductClick = (product) => {
    navigate(`/product/${product.product_id}/${product.slug}`);
  };

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
              {frequentlyBoughtProducts.map((product) => (
                <div
                  key={product.product_id}
                  className="bg-white rounded-2xl p-4 w-56 flex-none relative shadow-lg cursor-pointer" // Added cursor-pointer for visual feedback
                  onClick={() => handleProductClick(product)} // Added onClick handler
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-32 object-contain"
                  />
                  <h3 className="mt-2 text-md">{product.name}</h3>
                  <p className="text-sm text-[#8B8FA9]">{product.product_type}</p>
                  <p className="text-smfont-bold mt-2">₹{product.price}</p>
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