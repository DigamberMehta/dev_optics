import React, { useEffect, useState } from 'react';
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
  const [products, setProducts] = useState(); // Initialize as an empty array

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data); // Store data in state
        // console.log('Fetched products:', data);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  },[]); // Runs only once on mount

  return (
    <>
      <Navbar />
      <div className='mx-12 max-w[1800px] pt-[80px]'>
        <Carousel />
        <ShopByCategory products={products} /> {/* Pass products to ShopByCategory */}
        <PromotionCarousel />
        <FrequentlyBought products={products} /> {/* Pass products to FrequentlyBought */}
        <ShopByPrice products={products} /> {/* Pass products to ShopByPrice */}
        <NewArrivals products={products} /> {/* Pass products to NewArrivals */}
        <FrameShapeShop products={products} />
        <EyewearForEveryone products={products} />
        <Test />
      </div>
      <Footer />
    </>
  );
};

export default Home;