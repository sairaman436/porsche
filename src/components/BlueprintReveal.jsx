'use client';

import { useEffect, useRef, useState } from 'react';

export default function BlueprintReveal({ 
  baseImage = "/assets/car.png", 
  revealImage = "/assets/blueprint.png",
  className = "" 
}) {
  const containerRef = useRef(null);
  const [maskPos, setMaskPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMaskPos({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full aspect-[21/9] overflow-hidden cursor-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Image (Regular Car) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${baseImage})` }}
      />

      {/* Reveal Image (Blueprint) */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
        style={{ 
          backgroundImage: `url(${revealImage})`,
          clipPath: isHovered 
            ? `circle(150px at ${maskPos.x}% ${maskPos.y}%)` 
            : `circle(0px at 50% 50%)`,
          WebkitClipPath: isHovered 
            ? `circle(150px at ${maskPos.x}% ${maskPos.y}%)` 
            : `circle(0px at 50% 50%)`
        }}
      />

      {/* Instruction Overlay */}
      <div className={`absolute bottom-8 left-8 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <p className="text-white/40 font-mono text-[10px] tracking-[0.3em] uppercase">Hover to reveal engineering blueprint</p>
      </div>

      {/* Spotlight Border (Optional) */}
      {isHovered && (
        <div 
          className="absolute pointer-events-none border border-ln-accent/30 rounded-full w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 z-30"
          style={{ 
            left: `${maskPos.x}%`, 
            top: `${maskPos.y}%`,
            boxShadow: '0 0 50px rgba(204,255,0,0.2)'
          }}
        />
      )}
    </div>
  );
}
