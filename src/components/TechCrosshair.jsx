"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TechCrosshair() {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  const verticalRef = useRef(null);
  const coordsRef = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      gsap.to(horizontalRef.current, {
        y: clientY,
        duration: 0.1,
        ease: "power2.out"
      });
      
      gsap.to(verticalRef.current, {
        x: clientX,
        duration: 0.1,
        ease: "power2.out"
      });
      
      gsap.to(coordsRef.current, {
        x: clientX + 20,
        y: clientY + 20,
        duration: 0.1,
        ease: "power2.out"
      });

      if (coordsRef.current) {
        coordsRef.current.innerText = `X:${clientX.toFixed(0)} Y:${clientY.toFixed(0)}`;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Horizontal Line */}
      <div 
        ref={horizontalRef} 
        className="absolute left-0 w-full h-[1px] bg-white opacity-40" 
        style={{ top: 0, mixBlendMode: 'difference' }}
      />
      {/* Vertical Line */}
      <div 
        ref={verticalRef} 
        className="absolute top-0 w-[1px] h-full bg-white opacity-40" 
        style={{ left: 0, mixBlendMode: 'difference' }}
      />
      {/* Coords Label */}
      <div 
        ref={coordsRef}
        className="absolute font-mono text-[9px] text-white uppercase tracking-[0.2em] bg-black/80 px-2 py-1 backdrop-blur-md border border-white/20 shadow-2xl"
        style={{ mixBlendMode: 'difference' }}
      >
        X:0 Y:0
      </div>
    </div>
  );
}
