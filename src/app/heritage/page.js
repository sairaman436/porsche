"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ScrollReveal = dynamic(() => import("../../components/ScrollReveal"), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const events = [
  { 
    year: "1931", 
    title: "The Foundation", 
    desc: "Ferdinand Porsche founds the engineering office in Stuttgart. The legend begins.",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Porsche-Automarken-Logo.jpg",
    meta: "ERA: PRE-WAR // LOC: STUTTGART // ID: P-00"
  },
  { 
    year: "1948", 
    title: "Number One", 
    desc: "Ferry Porsche builds the 356 'No. 1' Roadster. The dream of the perfect sports car becomes real.",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Porsche_356_No._1_Roadster_IMG_0814.jpg",
    meta: "ERA: POST-WAR // LOC: GMÜND // ID: 356-01"
  },
  { 
    year: "1963", 
    title: "The Icon", 
    desc: "The 901 is unveiled. Later renamed the 911, its silhouette becomes eternal.",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Porsche_901_prototype_at_Pebble_Beach_Concours_2023.jpg",
    meta: "ERA: CLASSIC // LOC: ZUFFENHAUSEN // ID: 911-00"
  },
  { 
    year: "1974", 
    title: "Turbo Revolution", 
    desc: "The 911 Turbo arrives. Turbocharging enters the mainstream with devastating performance.",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/67/Porsche_911_1974_Turbo_Nr.1_LSideFront_PorscheM_9June2013_%2814989610066%29.jpg",
    meta: "ERA: FORCED_INDUCTION // LOC: GERMANY // ID: 930-TURBO"
  },
  { 
    year: "1996", 
    title: "The Saviour", 
    desc: "The Boxster debuts. A mid-engine return to Porsche's roots that secures the company's future.",
    img: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Stuttgart_Jul_2012_54_%28Porsche_Museum_-_1996_Porsche_Boxster%29.JPG",
    meta: "ERA: MODERN_CLASSIC // LOC: FINLAND // ID: 986-BOXSTER"
  },
  { 
    year: "2002", 
    title: "Rule Breaker", 
    desc: "The Cayenne launches. A high-performance SUV that shatters every expectation.",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Porsche_Cayenne_S_%28955%29_Washington_DC_Metro_Area%2C_USA.jpg",
    meta: "ERA: SUV_EXPANSION // LOC: LEIPZIG // ID: 955-CAYENNE"
  },
  { 
    year: "2015", 
    title: "Electric Vision", 
    desc: "The Mission E concept is revealed, signaling an uncompromising commitment to the electric future.",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/52/Porsche_Mission_E%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3885%29.jpg",
    meta: "ERA: E-MOBILITY // LOC: IAA // ID: MISSION-E"
  },
  { 
    year: "2024", 
    title: "The Hybrid Era", 
    desc: "The 911 T-Hybrid launches. Zero turbo lag, devastating torque, pure soul.",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/8c/2024_Porsche_911_992_Carrera_GTS_%2824306%29.jpg",
    meta: "ERA: HYBRID_PERFORMANCE // LOC: GLOBAL // ID: 992-GTS"
  },
];

export default function Heritage() {
  return (
    <section className="min-h-screen bg-ln-bg relative overflow-hidden">
      {/* Background Precision Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} 
      />

      {/* Massive Background Watermarks */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-full text-center z-0 select-none pointer-events-none opacity-[0.03]">
        <h2 className="font-serif font-black italic text-[25vw] leading-none uppercase text-ln-text tracking-tighter">
          HERITAGE
        </h2>
      </div>

      <div className="absolute top-[50%] -left-[5%] opacity-[0.02] font-serif font-black italic text-[15vw] uppercase text-ln-text z-0 select-none pointer-events-none [writing-mode:vertical-rl] rotate-180">
        TIMELESS_DESIGN
      </div>

      <div className="absolute bottom-[5%] -right-[5%] opacity-[0.02] font-serif font-black italic text-[15vw] uppercase text-ln-text z-0 select-none pointer-events-none">
        LEGACY
      </div>

      <div className="max-w-screen-2xl mx-auto px-8 md:px-16 pt-48 pb-32 relative z-10">
        <ScrollReveal>
          <div className="mb-32">
            <p className="font-sans font-black text-[10px] tracking-[0.5em] uppercase text-ln-accent mb-6 bg-ln-dark px-3 py-1 inline-block">1931 — 2024</p>
            <h1 className="font-serif font-black italic text-[12vw] md:text-[10vw] leading-[0.8] uppercase text-ln-text tracking-tighter">
              BORN IN<br />
              <span className="text-ln-accent">STUTTGART.</span>
            </h1>
            <p className="font-sans text-lg text-ln-muted mt-12 max-w-xl leading-relaxed">
              Every Porsche carries the DNA of the original dream. A story of obsession, precision, and the relentless pursuit of performance.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline Rail */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/10 hidden md:block" />
          
          <div className="flex flex-col gap-64">
            {events.map((event, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row gap-16 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Year Watermark that overlaps */}
                <div className={`absolute -top-16 opacity-[0.08] pointer-events-none select-none z-0 ${idx % 2 === 0 ? '-left-8 md:-left-16' : '-right-8 md:-right-16'}`}>
                   <span className="font-serif font-black italic text-[150px] md:text-[250px] leading-none text-ln-dark">{event.year}</span>
                </div>

                {/* Content Section */}
                <div className="md:w-1/2 relative z-10">
                  <ScrollReveal delay={0.1}>
                    <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 border border-black/5 shadow-2xl relative group">
                      <div className="absolute top-0 left-0 w-full h-1 bg-ln-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />
                      
                      <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-ln-accent mb-4">{event.meta}</p>
                      <h3 className="font-serif font-black italic text-4xl md:text-5xl uppercase text-ln-text mb-6 leading-none tracking-tighter">{event.title}</h3>
                      <p className="font-sans text-lg text-ln-muted leading-relaxed mb-8">{event.desc}</p>
                      
                      <div className="h-[1px] w-full bg-black/5 mb-6" />
                      
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[10px] font-bold text-ln-dark">
                          {event.year.slice(2)}
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-ln-muted">Status: Historical_Archive</span>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Image Section */}
                <div className="md:w-1/2 relative z-10">
                  <ScrollReveal delay={0.2}>
                    <div className="relative group overflow-hidden border border-black/10 p-2 bg-white shadow-xl rotate-1 group-hover:rotate-0 transition-transform duration-700">
                      <div className="absolute inset-0 bg-ln-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                      <img 
                        src={event.img} 
                        alt={event.title}
                        className="w-full aspect-[4/3] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                      {/* Technical overlay */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-between items-end">
                         <span className="font-mono text-[8px] text-white bg-black px-2 py-1 uppercase tracking-widest">IMG_REF: {event.year}_ARCHIVE</span>
                         <div className="w-8 h-8 border-r-2 border-b-2 border-white" />
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Connecting Line to Rail */}
                <div className={`absolute top-1/2 w-16 h-[1px] bg-black/10 hidden md:block ${idx % 2 === 0 ? 'right-1/2' : 'left-1/2'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
