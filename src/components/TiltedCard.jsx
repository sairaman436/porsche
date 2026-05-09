"use client";
import { useRef, useCallback } from "react";

export default function TiltedCard({ children, className = "", tiltDeg = 10 }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -tiltDeg;
    const rotateY = ((x - centerX) / centerX) * tiltDeg;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    if (glow) {
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      glow.style.background = `radial-gradient(300px circle at ${px}% ${py}%, rgba(204,255,0,0.1), transparent 60%)`;
      glow.style.opacity = "1";
    }
  }, [tiltDeg]);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    if (glow) glow.style.opacity = "0";
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.2s ease-out", willChange: "transform" }}
    >
      <div ref={glowRef} className="absolute inset-0 pointer-events-none z-20 opacity-0" style={{ transition: "opacity 0.3s ease" }} />
      {children}
    </div>
  );
}
