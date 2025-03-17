import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

const Model = () => {
  const { scene } = useGLTF("/models/sku_151377.glb"); // Ensure correct path
  return <primitive object={scene} scale={5} />; // Increase scale to 5
};

const ModelViewer = () => {
  const controlsRef = useRef();
  const containerRef = useRef(null);
  const [canZoom, setCanZoom] = useState(true);
  const [zoomLimitHit, setZoomLimitHit] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!controlsRef.current) return;

      const orbitControls = controlsRef.current;
      const zoom = orbitControls.object.position.distanceTo(orbitControls.target);
      const isZoomedOut = zoom >= 5; // maxDistance
      const isZoomedIn = zoom <= 2; // minDistance

      if (isZoomedOut || isZoomedIn) {
        setCanZoom(false); // Disable zooming when at limits
        setZoomLimitHit(true); // Mark that zoom limit was hit
      }
    };

    const handleMouseLeave = () => {
      if (zoomLimitHit) {
        setCanZoom(true); // Re-enable zooming only if zoom limit was hit before leaving
        setZoomLimitHit(false); // Reset zoom limit hit flag
      }
    };

    window.addEventListener("wheel", handleScroll);
    if (containerRef.current) {
      containerRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("wheel", handleScroll);
      if (containerRef.current) {
        containerRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [zoomLimitHit]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen flex items-center justify-center bg-white pt-[100px] mx-auto"
    >
      <Canvas camera={{ position: [0, 2, 2], fov: 30 }}>
        <ambientLight intensity={2} /> {/* Brighter ambient light */}
        <directionalLight position={[5, 5, 5]} intensity={2} /> {/* Stronger directional light */}
        <Model />
        <OrbitControls
          ref={controlsRef}
          enableZoom={canZoom}
          minDistance={2} // Set the minimum distance (zoom in limit)
          maxDistance={5} // Set the maximum distance (zoom out limit)
        />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
