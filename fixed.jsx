import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Navbar';
import Test from './Test';
import Footer from '../Footer';
import EyewearForEveryone from './EyewearForEveryone';
import FrameShapeShop from './FrameShapeShop';
import NewArrivals from './NewArrivals';
import ShopByPrice from './ShopByPrice';
import FrequentlyBought from './FrequentlyBought';
import PromotionCarousel from './PromotionCarousel';
import ShopByCategory from './ShopByCategory';
import Carousel from './Carousel';
import ModelViewer from '@/pages/ModelViewer.jsx';

const Home = () => {
  const [products, setProducts] = useState();
  const [modelViewerWidth, setModelViewerWidth] = useState(80);
  const modelViewerRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        console.log('Fetched products:', data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  },);

  useEffect(() => {
    const handleScroll = () => {
      if (modelViewerRef.current) {
        const modelViewerElement = modelViewerRef.current;
        const rect = modelViewerElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate the center of the viewport
        const viewportCenter = windowHeight / 2;

        // Calculate the distance of the ModelViewer's center from the viewport center
        const modelViewerCenterY = rect.top + rect.height / 2;
        const distanceToCenter = Math.abs(modelViewerCenterY - viewportCenter);

        // Define the range where scaling should happen (e.g., when the top of the div is within the bottom half of the screen and the bottom is within the top half)
        const isVisible = rect.top < windowHeight && rect.bottom > 0;

        if (isVisible) {
          // Normalize the distance to the center (0 when centered, increases as it moves away)
          const normalizedDistance = Math.max(0, 1 - (distanceToCenter / (windowHeight / 2)));

          // Calculate the width based on the normalized distance
          const minWidth = 80;
          const maxWidth = 100;
          const newWidth = minWidth + (maxWidth - minWidth) * normalizedDistance;

          setModelViewerWidth(newWidth);
        } else if (modelViewerWidth !== 80) {
          // If not visible, reset to the original width
          setModelViewerWidth(80);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [modelViewerWidth]);

  return (
    <>
      <Navbar />
      <div className='mx-12 max-w-[1800px] pt-[80px]'>
        <Carousel />
        <ShopByCategory products={products} />
        <PromotionCarousel />
        <div ref={modelViewerRef}>
          <ModelViewer width={modelViewerWidth} />
        </div>
        <FrequentlyBought products={products} />
        <ShopByPrice products={products} />
        <NewArrivals products={products} />
        <FrameShapeShop products={products} />
        <EyewearForEveryone products={products} />
        <Test />
      </div>
      <Footer />
    </>
  );
};

export default Home;