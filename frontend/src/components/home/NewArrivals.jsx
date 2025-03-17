import { useRef, useEffect } from "react";
import { motion, useAnimation, useScroll } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NewArrivals({ products }) {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const controls = useAnimation();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0 1", "1 0"], // Trigger animation when top hits bottom and bottom hits top
  });
  const cardControls = useAnimation();
  const { scrollYProgress: cardScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0.2 0.8", "0.9 0.1"], // Trigger card animation within the container's visibility
  });

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const newArrivalProducts = products ? products.filter((product) => product.new_arrivals) : [];

  const handleProductClick = (product) => {
    navigate(`/product/${product.product_id}/${product.slug}`);
  };

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      controls.start({
        opacity: latest > 0 ? 1 : 0,
        y: latest > 0 ? 0 : 50,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    });
  }, [scrollYProgress, controls]);

  useEffect(() => {
    return cardScrollYProgress.onChange((latest) => {
      const cards = Array.from(containerRef.current?.querySelectorAll(".product-card") || []);
      cards.forEach((card, index) => {
        cardControls.start({
          x: latest > 0 ? 0 : "100%",
          opacity: latest > 0 ? 1 : 0,
          transition: { duration: 1, ease: "easeOut" }, // Removed delay
        });
      });
    });
  }, [cardScrollYProgress, cardControls]);

  return (
    <motion.div
      className="bg-blue-50 p-8 rounded-lg relative"
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">New Arrivals</h2>
      </div>

      {/* Scrollable Product List */}
      <div className="relative">
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-blue-50 to-transparent z-10 hide-scrollbar"></div>

        <button
          className="absolute left-40 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-20 hover:bg-gray-200 transition"
          onClick={() => scroll("left")}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-6 overflow-x-scroll scroll-smooth no-scrollbar px-3 hide-scrollbar">
          <button className="text-[#4ebac6] text-3xl font-medium hover:underline whitespace-nowrap">
            View All
          </button>
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-scroll scroll-smooth no-scrollbar px-16 hide-scrollbar"
          >
            {newArrivalProducts.map((product) => (
              <motion.div
                key={product.product_id}
                className="product-card bg-white rounded-lg p-4 min-w-[190px] max-w-[210px] flex-shrink-0 cursor-pointer transition h-[250px]"
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
                onClick={() => handleProductClick(product)}
                style={{ willChange: "transform" }}
                initial={{ x: "100%", opacity: 0 }}
                animate={cardControls}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full rounded-lg h-[120px] object-cover"
                />
                <div className="mt-8">
                  <h3 className="mt-1 text-sm text-[#272932]">{product.name}</h3>
                  <p className="text-[#8b8fa9] text-xs mt-1">{product.product_type}</p>
                  <p className="text-[#4ebac6] text-xs mt-1">₹{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <button
          className="bg-white p-3 rounded-full shadow-md absolute right-2 top-1/2 -translate-y-1/2 z-20 hover:bg-gray-200 transition"
          onClick={() => scroll("right")}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}