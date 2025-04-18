import React, { useEffect, useState } from "react";
import ImageContainer from "./ImageContainer";
import Maindetails from "./MainDetails";
import FrameDimension from "./FrameDimension";
import Description from "./Description";
import ProductInfo from "./ProductInfo";
import { useParams } from "react-router-dom";

const HomePreview = () => {
  const { id, slug } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${backendURL}/api/products/${id}/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProductDetails(data);
        console.log("Fetched Product Details:", data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id && slug) {
      fetchProductDetails();
    }
  }, [id, slug, backendURL]);

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full pt-[80px] lg:pt-[100px]">
      <div className="md:py-10 md:px-20 px-4 grid grid-cols-1 lg:grid-cols-2 w-full h-full bg-slate-50 gap-8">
        <div className="w-full">
          <ImageContainer product={productDetails} />
        </div>
        <div className="w-full h-full">
          <div className="grid gap-6">
            <Maindetails product={productDetails} />
            <FrameDimension product={productDetails} />
            <Description product={productDetails} />
            <ProductInfo product={productDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePreview;