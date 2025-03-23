import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

const categoriesData = {
  men: [
    { name: "Eyeglasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_eyeglasses.png" },
    { name: "Sunglasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_sunglasses.png" },
    { name: "Computer Glasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_computer_glasses.png" },
    { name: "Reading Glasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_reading_glasses.png" },
    { name: "Contact Lenses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_contact_lenses.png" },
    { name: "Accessories", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_accessories.png" },
  ],
  women: [
    { name: "Eyeglasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/women_eyeglasses.png" },
    { name: "Sunglasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/women_sunglasses.png" },
    { name: "Computer Glasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/women_computer_glasses.png" },
    { name: "Reading Glasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/women_reading_glasses.png" },
    { name: "Contact Lenses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/women_contact_lenses.png" },
    { name: "Accessories", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/women_accessories.png" },
  ],
  kid: [
    { name: "Eyeglasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/kids_eyeglasses.png" },
    { name: "Sunglasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/kids_sunglasses.png" },
  ],
};

export default function ShopByCategory({ products }) {
  const [selectedCategory, setSelectedCategory] = useState("men");
  const navigate = useNavigate();
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("shop-category");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.bottom < window.innerHeight * 0.40) {
          controls.start({ opacity: 0, y: -20 });
        } else {
          controls.start({ opacity: 1, y: 0 });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  const handleSubCategoryClick = (subCategoryName) => {
    navigate(
      `/category/${selectedCategory.toLowerCase()}/${subCategoryName.toLowerCase().replace(/ /g, "-")}`,
      {
        state: { products: products },
      }
    );
  };

  return (
    <motion.div id="shop-category" className="md:p-0 p-3" animate={controls} transition={{ duration: 0.5 }}>
      <h2 className="text-4xl font-semibold">Shop by Category</h2>

      {/* Categories Navigation - Using Grid */}
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-4 text-gray-600 font-medium text-xl">
        {Object.keys(categoriesData).map((category) => (
          <button
            key={category}
            className={`pb-2 border-b-2 transition-all duration-300 ${
              selectedCategory === category ? "border-[#46BAC8] text-black" : "border-transparent"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Subcategories Grid */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-6 "
      >
        {categoriesData[selectedCategory].map((subCategory) => (
          <div
            key={subCategory.name}
            className="cursor-pointer text-center"
            onClick={() => handleSubCategoryClick(subCategory.name)}
          >
            <img src={subCategory.img} alt={subCategory.name} className="w-full max-w-[132px] mx-auto border border-gray-200 rounded-[50%] p-2 border-5" />
            <p className="mt-2 text-lg font-medium">{subCategory.name}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
