import { useState } from "react";
import { Heart, Share2 } from "lucide-react";

const images = [
  "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/F/T/FT1503WFP5MYLV_1_lar.jpg",
  "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/F/T/FT1503WFP5MYLV_3_lar.jpg",
  "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/F/T/FT1503WFP5MYLV_6_lar.jpg",
  "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/F/T/FT1503WFP5MYLV_5_lar.jpg",
  "https://d3995ea24pmi7m.cloudfront.net/media/catalog/product/F/T/FT1503WFP5MYLV_4_lar.jpg",
];

const ImageContainer = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col p-6 items-center bg-white rounded-2xl shadow-md h-fit">
      {/* Main Image */}
      <div className="relative">
        <img src={selectedImage} alt="Product" className="w-96 h-64 object-contain" />
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="flex items-center space-x-2 mt-4">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => {
            const currentIndex = images.indexOf(selectedImage);
            if (currentIndex > 0) {
              setSelectedImage(images[currentIndex - 1]);
            }
          }}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Thumbnail"
            className={`w-16 h-16 p-1 border rounded cursor-pointer ${
              selectedImage === img ? "border-black" : "border-gray-300"
            }`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => {
            const currentIndex = images.indexOf(selectedImage);
            if (currentIndex < images.length - 1) {
              setSelectedImage(images[currentIndex + 1]);
            }
          }}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ImageContainer;