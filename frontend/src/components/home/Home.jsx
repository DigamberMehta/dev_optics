
import React from 'react'
import { Shop } from '@mui/icons-material'
import Navbar from '../Navbar'
import Test from './Test'
import Footer from '../Footer'
import EyewearForEveryone from './EyewearForEveryone'
import FrameShapeShop from './FrameShapeShop'
import NewArrivals from './NewArrivals'
import ShopByPrice from './ShopByPrice'
import FrequentlyBought from './FrequentlyBought'
import PromotionCarousel from './PromotionCarousel'
import ShopByCategory from './ShopByCategory'
import Carousel from './Carousel'

const Home = () => {
  return (
    <>
   
      
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
    
    </>
  )
}

export default Home
