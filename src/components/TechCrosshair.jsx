"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function TechCrosshair() {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  const verticalRef = useRef(null);
  const coordsRef = useRef(null);
  const [points, setPoints] = useState([]);

  const intersectionRef = useRef(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let frame = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      gsap.to(horizontalRef.current, {
        y: mouseY,
        duration: 0.1,
        ease: "power2.out"
      });
      
      gsap.to(verticalRef.current, {
        x: mouseX,
        duration: 0.1,
        ease: "power2.out"
      });
      
      gsap.to(intersectionRef.current, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power2.out"
      });

      gsap.to(coordsRef.current, {
        x: mouseX + 20,
        y: mouseY + 20,
        duration: 0.1,
        ease: "power2.out"
      });

      if (coordsRef.current) {
        coordsRef.current.querySelector('.x-val').innerText = mouseX.toFixed(0);
        coordsRef.current.querySelector('.y-val').innerText = mouseY.toFixed(0);
      }
    };

    const updateGraph = () => {
      frame++;
      if (frame % 2 === 0) { // Update frequency
        setPoints(prev => {
          const newPoint = (Math.sin(frame * 0.2) * 10) + (Math.random() * 5);
          const next = [...prev, newPoint].slice(-20); // Keep last 20 points
          return next;
        });
      }
      requestAnimationFrame(updateGraph);
    };

    window.addEventListener("mousemove", onMouseMove);
    const animId = requestAnimationFrame(updateGraph);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Horizontal Line */}
      <div 
        ref={horizontalRef} 
        className="absolute left-0 w-full h-[0.5px] bg-ln-accent opacity-30" 
        style={{ top: 0 }}
      />
      {/* Vertical Line */}
      <div 
        ref={verticalRef} 
        className="absolute top-0 w-[0.5px] h-full bg-ln-accent opacity-30" 
        style={{ left: 0 }}
      />

      {/* Target Intersection Point with Radar */}
      <div 
        ref={intersectionRef}
        className="absolute top-0 left-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div className="w-full h-full border border-ln-accent opacity-20 rounded-full animate-ping" />
        <div className="absolute inset-0 border-[0.5px] border-ln-accent opacity-50 rounded-full scale-50" />
        {/* Rotating Radar Sweep */}
        <div className="absolute inset-0 border-t border-ln-accent rounded-full animate-spin" />
      </div>

      {/* Coords & Live Graph Label */}
      <div 
        ref={coordsRef}
        className="absolute flex flex-col gap-2 p-3 bg-ln-dark/95 backdrop-blur-md border border-white/10 shadow-2xl z-20"
        style={{ mixBlendMode: 'normal' }}
      >
        <div className="flex justify-between items-center gap-6 border-b border-white/10 pb-2">
          <div className="flex flex-col">
            <span className="font-mono text-[7px] text-white/40 uppercase">Coordinate_System</span>
            <span className="font-mono text-[10px] text-ln-accent font-bold tracking-wider">
              X:<span className="x-val">0</span> Y:<span className="y-val">0</span>
            </span>
          </div>
          <div className="flex flex-col text-right">
            <span className="font-mono text-[7px] text-white/40 uppercase">Status</span>
            <span className="font-mono text-[8px] text-green-400 font-bold uppercase tracking-tighter animate-pulse">Scanning...</span>
          </div>
        </div>

        {/* Mini Live Graph */}
        <div className="w-32 h-10 relative mt-1">
          <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path
              d={`M ${points.map((p, i) => `${(i / 19) * 100} ${10 + p}`).join(' L ')}`}
              fill="none"
              stroke="#CCFF00"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="transition-all duration-100"
            />
            {/* Horizontal Baseline */}
            <line x1="0" y1="10" x2="100" y2="10" stroke="white" strokeWidth="0.2" opacity="0.2" />
          </svg>
          <div className="absolute -right-1 top-0 h-full w-[1px] bg-ln-accent opacity-20" />
        </div>
        
        <div className="flex justify-between font-mono text-[6px] text-white/30 uppercase mt-1">
          <span>0.00ms</span>
          <span>Buffer: Active</span>
          <span>1.4Ghz</span>
        </div>
      </div>

      {/* CSS variable sync for the intersection point marker if we wanted it separate, 
          but usually the crosshair intersection is enough. 
          I'll add a small circle at the intersection for clarity. */}
      <style jsx>{`
        div {
          --mouse-x: 0px;
          --mouse-y: 0px;
        }
      `}</style>
    </div>
  );
}
