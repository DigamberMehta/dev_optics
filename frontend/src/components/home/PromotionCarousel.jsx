import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { id: 1, title: "Big glasses. Small prices.", description: "Trendy oversized glasses and sunglasses.", img: "https://static.zennioptical.com/marketing/campaign/oversized/2025/HP/Frame_Shape_Oversized_carousel_card-lg.png" },
  { id: 2, title: "JRUE HOLIDAY x ZENNI", description: "Eyewear for every champion.", img: "https://static.zennioptical.com/marketing/campaign/JrueHoliday/HP/250225_jrue_hp_2_tile_carousel_v2-sm.png" },
  { id: 3, title: "Stylish and Affordable", description: "Find your perfect pair today.", img: "https://static.zennioptical.com/marketing/campaign/premium_progressive/2025/HP/250212_progressives_carousel_card_xs.png" },
  { id: 4, title: "Stylish and Affordable", description: "Find your perfect pair today.", img: "https://static.zennioptical.com/marketing/campaign/promotion/2025/lens_promo/250310_LensPromo_HP_promo_tile_xxl.png" }
];

const PromotionCarousel = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const goToSlide = (slideIndex) => {
    setIndex(slideIndex);
  };

  return (
    <div className="relative w-full overflow-hidden mt-12">
      <div className="relative flex items-center justify-center">
        <button onClick={prevSlide} className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-lg">
          <ChevronLeft size={24} />
        </button>
        <div className="flex w-full h-[300px] items-center justify-center overflow-hidden relative">
          <AnimatePresence initial={false}>
            {slides.map((slide, i) => {
              const position = (i - index + slides.length) % slides.length;
              let xPosition = "100%"; // Default to off-screen right
              let scale = 0.9;
              let opacity = 0;

              if (position === 0) {
                xPosition = "0%"; // Center slide
                scale = 1;
                opacity = 1;
              } else if (position === 1) {
                xPosition = "100%"; // Next slide (off-screen right)
                scale = 0.9;
                opacity = 1;
              } else if (position === 2) {
                xPosition = "-100%"; // Previous slide (off-screen left)
                scale = 0.9;
                opacity = 1;
              }

              return (
                <motion.div
                  key={slide.id}
                  className="absolute w-1/3 h-[300px] flex flex-col rounded-lg shadow-lg p-4 justify-around text-black"
                  initial={{ x: xPosition, opacity: 0, scale: 0.9 }}
                  animate={{ x: xPosition, opacity, scale }}
                  exit={{ x: xPosition, opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ backgroundImage: `url(${slide.img})`, backgroundSize: "cover", backgroundPosition: "center" }}
                >
                  <div>
                    <h2 className="text-2xl font-bold text-black">{slide.title}</h2>
                    <p className="text-black">{slide.description}</p>
                  </div>
                  <div>
                    <button className="bg-black text-white rounded-lg p-2">Shop Now</button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <button onClick={nextSlide} className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-lg">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full mx-1 ${i === index ? "bg-black" : "bg-gray-300"}`}
            onClick={() => goToSlide(i)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default PromotionCarousel;