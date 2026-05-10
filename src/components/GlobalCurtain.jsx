"use client";

export default function GlobalCurtain() {
  const bubbles = Array.from({ length: 15 });

  return (
    <div id="porsche-transition-curtain" className="fixed inset-0 z-[100] bg-white pointer-events-none flex items-center justify-center overflow-hidden origin-bottom">
      {/* Liquid Bubble Layer */}
      <div className="absolute inset-0 z-0" style={{ filter: "url(#goo)" }}>
        {bubbles.map((_, i) => (
          <div 
            key={i} 
            className="transition-bubble absolute bottom-[-150px] bg-ln-dark rounded-full opacity-0"
            style={{ 
              width: `${Math.random() * 300 + 100}px`, 
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
        {/* Fill layer that rises to cover everything */}
        <div className="transition-bubble-fill absolute bottom-0 left-0 w-full h-full bg-ln-dark translate-y-full" />
      </div>

      {/* SVG Gooey Filter */}
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15" result="goo" />
          </filter>
        </defs>
      </svg>

      <div id="porsche-transition-logo" className="relative w-full h-full flex flex-col items-center justify-center z-10">
        {/* Large Brutalist Background Type */}
        <div className="transition-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sans font-black uppercase text-[25vw] leading-none whitespace-nowrap opacity-[0.03] pointer-events-none select-none tracking-tighter">
          T-HYBRID
        </div>
        
        <div id="porsche-dynamic-word" className="flex gap-0 md:gap-3 relative z-10">
          {"PORSCHE".split("").map((char, i) => (
            <div key={i} className="overflow-hidden inline-flex">
              <span className="transition-letter font-sans font-black uppercase text-7xl md:text-[12rem] leading-none text-white tracking-tighter inline-block translate-y-0">
                {char}
              </span>
            </div>
          ))}
        </div>

        {/* Loading Progress System */}
        <div className="absolute bottom-32 w-full max-w-md px-12 z-20 transition-loader-ui">
          <div className="flex justify-between items-end mb-2">
            <div className="flex flex-col">
              <span className="font-mono text-[8px] uppercase text-white/40 tracking-[0.3em] mb-1">System_Diagnostic</span>
              <span className="font-mono text-[10px] font-bold text-white uppercase flex gap-2 items-center">
                <span className="w-2 h-2 rounded-full bg-ln-accent animate-pulse" />
                Active_Link: Established
              </span>
            </div>
            <div className="flex flex-col text-right">
              <span className="font-mono text-[8px] uppercase text-white/40 tracking-[0.3em] mb-1">Status</span>
              <span className="transition-percent font-mono text-2xl font-black italic text-white leading-none">00%</span>
            </div>
          </div>
          
          {/* Progress Bar Container */}
          <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
            <div className="transition-progress-bar absolute top-0 left-0 h-full w-full bg-ln-accent origin-left scale-x-0" />
          </div>
        </div>

        {/* Diagnostic Logs (Bottom Left) */}
        <div className="transition-micro absolute bottom-12 left-12 font-sans font-bold text-[9px] tracking-[0.4em] uppercase text-white/40 flex flex-col gap-2">
          <div className="flex items-center gap-4 border-l border-ln-accent/30 pl-4 py-1">
            <span className="w-1 h-1 bg-ln-accent" />
            <span>Power_Train: [ONLINE]</span>
          </div>
          <div className="flex items-center gap-4 border-l border-ln-accent/30 pl-4 py-1">
            <span className="w-1 h-1 bg-ln-accent" />
            <span className="destination-text">Destination: [INIT]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
