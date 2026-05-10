"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function TechCrosshair() {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  const verticalRef = useRef(null);
  const coordsRef = useRef(null);
  const intersectionRef = useRef(null);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (!pathname.includes("/engineering")) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lastX = mouseX;
    let lastY = mouseY;
    let velocity = 0;
    let frame = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateTicker = () => {
      frame++;
      
      // Calculate Velocity
      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const instantVelocity = Math.sqrt(dx * dx + dy * dy);
      
      // Smooth the velocity for cleaner graph lines
      velocity += (instantVelocity - velocity) * 0.1;
      
      lastX = mouseX;
      lastY = mouseY;
      
      // Update Graph Points based on Velocity
      if (frame % 2 === 0) {
        setPoints(prev => {
          // Base wave + velocity-driven amplitude + noise
          const amplitude = Math.min(velocity * 0.5, 15); // Cap amplitude
          const newPoint = (Math.sin(frame * 0.2) * (2 + amplitude)) + (Math.random() * 2);
          return [...prev, newPoint].slice(-20);
        });
      }

      // Sync positions with high precision using GSAP quickSetter for performance
      gsap.set(horizontalRef.current, { y: mouseY });
      gsap.set(verticalRef.current, { x: mouseX });
      gsap.set(intersectionRef.current, { x: mouseX, y: mouseY });
      gsap.set(coordsRef.current, { x: mouseX + 25, y: mouseY + 25 });

      if (coordsRef.current) {
        const xEl = coordsRef.current.querySelector('.x-val');
        const yEl = coordsRef.current.querySelector('.y-val');
        const velEl = coordsRef.current.querySelector('.vel-val');
        const ghzEl = coordsRef.current.querySelector('.ghz-val');
        
        if (xEl) xEl.innerText = Math.round(mouseX);
        if (yEl) yEl.innerText = Math.round(mouseY);
        if (velEl) velEl.innerText = velocity.toFixed(1);
        if (ghzEl) ghzEl.innerText = (1.4 + velocity/200).toFixed(2);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    // Also listen to scroll to force sync in some browser environments
    window.addEventListener("scroll", updateTicker, { passive: true });
    
    gsap.ticker.add(updateTicker);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", updateTicker);
      gsap.ticker.remove(updateTicker);
    };
  }, [pathname]);

  if (!pathname.includes("/engineering")) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block overflow-hidden">
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
        className="absolute top-0 left-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-full h-full border border-ln-accent opacity-20 rounded-full animate-ping" />
        <div className="absolute inset-0 border-[0.5px] border-ln-accent opacity-50 rounded-full scale-50" />
        <div className="absolute inset-0 border-t border-ln-accent rounded-full animate-spin" />
      </div>

      {/* Coords & Live Graph Label */}
      <div 
        ref={coordsRef}
        className="absolute top-0 left-0 flex flex-col gap-2 p-3 bg-ln-dark/95 backdrop-blur-md border border-white/10 shadow-2xl z-20 min-w-[160px]"
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
        <div className="w-full h-10 relative mt-1 overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path
              d={`M ${points.map((p, i) => `${(i / 19) * 100} ${10 + p}`).join(' L ')}`}
              fill="none"
              stroke="#CCFF00"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line x1="0" y1="10" x2="100" y2="10" stroke="white" strokeWidth="0.2" opacity="0.2" />
          </svg>
        </div>
        
        <div className="flex justify-between font-mono text-[6px] text-white/30 uppercase mt-1">
          <span><span className="vel-val">0.0</span> px/f</span>
          <span>Buffer: Active</span>
          <span><span className="ghz-val">1.40</span> Ghz</span>
        </div>
      </div>
    </div>
  );
}
