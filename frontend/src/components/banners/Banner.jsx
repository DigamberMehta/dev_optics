import React from 'react'

const Banner = ({img}) => {
  return (
    <div>
        <img src={img} alt=""  className='rounded-[20px] mb-10 mt-20'/>
    </div>
  )
}

export default Banner