import React from 'react'
import Maindetails from './MainDetails'
import { Frame } from 'lucide-react'
import FrameDimension from './FrameDimension'
import Description from './Description'
import ProductInfo from './ProductInfo'

const DetailContainer = () => {
  return (
    <div className='flex flex-col mx-6'>
      <Maindetails />
      <FrameDimension />
      <Description />
      <ProductInfo />

    </div>
  )
}

export default DetailContainer