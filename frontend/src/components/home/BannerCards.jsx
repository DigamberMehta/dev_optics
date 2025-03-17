import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BannerCards = () => {
  const containerRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set initial positions off-screen
      gsap.set(leftCardRef.current, { x: "-100%" });
      gsap.set(rightCardRef.current, { x: "100%" });

      // Left card animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom", // When the top of the container hits the bottom of the viewport
        end: "bottom top", // When the bottom of the container hits the top of the viewport
        onEnter: () => {
          gsap.to(leftCardRef.current, { x: "0%", duration: 1, ease: "power3.out" });
        },
        onLeaveBack: () => {
          gsap.to(leftCardRef.current, { x: "-100%", duration: 1, ease: "power3.out" });
        },
      });

      // Right card animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom", // When the top of the container hits the bottom of the viewport
        end: "bottom top", // When the bottom of the container hits the top of the viewport
        onEnter: () => {
          gsap.to(rightCardRef.current, { x: "0%", duration: 1, ease: "power3.out" });
        },
        onLeaveBack: () => {
          gsap.to(rightCardRef.current, { x: "100%", duration: 1, ease: "power3.out" });
        },
      });

      // Cleanup ScrollTrigger instances
      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }
  }, []);

  return (
    <div className="flex flex-wrap justify-between" ref={containerRef}>
      <div
        ref={leftCardRef}
        className="w-[47%] p-6 flex flex-col items-center text-center bg-gray-100 h-[60vh] rounded-[40px]"
        style={{
          backgroundImage:
            "url('https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/sun-square.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "left",
        }}
      ></div>

      <div
        ref={rightCardRef}
        className="w-[47%] p-6 flex flex-col items-center text-center bg-gray-100 h-[60vh] rounded-[40px]"
        style={{
          backgroundImage:
            "url('https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/ce-square.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "left",
        }}
      ></div>
    </div>
  );
};

export default BannerCards;