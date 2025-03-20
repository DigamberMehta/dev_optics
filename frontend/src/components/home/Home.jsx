import React, { useState, useEffect } from 'react';
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
import useModelViewerScale from '../../utils/useModelViewerScale';
import BannerCards from './BannerCards';
import Banner from '../banners/Banner';

const Home = () => {
  const [products, setProducts] = useState();
  const { modelViewerWidths, modelViewerRefs } = useModelViewerScale(2); // Now supports 2 ModelViewers

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
  }, []);

  return (
    <>
      <Navbar />
      <div className="mx-12 max-w-[1800px] pt-[80px]">
        <Carousel />
        <ShopByCategory products={products} />
        <PromotionCarousel />

        {/* First Model Viewer */}
        <div ref={modelViewerRefs.current[0]}>
          <ModelViewer
            modelFile="/models/sku_231942.glb"
            color="#C0C0C0"
            width={modelViewerWidths[0]}
          />
        </div>

        <FrequentlyBought products={products} />

        <Banner img={'https://static5.lenskart.com/media/uploads/hustlr-desktop-30-colors-gif.gif'}/>
        <NewArrivals products={products} />
        <ShopByPrice products={products} />
        {/* Second Model Viewer */}
        <div ref={modelViewerRefs.current[1]}>
          <ModelViewer
            modelFile="/models/sku_207481.glb"
            color="#c3d7ee"
            width={modelViewerWidths[1]}
          />
        </div>
       
        <Banner img={' https://static1.lenskart.com/media/desktop/img/Dec22/desk-hust.gif'}/>
        <BannerCards />
        <FrameShapeShop products={products} />
      

        <EyewearForEveryone products={products} />
        <Test />
      </div>
      
    </>
  );
};

export default Home;
