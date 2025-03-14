import { useState } from "react";

const categories = {
  men: [
    { name: "Eyeglasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_eyeglasses.png" },
    { name: "Sunglasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_sunglasses.png" },
    { name: "Computer Glasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_computer_glasses.png" },
    { name: "Reading Glasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_reading_glasses.png" },
    { name: "Contact Lenses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_contact_lenses.png" },
    { name: "Accessories", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_accessories.png" },
  ],
  women: [
    { name: "Eyeglasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_eyeglasses.png" },
    { name: "Sunglasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_sunglasses.png" },
    { name: "Computer Glasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_computer_glasses.png" },
    { name: "Reading Glasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_reading_glasses.png" },
    { name: "Contact Lenses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_contact_lenses.png" },
    { name: "Accessories", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_accessories.png" },
  ],
  kids: [
    { name: "Eyeglasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_eyeglasses.png" },
    { name: "Sunglasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_sunglasses.png" },
    { name: "Computer Glasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_computer_glasses.png" },
    { name: "Reading Glasses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_reading_glasses.png" },
    { name: "Contact Lenses", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_contact_lenses.png" },
    { name: "Accessories", img: "https://d3995ea24pmi7m.cloudfront.net/fit-in/132x132/media/wysiwyg/titan_cms/shop_by_category/men_accessories.png" },
  ],
};

export default function ShopByCategory() {
  const [selectedCategory, setSelectedCategory] = useState("men");

  return (
  <div>
    <div className="">
      <h2 className="text-4xl font-semibold">Shop by Category</h2>
      <div className="flex space-x-12 mt-4 text-gray-600 font-medium text-xl">
        {Object.keys(categories).map((category) => (
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
        {categories[selectedCategory].map((item) => (
          <div key={item.name} className="text-center">
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
    </div>
  );
}
