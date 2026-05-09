"use client";
import { useRef, useCallback } from "react";

export default function FluidGlass({ children, className = "" }) {
  const glassRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = glassRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--gx", `${x}%`);
    el.style.setProperty("--gy", `${y}%`);
    el.querySelector(".fluid-glow").style.opacity = "1";
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = glassRef.current;
    if (!el) return;
    el.querySelector(".fluid-glow").style.opacity = "0";
  }, []);

  return (
    <div
      ref={glassRef}
      className={`relative overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.04)",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      <div
        className="fluid-glow absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(350px circle at var(--gx, 50%) var(--gy, 50%), rgba(204,255,0,0.15), transparent 60%)",
          opacity: 0,
          transition: "opacity 0.4s ease",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
