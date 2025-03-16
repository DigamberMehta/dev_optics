import { useState } from "react";
import { useNavigate } from 'react-router-dom';

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
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const navigate = useNavigate();

  const handleSubCategoryClick = (subCategoryName) => {
    setSelectedSubCategory(subCategoryName);
    navigate(`/category/${selectedCategory.toLowerCase()}/${subCategoryName.toLowerCase().replace(/ /g, '-')}`, {
      state: { products: products }, // Pass the products data as route state
    });
  };

  return (
    <div>
      <div className="">
        <h2 className="text-4xl font-semibold">Shop by Category</h2>
        <div className="flex space-x-12 mt-4 text-gray-600 font-medium text-xl">
          {Object.keys(categoriesData).map((category) => (
            <button
              key={category}
              className={`pb-2 border-b-2 ${
                selectedCategory === category
                  ? "border-[#46BAC8] text-black"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-between flex-wrap">
          {categoriesData[selectedCategory]?.map((item) => (
            <div
              key={item.name}
              className="text-center mx-auto cursor-pointer"
              onClick={() => handleSubCategoryClick(item.name)}
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-40 h-40 rounded-full border-2 border-gray-300 p-1 mx-auto"
              />
              <p className="mt-2 text-xl">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Results component will be loaded on the new route */}
    </div>
  );
}