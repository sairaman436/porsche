"use client";

import dynamic from "next/dynamic";

const TiltedCard = dynamic(() => import("../../components/TiltedCard"), { ssr: false });
const ScrollReveal = dynamic(() => import("../../components/ScrollReveal"), { ssr: false });

const models = [
  { name: "911 GT3 RS", subtitle: "The Track King", desc: "Born for the circuit. Massive downforce and a screaming 4.0L naturally aspirated engine.", spec: "525 HP — 0-100 in 3.2s", image: "/orbit/911_gt3_rs.png" },
  { name: "911 Turbo S", subtitle: "The Benchmark", desc: "Unrivaled acceleration and everyday usability in a package that defies physics.", spec: "650 HP — 0-100 in 2.7s", image: "/orbit/911_turbo_s.png" },
  { name: "911 Dakar", subtitle: "The All-Terrain", desc: "The soul of a rally car in the body of a legend. Go anywhere, fast.", spec: "480 HP — 0-100 in 3.4s", image: "/orbit/911_dakar.png" },
  { name: "911 Targa 4", subtitle: "Style Icon", desc: "The perfect blend of convertible freedom and coupe security with the classic roll bar.", spec: "385 HP — 0-100 in 4.4s", image: "/orbit/911_targa_4.png" },
  { name: "911 S/T", subtitle: "Pure Driving", desc: "Celebrating 60 years of the 911 with a focus on manual driving purity and lightweight construction.", spec: "525 HP — 0-100 in 3.7s", image: "/orbit/911_st.png" },
  { name: "911 Carrera", subtitle: "The Standard", desc: "The timeless silhouette. The pure starting point of a six-decade obsession.", spec: "394 HP — 0-100 in 4.1s", image: "/orbit/911_carrera.png" },
  { name: "Taycan Turbo", subtitle: "The Soul, Electrified", desc: "800-volt architecture delivers relentless acceleration without a drop of fuel.", spec: "952 HP — 0-100 in 2.4s", image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Porsche_Taycan_IAA_2019_JM_0787.jpg" },
  { name: "Panamera", subtitle: "The Sports Sedan", desc: "A true sports car that accommodates four passengers in absolute luxury.", spec: "680 HP — 0-100 in 3.2s", image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Porsche_971_Panamera_Turbo_1X7A6497.jpg" },
  { name: "Cayenne", subtitle: "The SUV Leader", desc: "Track-capable performance meets off-road utility and family transport.", spec: "659 HP — 0-100 in 3.6s", image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Porsche_Cayenne_IV_Turbo_GT_001.jpg" },
];

export default function Models() {
  return (
    <section className="min-h-screen bg-ln-bg pt-32 pb-24 px-8 md:px-16 relative overflow-hidden">
      {/* Precision Engineering Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />

      {/* Massive Brutalist Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 select-none pointer-events-none opacity-[0.04]">
        <h2 className="font-serif font-black italic text-[30vw] leading-none uppercase text-ln-text tracking-tighter">
          PORSCHE
        </h2>
      </div>

      <div className="absolute top-40 left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.04]">
        <div className="whitespace-nowrap animate-marquee flex">
          <span className="font-serif font-black italic text-[20vw] uppercase text-ln-text">THE LINEUP /// THE LINEUP /// THE LINEUP ///</span>
          <span className="font-serif font-black italic text-[20vw] uppercase text-ln-text">THE LINEUP /// THE LINEUP /// THE LINEUP ///</span>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="mb-20 border-b border-ln-border pb-10">
            <p className="font-sans font-bold text-[10px] tracking-[0.4em] uppercase text-ln-muted mb-4">The Complete Range</p>
            <h1 className="font-serif font-black italic text-[12vw] md:text-[8vw] leading-[0.85] uppercase text-ln-text">
              The Lineup<span className="text-ln-accent">.</span>
            </h1>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.08}>
              <TiltedCard className="tilt-target group cursor-pointer relative overflow-hidden h-full border border-black/5 hover:border-ln-accent transition-colors duration-500" style={{ borderRadius: 0 }}>
                {/* Image or Gradient section */}
                <div className={`h-64 relative overflow-hidden ${model.gradient ? `bg-gradient-to-br ${model.gradient}` : 'bg-ln-dark'}`}>
                  {model.image ? (
                    <img 
                      src={model.image} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                      alt={model.name} 
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif font-black italic text-[120px] leading-none text-black/[0.04] select-none group-hover:scale-110 transition-transform duration-700">{model.name}</span>
                    </div>
                  )}
                  {/* Neon badge */}
                  <div className="absolute top-4 right-4 bg-ln-accent text-ln-dark font-sans font-black text-[9px] tracking-[0.15em] uppercase px-3 py-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-20">
                    Explore →
                  </div>
                </div>
                
                {/* Content */}
                <div className="bg-white p-7">
                  <p className="font-sans font-bold text-[9px] tracking-[0.3em] uppercase text-ln-muted mb-2">{model.subtitle}</p>
                  <h3 className="font-serif font-black italic text-4xl uppercase text-ln-text mb-3">{model.name}</h3>
                  <p className="font-sans text-sm text-ln-muted leading-relaxed mb-6">{model.desc}</p>
                  <div className="pt-4 border-t border-black/5 flex justify-between items-center">
                    <p className="font-sans font-black text-[10px] tracking-[0.12em] uppercase text-ln-text">{model.spec}</p>
                    <div className="w-6 h-6 bg-ln-accent rounded-full opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300" />
                  </div>
                </div>
              </TiltedCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
