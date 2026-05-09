"use client";
import dynamic from "next/dynamic";

const ScrollReveal = dynamic(() => import("../../components/ScrollReveal"), { ssr: false });

const records = [
  { 
    title: "19 Le Mans Wins", 
    stat: "19", 
    desc: "From the 917K to the 919 Hybrid, Porsche is the most successful manufacturer in Le Mans history.",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a4/2016_Porsche_919_Hybrid_Le_Mans.jpg",
    meta: "SERIES: WEC // CHASSIS: 919_HYBRID // LOC: SARTHE"
  },
  { 
    title: "Nürburgring Kings", 
    stat: "6:43", 
    desc: "Porsche holds production car lap records at the Green Hell — the ultimate engineering laboratory.",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Porsche_911_991_GT2_RS_at_6_Hours_of_Nuerburgring_WEC_2017.jpg",
    meta: "SERIES: PRODUCTION // CHASSIS: 991_GT2_RS // LOC: EIFEL"
  },
  { 
    title: "Paris-Dakar Rally", 
    stat: "2x", 
    desc: "The 953 and 959 conquered the Sahara, proving the sports car transcends asphalt.",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/94/Porsche_959_Paris_Dakar_%283335774531%29.jpg",
    meta: "SERIES: RALLY_RAID // CHASSIS: 959_PS // LOC: SAHARA"
  },
  { 
    title: "Formula E", 
    stat: "EV", 
    desc: "The TAG Heuer Porsche Formula E Team refines the electric powertrains powering the Taycan.",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/37/Porsche_99X_Electric.jpg",
    meta: "SERIES: ABB_FE // CHASSIS: 99X_GEN3 // LOC: GLOBAL"
  },
  { 
    title: "IMSA & WEC", 
    stat: "963", 
    desc: "The 963 LMDh prototype competes simultaneously across the world's greatest endurance races.",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/16/Porsche_963_LMDh.jpg",
    meta: "SERIES: LMDH // CHASSIS: P_963 // LOC: DAYTONA"
  },
  { 
    title: "Total Victories", 
    stat: "30K+", 
    desc: "The most successful brand in motorsport history. Over 30,000 race victories across all categories.",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e0/3rd_placed_Porsche_911_GT1_drivers_Karl_Wendlinger%2C_Yannick_Dalmas_%26_Scott_Goodyear_on_the_podium_at_the_1996_Le_Mans_%2851702542698%29.jpg",
    meta: "SERIES: ALL // CHASSIS: MULTI // LOC: WORLDWIDE"
  },
];

export default function Achievements() {
  return (
    <section className="min-h-screen bg-ln-bg pt-32 pb-64 px-8 md:px-16 relative overflow-hidden">
      {/* Technical Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} 
      />

      {/* Massive Background Watermarks */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full text-center z-0 select-none pointer-events-none opacity-[0.03]">
        <h2 className="font-serif font-black italic text-[22vw] leading-none uppercase text-ln-text tracking-tighter">
          VICTORY
        </h2>
      </div>

      <div className="absolute top-1/3 left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.04] z-0">
        <div className="whitespace-nowrap animate-marquee flex">
          <span className="font-serif font-black italic text-[18vw] uppercase text-ln-text">ENDURANCE /// ENDURANCE /// ENDURANCE ///</span>
          <span className="font-serif font-black italic text-[18vw] uppercase text-ln-text">ENDURANCE /// ENDURANCE /// ENDURANCE ///</span>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="mb-32">
            <p className="font-sans font-black text-[10px] tracking-[0.5em] uppercase text-ln-accent mb-6 bg-ln-dark px-3 py-1 inline-block">Motorsport_Archive_v4.0</p>
            <h1 className="font-serif font-black italic text-[10vw] md:text-[8vw] leading-[0.8] uppercase text-ln-text tracking-tighter">
              BORN ON<br />
              <span className="text-ln-accent text-[12vw] md:text-[10vw]">THE TRACK.</span>
            </h1>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {records.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="group relative aspect-[4/5] overflow-hidden bg-ln-dark border border-white/10 shadow-2xl transition-all duration-700 hover:border-ln-accent">
                {/* Background Image with Cinematic Filter */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.title}
                    className="w-full h-full object-cover filter grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                </div>

                {/* Technical Overlay */}
                <div className="absolute inset-0 z-10 p-10 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="font-mono text-[9px] text-ln-accent tracking-widest uppercase">{item.meta}</p>
                      <h3 className="font-serif font-black italic text-4xl text-white uppercase tracking-tighter leading-none">{item.title}</h3>
                    </div>
                    <span className="font-serif font-black italic text-7xl text-white/10 group-hover:text-ln-accent/20 transition-colors duration-700">{idx + 1}</span>
                  </div>

                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                    <span className="font-serif font-black italic text-8xl md:text-9xl text-ln-accent leading-none block mb-6">{item.stat}</span>
                    <p className="font-sans text-sm text-white/60 leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      {item.desc}
                    </p>
                    <div className="mt-8 h-[1px] w-full bg-white/10 relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-ln-accent w-0 group-hover:w-full transition-all duration-1000 ease-out" />
                    </div>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-white/20 group-hover:border-ln-accent transition-colors duration-700" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-white/20 group-hover:border-ln-accent transition-colors duration-700" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
