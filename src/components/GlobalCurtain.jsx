"use client";

export default function GlobalCurtain() {
  const bubbles = Array.from({ length: 12 });

  return (
    <div id="porsche-transition-curtain" className="fixed inset-0 z-[9999] bg-black pointer-events-none flex items-center justify-center overflow-hidden origin-bottom">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 z-[50] opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Technical Scanlines */}
      <div className="absolute inset-0 z-[40] opacity-[0.1] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

      {/* Liquid Bubble Layer */}
      <div className="absolute inset-0 z-0" style={{ filter: "url(#goo)" }}>
        {bubbles.map((_, i) => (
          <div 
            key={i} 
            className="transition-bubble absolute bottom-[-250px] bg-ln-dark rounded-full opacity-0 will-change-transform"
            style={{ 
              width: `${Math.random() * 400 + 200}px`, 
              height: `${Math.random() * 400 + 200}px`,
              left: `${Math.random() * 110 - 5}%`,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              WebkitFontSmoothing: "antialiased"
            }}
          />
        ))}
        {/* Fill layer that rises to cover everything - now with more organic shape */}
        <div className="transition-bubble-fill absolute bottom-[-100px] left-[-10%] w-[120%] h-[120%] bg-ln-dark translate-y-full rounded-[40%] will-change-transform" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }} />
      </div>

      {/* SVG Gooey Filter - Enhanced for better merging */}
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
          </filter>
        </defs>
      </svg>

      <div id="porsche-transition-logo" className="absolute inset-0 flex flex-col items-center justify-center z-[110]">
        {/* Large Brutalist Background Type */}
        <div className="transition-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sans font-black uppercase text-[35vw] leading-none whitespace-nowrap opacity-[0.15] text-white pointer-events-none select-none tracking-tighter transition-all duration-700">
          T-HYBRID
        </div>
        
        <div id="porsche-dynamic-word" className="flex gap-0 md:gap-3 relative z-[120]">
          {"PORSCHE".split("").map((char, i) => (
            <div key={i} className="overflow-hidden inline-flex">
              <span className="transition-letter font-sans font-black uppercase text-7xl md:text-[13rem] leading-none text-[#999999] tracking-tighter inline-block translate-y-0 opacity-100" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                {char}
              </span>
            </div>
          ))}
        </div>

        {/* Loading Progress System - Enhanced UI */}
        <div className="absolute bottom-24 w-full max-w-2xl px-12 z-[130] transition-loader-ui">
          <div className="flex justify-between items-end mb-4">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] font-bold uppercase text-white tracking-[0.4em] opacity-80">System_Diagnostic_v4.2.0</span>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-ln-accent animate-pulse shadow-[0_0_15px_rgba(204,255,0,0.8)]" />
                <span className="font-mono text-[13px] font-black text-white uppercase tracking-wider">
                  Kernel: Stable // IO_Bus: 12.8 GB/s
                </span>
              </div>
            </div>
            <div className="flex flex-col text-right">
              <span className="font-mono text-[10px] uppercase text-white opacity-80 tracking-[0.4em]">Load_Factor</span>
              <span className="transition-percent font-mono text-5xl font-black italic text-white leading-none tracking-tighter">00%</span>
            </div>
          </div>
          
          <div className="h-[2px] w-full bg-white/20 relative overflow-hidden">
            <div className="transition-progress-bar absolute top-0 left-0 h-full w-full bg-ln-accent origin-left scale-x-0" />
          </div>
          
          <div className="flex justify-between mt-3 font-mono text-[9px] font-bold uppercase tracking-[0.3em] opacity-50 text-white">
            <span>Core_01: Active</span>
            <span>Mem_Check: Success</span>
            <span>Auth: Verified</span>
          </div>
        </div>

        {/* Diagnostic Logs (Bottom Left) */}
        <div className="transition-micro absolute bottom-12 left-12 font-sans font-bold text-[10px] tracking-[0.5em] uppercase text-white/80 flex flex-col gap-4 z-[130]">
          <div className="flex flex-col border-l-4 border-ln-accent pl-8 py-1 gap-1">
            <span className="text-[8px] opacity-60">Subsystem_Alpha</span>
            <span className="text-white text-xs">Power_Train: [ONLINE]</span>
          </div>
          <div className="flex flex-col border-l-4 border-white/20 pl-8 py-1 gap-1">
            <span className="text-[8px] opacity-60">Link_Establishment</span>
            <span className="destination-text text-white text-xs">Destination: [INIT]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
