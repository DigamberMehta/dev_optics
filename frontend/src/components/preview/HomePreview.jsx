import React, { useRef } from "react";
import ImageContainer from "./ImageContainer";
import Maindetails from "./MainDetails";
import { Frame } from "lucide-react";
import FrameDimension from "./FrameDimension";
import Description from "./Description";
import ProductInfo from "./ProductInfo";

const HomePreview = () => {
  const detailContainerRef = useRef(null);

  const handleGlobalScroll = (e) => {
    if (detailContainerRef.current) {
      // Prevent default scroll behavior
      e.preventDefault();

      // Calculate new scroll position
      const newScrollTop = detailContainerRef.current.scrollTop + e.deltaY;

      // Apply boundaries
      const maxScroll =
        detailContainerRef.current.scrollHeight -
        detailContainerRef.current.clientHeight;

      detailContainerRef.current.scrollTop = Math.max(
        0,
        Math.min(newScrollTop, maxScroll)
      );
    }
  };

  return (
    <div
      className="w-full h-screen overflow-hidden pt-[120px]"
      onWheel={handleGlobalScroll}
    >
      <div className="p-10 flex flex-col md:flex-row w-full h-full bg-slate-50">
        <div className="w-full md:w-[40%] h-full">
          <ImageContainer />
        </div>
        <div
          ref={detailContainerRef}
          className="w-full md:w-[60%] h-full overflow-y-auto hide-scrollbar"
        >
          <div className="flex flex-col mx-6">
            <Maindetails />
            <FrameDimension />
            <Description />
            <ProductInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePreview;
