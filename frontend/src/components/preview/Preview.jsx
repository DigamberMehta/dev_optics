import React, { useRef } from 'react'
import ImageContainer from './ImageContainer'
import DetailContainer from './DetailContainer'

const Preview = () => {
  const detailContainerRef = useRef(null)

  const handleGlobalScroll = (e) => {
    if (detailContainerRef.current) {
      // Prevent default scroll behavior
      e.preventDefault()
      
      // Calculate new scroll position
      const newScrollTop = detailContainerRef.current.scrollTop + e.deltaY
      
      // Apply boundaries
      const maxScroll = detailContainerRef.current.scrollHeight - 
                        detailContainerRef.current.clientHeight
      
      detailContainerRef.current.scrollTop = Math.max(0, Math.min(newScrollTop, maxScroll))
    }
  }

  return (
    <div 
      className='w-full h-screen overflow-hidden' 
      onWheel={handleGlobalScroll}
    >
      <div className="p-10 flex flex-col md:flex-row w-full h-full bg-slate-50">
        <div className="w-full md:w-[40%] h-full">
          <ImageContainer />
        </div>
        <div 
          ref={detailContainerRef}
          className="w-full md:w-[60%] h-full overflow-y-auto"
        >
          <DetailContainer />
        </div>
      </div>
    </div>  
  );
};

export default Preview