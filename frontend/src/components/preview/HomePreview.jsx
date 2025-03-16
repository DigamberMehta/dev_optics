// /Users/digamber/Desktop/Optics_Website/frontend/src/components/preview/HomePreview.jsx
import React, { useEffect, useState } from "react";
import ImageContainer from "./ImageContainer";
import Maindetails from "./MainDetails";
import { Frame } from "lucide-react";
import FrameDimension from "./FrameDimension";
import Description from "./Description";
import ProductInfo from "./ProductInfo";
import { useParams } from "react-router-dom"; // Import useParams

const HomePreview = () => {
  const { id, slug } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Construct the full URL to your backend API
        const response = await fetch(`http://localhost:3000/api/products/${id}/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProductDetails(data);
        console.log("Fetched Product Details:", data); // Console log the fetched data
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id && slug) {
      fetchProductDetails();
    }
  }, [id, slug]);

  if (!productDetails) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  return (
    <div
      className="w-full h-screen overflow-hidden pt-[120px]"
    >
      <div className="p-10 flex flex-col md:flex-row w-full h-full bg-slate-50">
        <div className="w-full md:w-[40%] h-full">
          <ImageContainer product={productDetails} /> {/* Pass productDetails as prop */}
        </div>
        <div
          className="w-full md:w-[60%] h-full overflow-y-auto hide-scrollbar"
        >
          <div className="flex flex-col mx-6">
            <Maindetails product={productDetails} /> {/* Pass productDetails as prop */}
            <FrameDimension product={productDetails} /> {/* Pass productDetails as prop */}
            <Description product={productDetails} /> {/* Pass productDetails as prop */}
            <ProductInfo product={productDetails} /> {/* Pass productDetails as prop */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePreview;