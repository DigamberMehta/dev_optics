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
      gsap.set(leftCardRef.current, { x: "-120%", opacity: 0 });
      gsap.set(rightCardRef.current, { x: "120%", opacity: 0 });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%", // Start animation when 80% of the container is visible
        end: "bottom 23%", // Exit animation when 20% of it is visible
        onEnter: () => {
          gsap.to(leftCardRef.current, { x: "0%", opacity: 1, duration: 1, ease: "power3.out" });
          gsap.to(rightCardRef.current, { x: "0%", opacity: 1, duration: 1, ease: "power3.out" });
        },
        onLeave: () => {
          gsap.to(leftCardRef.current, { x: "-120%", opacity: 0, duration: 1, ease: "power3.out" });
          gsap.to(rightCardRef.current, { x: "120%", opacity: 0, duration: 1, ease: "power3.out" });
        },
        onEnterBack: () => {
          gsap.to(leftCardRef.current, { x: "0%", opacity: 1, duration: 1, ease: "power3.out" });
          gsap.to(rightCardRef.current, { x: "0%", opacity: 1, duration: 1, ease: "power3.out" });
        },
        onLeaveBack: () => {
          gsap.to(leftCardRef.current, { x: "-120%", opacity: 0, duration: 1, ease: "power3.out" });
          gsap.to(rightCardRef.current, { x: "120%", opacity: 0, duration: 1, ease: "power3.out" });
        },
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }
  }, []);

  return (
    <div className="relative flex flex-wrap justify-between overflow-hidden p-3 md:p-0" ref={containerRef}>
      <div className="relative w-[47%] h-[30vh] md:h-[60vh] overflow-hidden">
        <div
          ref={leftCardRef}
          className="absolute w-full h-full p-6 flex flex-col items-center text-center bg-gray-100 rounded-[20px] md:rounded-[40px]"
          style={{
            backgroundImage:
              "url('https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/sun-square.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        ></div>
      </div>

      <div className="relative w-[47%] h-[30vh] md:h-[60vh] overflow-hidden">
        <div
          ref={rightCardRef}
          className="absolute w-full h-full p-6 flex flex-col items-center text-center bg-gray-100 rounded-[20px] md:rounded-[40px]"
          style={{
            backgroundImage:
              "url('https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/ce-square.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        ></div>
      </div>
    </div>
  );
};

export default BannerCards;
