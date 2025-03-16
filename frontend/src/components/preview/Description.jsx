import React from 'react';

const Description = ({ product }) => {
  return (
    <div className='mt-6 text-sm shadow-md rounded-2xl bg-white p-6 flex flex-col'>
        <h3 className='mb-2 text-black font-semibold'>Description</h3>
        <p className='text-[#212529]'>
          {product && product.description ? product.description : 'No description available.'}
        </p>
    </div>
  );
};

export default Description;