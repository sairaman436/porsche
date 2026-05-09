"use client";
import { useEffect, useRef, useState } from "react";

export default function ScrollStack({ cards }) {
  return (
    <div className="relative px-8 md:px-16 pb-64">
      {/* Continuous vertical blueprint line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/[0.08] z-0 hidden md:block" />
      
      <div className="max-w-6xl mx-auto relative">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`sticky flex ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            style={{ 
              top: `calc(10vh + ${idx * 32}px)`, 
              marginBottom: '30vh' 
            }}
          >
            {/* The Card */}
            <div 
              className="w-full md:w-[85%] bg-white/95 backdrop-blur-xl p-8 md:p-12 border border-black/10 shadow-[0_20px_80px_rgba(0,0,0,0.08)] flex flex-col md:flex-row gap-8 md:gap-16 items-start relative overflow-hidden group"
            >
              {/* Technical Grid inside card */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:20px_20px]" />
              
              {/* Neon accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-ln-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />
              
              {/* Large Bleeding Number */}
              <div className="absolute -bottom-10 -left-10 md:-left-16 pointer-events-none select-none opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-700">
                <span className="font-serif font-black italic text-[180px] md:text-[280px] leading-none text-ln-dark">{card.num}</span>
              </div>

              <div className="md:w-1/3 relative z-10">
                 <p className="font-sans font-black text-[10px] tracking-[0.5em] uppercase text-ln-accent mb-6 bg-ln-dark px-3 py-1 inline-block">System_{card.num}</p>
                 <div className="space-y-4">
                    <div className="border-l-2 border-ln-accent/30 pl-4">
                      <p className="font-mono text-[9px] uppercase text-ln-muted">Material_Spec</p>
                      <p className="font-mono text-xs font-bold text-ln-text uppercase">{idx % 2 === 0 ? 'T6-Aerospace Aluminum' : 'Pre-Preg Carbon Fiber'}</p>
                    </div>
                    <div className="border-l-2 border-ln-accent/30 pl-4">
                      <p className="font-mono text-[9px] uppercase text-ln-muted">Tolerance_Level</p>
                      <p className="font-mono text-xs font-bold text-ln-text uppercase">+/- 0.0001 mm</p>
                    </div>
                    <div className="border-l-2 border-ln-accent/30 pl-4">
                      <p className="font-mono text-[9px] uppercase text-ln-muted">Assembly_Unit</p>
                      <p className="font-mono text-xs font-bold text-ln-text uppercase">Stuttgart-Zuffenhausen</p>
                    </div>
                 </div>
              </div>

              <div className="md:w-2/3 relative z-10">
                 <div className="flex items-center gap-4 mb-4">
                    <span className="font-sans font-bold text-[10px] tracking-[0.3em] uppercase text-ln-muted">{card.tag}</span>
                    <div className="flex-1 h-[1px] bg-black/10" />
                 </div>
                 <h3 className="font-serif font-black italic text-4xl md:text-6xl uppercase text-ln-text mb-6 tracking-tighter leading-none">{card.title}</h3>
                 <p className="font-sans text-lg text-ln-muted leading-relaxed max-w-xl mb-8">{card.desc}</p>
                 
                 {/* Technical callout */}
                 <div className="inline-flex items-center gap-3 bg-ln-bg px-4 py-2 border border-black/5">
                    <div className="w-2 h-2 rounded-full bg-ln-accent animate-pulse" />
                    <span className="font-mono text-[10px] text-ln-dark font-bold uppercase tracking-widest">Active_Status: Operational</span>
                 </div>
              </div>

              {/* Connecting line to vertical rail */}
              <div className={`absolute top-1/2 w-32 h-[1px] bg-black/10 hidden md:block ${idx % 2 === 0 ? '-right-32' : '-left-32'}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
