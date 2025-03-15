import React, { useEffect } from 'react';
import { Shop } from '@mui/icons-material';
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

const Home = () => {
  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace with your actual backend URL
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log('Fetched products:', data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <>
      <Navbar />
      <div className='mx-12 max-w[1800px] pt-[80px]'>
        <Carousel />
        <ShopByCategory />
        <PromotionCarousel />
        <FrequentlyBought />
        <ShopByPrice />
        <NewArrivals />
        <FrameShapeShop />
        <EyewearForEveryone />
        <Test />
      </div>
      <Footer />
    </>
  );
};

export default Home;