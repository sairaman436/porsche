"use client";

export default function GlobalCurtain() {
  return (
    <div id="porsche-transition-curtain" className="fixed inset-0 z-[100] bg-white backdrop-blur-[100px] pointer-events-none flex items-center justify-center overflow-hidden origin-bottom">
      {/* Background scanline effect */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      
      <div id="porsche-transition-logo" className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Large Brutalist Background Type */}
        <div className="transition-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sans font-black uppercase text-[25vw] leading-none whitespace-nowrap opacity-[0.03] pointer-events-none select-none tracking-tighter">
          T-HYBRID
        </div>
        
        <div id="porsche-dynamic-word" className="flex gap-0 md:gap-3 relative z-10">
          {"PORSCHE".split("").map((char, i) => (
            <div key={i} className="overflow-hidden inline-flex">
              <span className="transition-letter font-sans font-black uppercase text-7xl md:text-[12rem] leading-none text-ln-dark tracking-tighter inline-block translate-y-0">
                {char}
              </span>
            </div>
          ))}
        </div>

        {/* Loading Progress System */}
        <div className="absolute bottom-32 w-full max-w-md px-12 z-20 transition-loader-ui">
          <div className="flex justify-between items-end mb-2">
            <div className="flex flex-col">
              <span className="font-mono text-[8px] uppercase text-ln-muted tracking-[0.3em] mb-1">System_Diagnostic</span>
              <span className="font-mono text-[10px] font-bold text-ln-dark uppercase flex gap-2 items-center">
                <span className="w-2 h-2 rounded-full bg-ln-accent animate-pulse" />
                Active_Link: Established
              </span>
            </div>
            <div className="flex flex-col text-right">
              <span className="font-mono text-[8px] uppercase text-ln-muted tracking-[0.3em] mb-1">Status</span>
              <span className="transition-percent font-mono text-2xl font-black italic text-ln-dark leading-none">00%</span>
            </div>
          </div>
          
          {/* Progress Bar Container */}
          <div className="h-[2px] w-full bg-ln-dark/10 relative overflow-hidden">
            <div className="transition-progress-bar absolute top-0 left-0 h-full w-full bg-ln-dark origin-left scale-x-0" />
          </div>
          
          <div className="flex justify-between mt-2 font-mono text-[7px] text-ln-muted uppercase tracking-widest">
            <span>Core_Sync: Stable</span>
            <span>Ref: 911-TH-2024</span>
          </div>
        </div>

        {/* Diagnostic Logs (Bottom Left) */}
        <div className="transition-micro absolute bottom-12 left-12 font-sans font-bold text-[9px] tracking-[0.4em] uppercase text-ln-dark/40 flex flex-col gap-2">
          <div className="flex items-center gap-4 border-l border-ln-accent/30 pl-4 py-1">
            <span className="w-1 h-1 bg-ln-accent" />
            <span>Power_Train: [ONLINE]</span>
          </div>
          <div className="flex items-center gap-4 border-l border-ln-accent/30 pl-4 py-1">
            <span className="w-1 h-1 bg-ln-accent" />
            <span>Aerodynamics: [CALIBRATED]</span>
          </div>
          <div className="flex items-center gap-4 border-l border-ln-accent/30 pl-4 py-1">
            <span className="w-1 h-1 bg-ln-accent" />
            <span className="destination-text">Destination: [INIT]</span>
          </div>
        </div>
        
        {/* Coordinates (Top Right) */}
        <div className="absolute top-12 right-12 font-mono text-[8px] text-ln-dark/30 flex flex-col items-end gap-1 uppercase tracking-widest">
          <span>Stuttgart, DE</span>
          <span>48.8351° N, 9.1501° E</span>
        </div>
      </div>
    </div>
  );
}
