import React from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const products = [
  {
    id: 1,
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-sky-full-rim-hustlr-eyeglasses_eyeglasses_csvfile-1671778448401-air_blue-transparent-full-rim-square-lenskar_28_12_2022.jpg",
    rating: 4.8,
    reviews: 2193,
    name: "Lenskart Air",
    size: "Medium • Air Fusion",
    price: "₹1500",
    oldPrice: "₹2000",
    discount: "25% OFF",
  },
  {
    id: 2,
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//v/i/copper-brown-full-rim-round-vincent-chase-sleek-steel-vc-e15069-c2-eyeglasses_g_3675_10_14_22.jpg",
    rating: 4.8,
    reviews: 1018,
    name: "Lenskart Air",
    size: "Medium • Air Fusion",
    price: "₹1500",
    oldPrice: "₹2000",
    discount: "25% OFF",
  },
  {
    id: 3,
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-black-full-rim-square-vincent-chase-sleek-steel-vc-e14938-c2-eyeglasses_g_0371_09_july_2022.jpg",
    rating: 4.8,
    reviews: 307,
    name: "John Jacobs",
    size: "Medium • John Jacobs",
    price: "₹3500",
    oldPrice: "₹4000",
    discount: "13% OFF",
  },
  {
    id: 4,
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-sky-full-rim-hustlr-eyeglasses_eyeglasses_csvfile-1671778448401-air_blue-transparent-full-rim-square-lenskar_28_12_2022.jpg",
    rating: 4.8,
    reviews: 2193,
    name: "Lenskart Air",
    size: "Medium • Air Fusion",
    price: "₹1500",
    oldPrice: "₹2000",
    discount: "25% OFF",
  },
  {
    id: 5,
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//v/i/copper-brown-full-rim-round-vincent-chase-sleek-steel-vc-e15069-c2-eyeglasses_g_3675_10_14_22.jpg",
    rating: 4.8,
    reviews: 1018,
    name: "Lenskart Air",
    size: "Medium • Air Fusion",
    price: "₹1500",
    oldPrice: "₹2000",
    discount: "25% OFF",
  },
  {
    id: 6,
    image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-black-full-rim-square-vincent-chase-sleek-steel-vc-e14938-c2-eyeglasses_g_0371_09_july_2022.jpg",
    rating: 4.8,
    reviews: 307,
    name: "John Jacobs",
    size: "Medium • John Jacobs",
    price: "₹3500",
    oldPrice: "₹4000",
    discount: "13% OFF",
  }
];

export default function OpticsCards() {
  return (
    <div className="grid md:grid-cols-3 grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="rounded-xl shadow-md bg-white transition-all hover:shadow-lg border-0"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-contain rounded-t-xl"
          />
          <CardContent className="p-4">
            <div className="flex items-center text-gray-600 text-sm">
              <span className="text-gray-900">{product.rating}</span>
              <Star className="text-yellow-500 w-4 h-4 mx-1" />
              <span>({product.reviews})</span>
            </div>
            <p className="text-xs text-gray-900 mt-2 font-medium">{product.name}</p>
            <p className="text-gray-500 text-xs">{product.size}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">{product.price}</span>
              <span className="text-gray-400 text-sm line-through">{product.oldPrice}</span>
              <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded whitespace-no-wrap">
                {product.discount}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
