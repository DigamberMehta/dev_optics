import React , { useEffect, useState, useRef } from 'react';

const useModelViewerScale = (count = 1) => {
  const [modelViewerWidths, setModelViewerWidths] = useState(Array(count).fill(80));
  const modelViewerRefs = useRef([]);

  useEffect(() => {
    if (modelViewerRefs.current.length !== count) {
      modelViewerRefs.current = Array(count).fill().map((_, i) => modelViewerRefs.current[i] || React.createRef());
    }

    const handleScroll = () => {
      setModelViewerWidths((prevWidths) => {
        return modelViewerRefs.current.map((ref, index) => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const viewportCenter = windowHeight / 2;
            const modelViewerCenterY = rect.top + rect.height / 2;
            const distanceToCenter = Math.abs(modelViewerCenterY - viewportCenter);
            const isVisible = rect.top < windowHeight && rect.bottom > 0;

            if (isVisible) {
              const normalizedDistance = Math.max(0, 1 - (distanceToCenter / (windowHeight / 2)));
              const minWidth = 80;
              const maxWidth = 100;
              return minWidth + (maxWidth - minWidth) * normalizedDistance;
            }
          }
          return prevWidths[index]; // Keep previous state if not visible
        });
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [count]); // Depend on count to reinitialize refs if needed

  return { modelViewerWidths, modelViewerRefs };
};

export default useModelViewerScale;
