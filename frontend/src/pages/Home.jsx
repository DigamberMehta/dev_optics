
import Navbar from '../components/Navbar'
import React from 'react'
import ProductCard from '@/components/ProductCard'
import Carousel from '@/components/home/carousel'
import { Shop } from '@mui/icons-material'
import ShopByCategory from '@/components/home/ShopByCategory'
import PromotionCarousel from '@/components/home/PromotionCarousel'
import FrequentlyBought from '@/components/home/FrequentlyBought'
import NewArrivals from '@/components/home/NewArrivals'
import FrameShapeShop from '@/components/home/FrameShapeShop'
import ShopByPrice from '@/components/home/ShopByPrice'
import EyewearForEveryone from '@/components/home/EyewearForEveryone'
import Footer from '@/components/Footer'
import Test from '@/components/home/Test'

const Home = () => {
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
  )
}

export default Home
