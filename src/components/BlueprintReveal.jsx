'use client';

import { useEffect, useRef, useState } from 'react';

export default function BlueprintReveal({ 
  baseImage = "/assets/car_centered.png", 
  revealImage = "/assets/blueprint_internal.png",
  className = "",
  revealOffset = { x: 0, y: 0 },
  revealScale = 1
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
      className={`relative w-full aspect-[21/9] overflow-hidden cursor-none bg-ln-dark ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Image (Regular Car) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${baseImage})` }}
      />

      {/* Blueprint Layer (Internal Components) */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
        style={{ 
          backgroundImage: `url(${revealImage})`,
          backgroundPosition: `calc(50% + ${revealOffset.x}px) calc(50% + ${revealOffset.y}px)`,
          backgroundSize: `${100 * revealScale}%`,
          filter: 'brightness(1.4) contrast(1.2)',
          opacity: isHovered ? 1 : 0,
          maskImage: `radial-gradient(circle 180px at ${maskPos.x}% ${maskPos.y}%, black 20%, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(circle 180px at ${maskPos.x}% ${maskPos.y}%, black 20%, transparent 80%)`
        }}
      />

      {/* Grid Overlay for Blueprint feel */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: isHovered ? 0.2 : 0,
          maskImage: `radial-gradient(circle 180px at ${maskPos.x}% ${maskPos.y}%, black 20%, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(circle 180px at ${maskPos.x}% ${maskPos.y}%, black 20%, transparent 80%)`
        }}
      />

      {/* Instruction Overlay */}
      <div className={`absolute bottom-8 left-8 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <p className="text-white/40 font-mono text-[10px] tracking-[0.3em] uppercase">Move your light to reveal engineering</p>
      </div>

      {/* Flashlight Beam / Glow */}
      {isHovered && (
        <div 
          className="absolute pointer-events-none z-30 w-[360px] h-[360px] -translate-x-1/2 -translate-y-1/2"
          style={{ 
            left: `${maskPos.x}%`, 
            top: `${maskPos.y}%`,
            background: 'radial-gradient(circle, rgba(204,255,0,0.15) 0%, transparent 70%)',
            border: '1px solid rgba(204,255,0,0.1)',
            borderRadius: '50%',
            boxShadow: 'inset 0 0 50px rgba(204,255,0,0.1), 0 0 100px rgba(204,255,0,0.05)'
          }}
        />
      )}
    </div>
  );
}
