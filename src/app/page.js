import dynamic from 'next/dynamic';

const ParallaxFrames = dynamic(() => import('../components/ParallaxFrames'), { ssr: false });
const OrbitImages = dynamic(() => import('../components/OrbitImages'), { ssr: false });
const FlowingMenu = dynamic(() => import('../components/FlowingMenu'), { ssr: false });
const TextPressure = dynamic(() => import('../components/TextPressure'), { ssr: false });
const SplitText = dynamic(() => import('../components/SplitText'), { ssr: false });
const BlueprintReveal = dynamic(() => import('../components/BlueprintReveal'), { ssr: false });

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
          <SplitText 
            text="Redefining Performance, Pushing Every Limit, Crafting The Future Of Driving On And Off The Track."
            className="font-serif font-black italic text-[7vw] md:text-[4.5vw] leading-[1.1] uppercase text-ln-text"
          />
        </div>
      </section>

      {/* Blueprint Reveal Section */}
      <section className="relative z-20 bg-ln-dark py-0 overflow-hidden">
        <BlueprintReveal 
          baseImage="/assets/car.png"
          revealImage="/assets/blueprint.png"
          className="w-full"
        />
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
            <SplitText 
              text="EXPLORE."
              className="font-serif font-black italic text-5xl md:text-7xl uppercase leading-none text-ln-text"
              stagger={0.1}
            />
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

      {/* Text Pressure Section */}
      <section className="relative z-20 bg-ln-dark py-32 overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(var(--ln-accent) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="h-[400px] w-full flex items-center justify-center px-4 relative z-10">
          <TextPressure
            text="PORSCHE"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="var(--ln-accent)"
            minFontSize={48}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-20 bg-ln-bg py-32 px-8 md:px-16 border-t border-ln-border">
        <div className="max-w-screen-xl mx-auto text-center">
          <p className="font-sans font-bold text-[10px] tracking-[0.4em] uppercase text-ln-muted mb-8">Get In Touch</p>
          <h2 className="font-serif font-black italic text-5xl md:text-8xl uppercase leading-none text-ln-text mb-12">
            Experience<br />The <span className="text-ln-accent">Unrivaled.</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <a href="mailto:contact@porsche.com" className="bg-ln-text text-ln-bg font-sans font-black text-[12px] tracking-[0.2em] uppercase px-12 py-5 hover:scale-105 transition-transform">
              Send Inquiry
            </a>
            <button className="border border-ln-border text-ln-text font-sans font-black text-[12px] tracking-[0.2em] uppercase px-12 py-5 hover:bg-ln-dark hover:text-white transition-all">
              Locate Dealer
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
