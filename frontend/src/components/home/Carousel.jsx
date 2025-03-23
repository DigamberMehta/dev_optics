import { useState, useEffect } from "react"; // Added useEffect
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "https://static.zennioptical.com/marketing/campaign/promotion/2025/lens_promo/250310_LensPromo_HP_promo_tile_xxl.png",
    title: "Shop Now",
    headline: ["Save Big with", "Glasses Under $30"],
  },
  {
    image: "https://static.zennioptical.com/marketing/campaign/under_30/2025/HP/under30_woman_carousel_tile_xl.png",
    title: "Shop Now",
    headline: ["Trending Now", "New Spring Colors"],
  },
  {
    image: "https://static.zennioptical.com/marketing/campaign/spring_color/2025/st_patty/250218_CFY_spring_colors_carousel_tile_xl.png",
    title: "Shop Now",
    headline: ["Limited Time", "Lens Promotions"],
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-switching logic
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Switch slides every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [index]); // Re-run effect when index changes

  return (
    <div className="relative w-full flex items-center justify-center h-[300px] md:h-[400px] overflow-hidden px-3 md:p-0">
      <div className="relative w-[80%] flex justify-center items-center perspective-[1500px]">
        {slides.map((slide, i) => {
          const offset = ((i - index + slides.length + slides.length) % slides.length) - 1;
          const scale = 1 - Math.abs(offset) * 0.05;
          const zIndex = slides.length - Math.abs(offset);
          const opacity = offset === 0 ? 1 : 0.8;
          const translateX = offset === -1 ? -100 : offset === 1 ? 100 : 0;
          const rotateY = offset === -1 ? -15 : offset === 1 ? 15 : 0;

          return (
            <motion.div
              key={slide.image}
              className="absolute w-[100%] h-[250px] md:h-[300px] rounded-lg shadow-lg flex items-center justify-center text-white"
              style={{
                backgroundImage: `url('${slide.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: zIndex,
              }}
              initial={{ opacity: 0.5 }}
              animate={{ opacity, scale, x: translateX, rotateY }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              {/* Text container positioned at bottom left */}
              <div
                className="absolute bottom-10 left-8 text-left"
                style={{
                  transform: `rotateY(${-rotateY}deg)`,
                  pointerEvents: "none",
                }}
              >
                <h3 className="title color-gray-darker absolute bottom-[4rem] left-1 text-black text-[16px] md:text-[24px] font-[900]">
                  {slide.headline.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i !== slide.headline.length - 1 && <br />}
                    </span>
                  ))}
                </h3>
                <h3 className=" text-lg md:text-3xl mb-1 font-bold bg-black py-1 px-3 rounded-[20px]">
                  {slide.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>
      <button
        className="absolute left-5 bg-white p-2 rounded-full shadow-lg"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-5 bg-white p-2 rounded-full shadow-lg"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}