import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Model = ({ modelFile, color }) => {
  const { scene } = useGLTF(modelFile);
  const modelRef = useRef();
  const [rotationSpeed, setRotationSpeed] = useState(0.01); // Adjust for desired speed

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(color);
        child.material.metalness = 0.8;
        child.material.roughness = 0.3;
      }
    });
  }, [scene, color]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += rotationSpeed;
    }
  });

  return <primitive object={scene} scale={5} ref={modelRef} />;
};

const ModelViewer = ({ modelFile = "/models/default.glb", color = "#C0C0C0", width }) => {
  const fixedHeight = "600px";
  const fixedAspectRatio = 16 / 9;
  const calculatedFixedWidth = `${parseFloat(fixedHeight) * fixedAspectRatio}px`;

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className=" font-[900] text-3xl text-[#4eabc6]">TRY OUR NEW PRODUCT</h1>

    <div
      className="flex items-center justify-center bg-black mx-auto my-10 rounded-[40px]"
      style={{ width: `${width}%` }}
    >
      
      <div style={{ height: fixedHeight, width: calculatedFixedWidth }}>
        <Canvas camera={{ position: [1, 1, 1], fov: 20 }}>
          <ambientLight intensity={3} />
          <directionalLight position={[5, 5, 5]} intensity={3} castShadow />
          <pointLight position={[-5, 5, 5]} intensity={2} />
          <spotLight position={[0, 10, 0]} angle={0.3} intensity={3} />

          <Model modelFile={modelFile} color={color} />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </div>
    </div>
  );
};

export default ModelViewer;
