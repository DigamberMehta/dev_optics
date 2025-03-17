import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

const Model = () => {
  const { scene } = useGLTF("/models/sku_231942.glb"); // Ensure correct model path

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set("#C0C0C0"); // Set to Silver
        child.material.metalness = 0.8; // Increase metallic effect
        child.material.roughness = 0.3; // Reduce roughness for a shinier look
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={5} />;
};

const ModelViewer = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center pt-[100px] mx-auto">
      <Canvas camera={{ position: [1, 1, 1], fov: 30 }}>
        {/* Improved Lighting Setup */}
        <ambientLight intensity={3} /> {/* Brighter ambient light for even coloring */}
        <directionalLight position={[5, 5, 5]} intensity={3} castShadow />
        <pointLight position={[-5, 5, 5]} intensity={2} />
        <spotLight position={[0, 10, 0]} angle={0.3} intensity={3} />

        <Model />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
