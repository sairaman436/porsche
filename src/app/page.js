import dynamic from 'next/dynamic';

const ParallaxFrames = dynamic(() => import('../components/ParallaxFrames'), { ssr: false });
const OrbitImages = dynamic(() => import('../components/OrbitImages'), { ssr: false });
const FlowingMenu = dynamic(() => import('../components/FlowingMenu'), { ssr: false });

export default function Home() {
  const orbitItems = [
    { label: "911 Carrera", href: "/models", image: "/orbit/911_carrera.png" },
    { label: "911 Turbo S", href: "/models", image: "/orbit/911_turbo_s.png" },
    { label: "911 GT3 RS", href: "/models", image: "/orbit/911_gt3_rs.png" },
    { label: "911 Targa 4", href: "/models", image: "/orbit/911_targa_4.png" },
    { label: "911 Dakar", href: "/models", image: "/orbit/911_dakar.png" },
    { label: "911 S/T", href: "/models", image: "/orbit/911_st.png" },
  ];
  const menuItems = [
    { label: "Models", href: "/models", tag: "6 Lineups" },
    { label: "Engineering", href: "/engineering", tag: "8 Systems" },
    { label: "Heritage", href: "/heritage", tag: "Since 1931" },
    { label: "Motorsport", href: "/achievements", tag: "30K+ Wins" },
    { label: "Gallery", href: "/gallery", tag: "Explore" },
  ];

  return (
    <>
      <ParallaxFrames totalFrames={2443} />

      {/* Marquee */}
      <div className="w-full bg-ln-accent py-5 overflow-hidden relative z-20">
        <div className="flex whitespace-nowrap animate-marquee">
          {["Flat-Six Energy","///","No Compromise","///","Stuttgart Born","///","Hybrid Power","///","Flat-Six Energy","///","No Compromise","///","Stuttgart Born","///","Hybrid Power","///"].map((t, i) => (
            <span key={i} className={`font-serif font-black italic text-4xl md:text-5xl mx-6 uppercase ${t === '///' ? 'text-ln-dark/30' : 'text-ln-dark'}`}>{t}</span>
          ))}
        </div>
      </div>

      {/* Manifesto */}
      <section className="relative z-20 bg-ln-bg py-32 md:py-48 px-8 md:px-16 flex items-center justify-center text-center">
        <div className="max-w-5xl">
          <p className="font-sans font-bold text-[10px] tracking-[0.4em] uppercase text-ln-muted mb-8">Porsche AG — Since 1931</p>
          <h2 className="font-serif font-black italic text-[7vw] md:text-[4.5vw] leading-[1.1] uppercase text-ln-text">
            <span className="text-ln-muted">Redefining</span> Performance, Pushing Every{" "}
            <span className="text-ln-muted">Limit</span>, Crafting The Future Of{" "}
            <span className="text-stroke-white">Driving</span> On And Off The Track<span className="text-ln-accent">.</span>
          </h2>
        </div>
      </section>

      {/* Orbit */}
      <section className="relative z-20 bg-ln-light py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden">
        <p className="font-sans font-bold text-[10px] tracking-[0.4em] uppercase text-ln-muted mb-12">The 911 Lineup</p>
        <OrbitImages images={orbitItems} radius={350} speed={0.4} />
      </section>

      {/* Flowing Menu */}
      <section className="relative z-20 bg-ln-bg py-24 px-8 md:px-16">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-12">
            <p className="font-sans font-bold text-[10px] tracking-[0.3em] uppercase text-ln-muted mb-3">Navigate</p>
            <h2 className="font-serif font-black italic text-5xl md:text-7xl uppercase leading-none text-ln-text">
              Explore<span className="text-ln-accent">.</span>
            </h2>
          </div>
          <FlowingMenu items={menuItems} />
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-20 bg-ln-dark py-20 px-8 md:px-16">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "75+", label: "Years of Innovation" },
            { number: "30K+", label: "Race Victories" },
            { number: "19", label: "Le Mans Wins" },
            { number: "6", label: "Model Lines" },
          ].map((s, i) => (
            <div key={i}>
              <h3 className="font-serif font-black italic text-5xl md:text-6xl text-ln-accent">{s.number}</h3>
              <p className="font-sans font-bold text-[10px] tracking-[0.2em] uppercase text-white/50 mt-3">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
