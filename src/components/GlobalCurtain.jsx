"use client";

export default function GlobalCurtain() {
  return (
    <div id="porsche-transition-curtain" className="fixed inset-0 z-[100] bg-ln-bg/60 backdrop-blur-[80px] border-t border-white/40 pointer-events-none flex items-center justify-center shadow-2xl overflow-hidden origin-bottom">
      <div id="porsche-transition-logo" className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="transition-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sans font-black uppercase text-[20vw] leading-none whitespace-nowrap opacity-5 pointer-events-none" style={{ WebkitTextStroke: "2px #000", color: "transparent" }}>
          PORSCHE
        </div>
        
        <div id="porsche-dynamic-word" className="flex gap-0 md:gap-2 relative z-10">
          {"PORSCHE".split("").map((char, i) => (
            <div key={i} className="overflow-hidden inline-flex">
              <span className="transition-letter font-sans font-black uppercase text-6xl md:text-[10rem] leading-none text-ln-dark tracking-tighter inline-block drop-shadow-xl translate-y-0">
                {char}
              </span>
            </div>
          ))}
        </div>

        <div className="transition-micro absolute bottom-12 left-12 font-sans font-bold text-[10px] tracking-[0.3em] uppercase text-ln-dark/60 flex flex-col gap-2">
          <span>SYSTEM ........... ONLINE</span>
          <span>TELEMETRY ........ CAPTURING</span>
          <span className="destination-text">DESTINATION ...... SYSTEM.BOOT</span>
        </div>
      </div>
    </div>
  );
}
