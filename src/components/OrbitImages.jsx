"use client";
import { useEffect, useRef } from "react";
import TransitionLink from "./TransitionLink";

export default function OrbitImages({ images = [], radius = 200, speed = 0.3 }) {
  const containerRef = useRef(null);
  const angleRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentSpeedRef = useRef(speed * 0.004);
  const targetSpeedRef = useRef(speed * 0.004);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = container.querySelectorAll(".orbit-item");
    const angleStep = (2 * Math.PI) / items.length;
    let animationId;

    const handleMouse = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left - rect.width / 2) * 0.02;
      mouseRef.current.y = (e.clientY - rect.top - rect.height / 2) * 0.02;
    };

    const handleMouseEnter = () => { targetSpeedRef.current = 0; };
    const handleMouseLeave = () => { targetSpeedRef.current = speed * 0.004; };

    container.addEventListener("mousemove", handleMouse);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      // Smoothly interpolate speed to target (0 on hover, normal speed otherwise)
      currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * 0.05;
      angleRef.current += currentSpeedRef.current;

      items.forEach((item, idx) => {
        const angle = angleRef.current + idx * angleStep;
        const x = Math.cos(angle) * radius + mouseRef.current.x;
        const y = Math.sin(angle) * radius * 0.3 + mouseRef.current.y;
        const depth = (Math.sin(angle) + 1) / 2;
        const scale = 0.7 + depth * 0.6;
        const blur = (1 - depth) * 3;
        const zIndex = Math.round(depth * 100);
        const opacity = 0.3 + depth * 0.7;

        item.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        item.style.zIndex = zIndex;
        item.style.opacity = opacity;
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mousemove", handleMouse);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [images.length, radius, speed]);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center" style={{ width: radius * 3, height: radius * 2.2 }}>
      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full bg-ln-accent/30 blur-[80px]" />

      {/* Center element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center select-none pointer-events-none -mt-20">
        <span className="font-sans font-black text-9xl md:text-[13rem] tracking-tighter leading-[0.8] text-ln-dark">911</span>
        <span className="font-sans font-bold text-sm tracking-[0.8em] uppercase text-ln-muted mt-2">T-Hybrid</span>
      </div>

      {images.map((img, idx) => (
        <TransitionLink
          key={idx}
          href={img.href || "#"}
          className="orbit-item absolute w-32 h-32 md:w-48 md:h-48 flex items-center justify-center overflow-hidden select-none cursor-pointer group will-change-transform"
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(0, 0, 0, 0.05)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            transition: "box-shadow 0.3s ease",
          }}
        >
          {img.image && (
            <img 
              src={img.image} 
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
              alt={img.label} 
            />
          )}
          
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-10 h-[3px] bg-ln-accent shadow-[0_0_10px_rgba(204,255,0,0.5)]" />
            <span className="font-sans font-black text-[10px] md:text-xs tracking-[0.25em] uppercase text-ln-dark text-center px-4 leading-relaxed bg-white/90 py-1 backdrop-blur-md">
              {img.label}
            </span>
            <div className="w-10 h-[3px] bg-ln-accent shadow-[0_0_10px_rgba(204,255,0,0.5)]" />
          </div>
        </TransitionLink>
      ))}
    </div>
  );
}
