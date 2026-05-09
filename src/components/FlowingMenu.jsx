"use client";
import { useState, useRef, useCallback } from "react";
import TransitionLink from "./TransitionLink";

export default function FlowingMenu({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setImgPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div ref={containerRef} className="relative" onMouseMove={handleMouseMove}>
      {items.map((item, idx) => (
        <TransitionLink
          key={idx}
          href={item.href}
          className="group block border-b border-ln-border relative overflow-hidden"
          onMouseEnter={() => setActiveIndex(idx)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {/* Full green sweep background */}
          <div className="absolute inset-0 bg-ln-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-0" />

          <div className="flex justify-between items-center relative z-10 py-7 md:py-9 px-6">
            <div className="flex items-center gap-6">
              <span className="font-sans font-bold text-[11px] text-ln-muted group-hover:text-ln-dark/50 transition-colors duration-300">0{idx + 1}</span>
              <h3 className="font-serif font-black italic text-4xl md:text-6xl uppercase text-ln-text group-hover:text-ln-dark transition-all duration-300 group-hover:translate-x-3">
                {item.label}
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-sans font-bold text-[10px] tracking-[0.2em] uppercase text-ln-muted group-hover:text-ln-dark/60 transition-colors duration-300">
                {item.tag}
              </span>
              {/* Arrow */}
              <div className="w-10 h-10 border border-ln-border group-hover:border-ln-dark/20 group-hover:bg-ln-dark flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-400">
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className="text-white">
                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
          </div>
        </TransitionLink>
      ))}
    </div>
  );
}
