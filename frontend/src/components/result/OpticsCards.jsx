import React from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function OpticsCards({ products }) {
  console.log(products);
  const navigate = useNavigate(); // Get the navigate function

  const handleProductClick = (product) => {
    navigate(`/product/${product.product_id}/${product.slug}`);
  };

  return (
    <div className="grid md:grid-cols-3 grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {products && products.map((product) => (
        <Card
          key={product.product_id} // Assuming your product objects in the prop have a 'product_id'
          className="rounded-xl shadow-md bg-white transition-all hover:shadow-lg border-0 cursor-pointer" // Added cursor-pointer
          onClick={() => handleProductClick(product)} // Added onClick handler
        >
          <img
            src={product.images && product.images.length > 0 ? product.images[0] : 'placeholder-image-url'} // Use the first image from the 'images' array, or a placeholder
            alt={product.name}
            className="w-full h-40 object-contain rounded-t-xl"
          />
          <CardContent className="p-4">
            {product.rating && product.reviews && (
              <div className="flex items-center text-gray-600 text-sm">
                <span className="text-gray-900">{product.rating}</span>
                <Star className="text-yellow-500 w-4 h-4 mx-1" />
                <span>({product.reviews})</span>
              </div>
            )}
            <p className="text-xs text-gray-900 mt-2 font-medium">{product.name}</p>
            {product.size && <p className="text-gray-500 text-xs">{product.size}</p>}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">{product.price ? `₹${product.price}` : ''}</span>
              {product.oldPrice && (
                <span className="text-gray-400 text-sm line-through">{`₹${product.oldPrice}`}</span>
              )}
              {product.discount && (
                <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded whitespace-no-wrap">
                  {product.discount}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      {!products || products.length === 0 ? (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">No products found for this selection.</p>
        </div>
      ) : null}
    </div>
  );
}