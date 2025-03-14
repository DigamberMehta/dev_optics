import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const items = [
  { id: 1, title: "Big glasses. Small prices.", description: "Trendy oversized glasses and sunglasses.", src: "https://d3995ea24pmi7m.cloudfront.net/fit-in/1320x600/media/wysiwyg/titan_cms/video-testimonials/video_thumbnail_1.png" },
  { id: 2, title: "JRUE HOLIDAY x ZENNI", description: "Eyewear for every champion.", src: "https://d3995ea24pmi7m.cloudfront.net/fit-in/1320x600/media/wysiwyg/titan_cms/video-testimonials/video_thumbnail_3.png" },
  { id: 3, title: "Stylish and Affordable", description: "Find your perfect pair today.", src: "https://d3995ea24pmi7m.cloudfront.net/fit-in/1320x600/media/wysiwyg/titan_cms/video-testimonials/video_thumbnail_2.png" },
  { id: 4, title: "More Choices, Great Deals", description: "Discover our latest collection.", src: "https://d3995ea24pmi7m.cloudfront.net/fit-in/1320x600/media/wysiwyg/titan_cms/video-testimonials/video_thumbnail_1.png" },
];

export default function Test() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex items-center justify-center w-full h-96 relative overflow-hidden">
      <button onClick={prevSlide} className="absolute left-5 z-10 p-2 bg-white rounded-full shadow">
        <ChevronLeft size={24} />
      </button>

      <div className="relative flex w-full justify-center items-center">
        {items.map((item, index) => {
          const offset = (index - activeIndex + items.length) % items.length;
          let position, zIndex, scale, opacity;

          if (offset === 0) {
            // Active slide (center)
            position = "translate-x-0";
            scale = "scale-100";
            opacity = "opacity-100";
            zIndex = "z-10";
          } else if (offset === 1) {
            // Next slide (partially visible on right)
            position = "translate-x-[50%]";
            scale = "scale-75";
            opacity = "opacity-75";
            zIndex = "z-5"; // Modified zIndex
          } else if (offset === items.length - 1) {
            // Previous slide (partially visible on left)
            position = "-translate-x-[50%]";
            scale = "scale-75";
            opacity = "opacity-75";
            zIndex = "z-5"; // Modified zIndex
          } else {
            // Hide other slides
            position = "translate-x-0 hidden";
            scale = "scale-50";
            opacity = "opacity-0";
            zIndex = "-z-10";
          }

          return (
            <motion.div
              key={item.id}
              className={`absolute transition-all duration-500 ${position} ${scale} ${opacity} ${zIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <img src={item.src} alt={item.title} className="rounded-lg w-[500px] h-[300px] object-cover" />
            </motion.div>
          );
        })}
      </div>

      <button onClick={nextSlide} className="absolute right-5 z-10 p-2 bg-white rounded-full shadow">
        <ChevronRight size={24} />
      </button>
    </div>
  );
}