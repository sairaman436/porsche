"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ScrollReveal = dynamic(() => import("../../components/ScrollReveal"), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 13 Ultra-reliable Wikimedia images used successfully on Heritage & Achievements pages
const PORSCHE_IMAGES = [
  "https://upload.wikimedia.org/wikipedia/commons/e/e5/Porsche_911_991_GT2_RS_at_6_Hours_of_Nuerburgring_WEC_2017.jpg", // 0. GT2 RS
  "https://upload.wikimedia.org/wikipedia/commons/5/52/Porsche_Mission_E%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3885%29.jpg", // 1. Mission E
  "https://upload.wikimedia.org/wikipedia/commons/8/8c/2024_Porsche_911_992_Carrera_GTS_%2824306%29.jpg", // 2. 992 GTS
  "https://upload.wikimedia.org/wikipedia/commons/9/94/Porsche_959_Paris_Dakar_%283335774531%29.jpg", // 3. 959 Dakar
  "https://upload.wikimedia.org/wikipedia/commons/e/e0/3rd_placed_Porsche_911_GT1_drivers_Karl_Wendlinger%2C_Yannick_Dalmas_%26_Scott_Goodyear_on_the_podium_at_the_1996_Le_Mans_%2851702542698%29.jpg", // 4. 911 GT1
  "https://upload.wikimedia.org/wikipedia/commons/a/a4/2016_Porsche_919_Hybrid_Le_Mans.jpg", // 5. 919 Hybrid
  "https://upload.wikimedia.org/wikipedia/commons/b/b9/Stuttgart_Jul_2012_54_%28Porsche_Museum_-_1996_Porsche_Boxster%29.JPG", // 6. Boxster
  "https://upload.wikimedia.org/wikipedia/commons/3/37/Porsche_99X_Electric.jpg", // 7. 99X Electric
  "https://upload.wikimedia.org/wikipedia/commons/1/16/Porsche_963_LMDh.jpg", // 8. 963 LMDh
  "https://upload.wikimedia.org/wikipedia/commons/e/ec/Porsche_356_No._1_Roadster_IMG_0814.jpg", // 9. 356 Speedster
  "https://upload.wikimedia.org/wikipedia/commons/4/4d/Porsche_901_prototype_at_Pebble_Beach_Concours_2023.jpg", // 10. 901 Prototype
  "https://upload.wikimedia.org/wikipedia/commons/6/67/Porsche_911_1974_Turbo_Nr.1_LSideFront_PorscheM_9June2013_%2814989610066%29.jpg", // 11. 930 Turbo
  "https://upload.wikimedia.org/wikipedia/commons/3/3f/Porsche_Cayenne_S_%28955%29_Washington_DC_Metro_Area%2C_USA.jpg" // 12. Cayenne S
];

const items = [
  // Col 1 (Base: ~2250px)
  { title: "911 GT3 RS", tag: "Track", h: "420px", img: PORSCHE_IMAGES[0], meta: "F/2.8 // ISO 100 // 35MM" }, // idx 0
  // Col 2 (Base: ~2500px)
  { title: "Mission E", tag: "Concept", h: "400px", img: PORSCHE_IMAGES[1], meta: "F/4.0 // ISO 400 // 35MM" }, // idx 1
  // Col 3 (Base: ~2750px)
  { title: "992 GTS", tag: "Hybrid", h: "480px", img: PORSCHE_IMAGES[2], meta: "F/1.8 // ISO 100 // 85MM" }, // idx 2
  
  // Col 1
  { title: "959 Dakar", tag: "Off-Road", h: "360px", img: PORSCHE_IMAGES[3], meta: "F/5.6 // ISO 400 // 24MM" }, // idx 3
  // Col 2
  { title: "911 GT1", tag: "Legend", h: "460px", img: PORSCHE_IMAGES[4], meta: "F/2.8 // ISO 100 // 50MM" }, // idx 4
  // Col 3
  { title: "919 Hybrid", tag: "Le Mans", h: "420px", img: PORSCHE_IMAGES[5], meta: "F/2.0 // ISO 100 // 200MM" }, // idx 5
  
  // Col 1
  { title: "Boxster", tag: "Mid-Engine", h: "400px", img: PORSCHE_IMAGES[6], meta: "F/4.0 // ISO 200 // 50MM" }, // idx 6
  // Col 2
  { title: "99X Electric", tag: "Formula E", h: "380px", img: PORSCHE_IMAGES[7], meta: "F/4.0 // ISO 800 // 85MM" }, // idx 7
  // Col 3
  { title: "963 LMDh", tag: "Prototype", h: "460px", img: PORSCHE_IMAGES[8], meta: "F/1.8 // ISO 100 // 200MM" }, // idx 8
  
  // Col 1
  { title: "356 Speedster", tag: "Classic", h: "340px", img: PORSCHE_IMAGES[9], meta: "F/2.8 // ISO 200 // 35MM" }, // idx 9
  // Col 2
  { title: "901 Prototype", tag: "Heritage", h: "420px", img: PORSCHE_IMAGES[10], meta: "F/4.0 // ISO 400 // 50MM" }, // idx 10
  // Col 3
  { title: "930 Turbo", tag: "Flagship", h: "440px", img: PORSCHE_IMAGES[11], meta: "F/2.8 // ISO 100 // 50MM" }, // idx 11
  
  // Col 1
  { title: "Cayenne S", tag: "SUV", h: "380px", img: PORSCHE_IMAGES[12], meta: "F/2.8 // ISO 100 // 85MM" }, // idx 12
  // Col 2
  { title: "911 GT2 RS", tag: "Track", h: "400px", img: PORSCHE_IMAGES[0], meta: "F/5.6 // ISO 400 // 35MM" }, // idx 13
  // Col 3
  { title: "Taycan Turbo S", tag: "EV", h: "480px", img: PORSCHE_IMAGES[1], meta: "F/5.6 // ISO 800 // 70MM" }, // idx 14
  
  // Col 1
  { title: "T-Hybrid", tag: "Hybrid", h: "350px", img: PORSCHE_IMAGES[2], meta: "F/4.0 // ISO 400 // 50MM" }, // idx 15
  // Col 2
  { title: "LMP1", tag: "Prototype", h: "440px", img: PORSCHE_IMAGES[5], meta: "F/1.8 // ISO 100 // 50MM" }, // idx 16
  // Col 3
  { title: "Formula E", tag: "Race", h: "470px", img: PORSCHE_IMAGES[7], meta: "F/2.0 // ISO 100 // 200MM" }, // idx 17
];

export default function Gallery() {
  const containerRef = useRef(null);
  const col1Ref = useRef(null);
  const col3Ref = useRef(null);

  useEffect(() => {
    // Force ScrollTrigger to recalculate once the DOM is ready
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // GSAP Parallax instead of React state scroll listener
    const ctx = gsap.context(() => {
      // Column 1 moves DOWN significantly as you scroll
      gsap.to(col1Ref.current, {
        y: 250,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // Add scrub smoothing
        }
      });

      // Column 3 moves UP significantly as you scroll
      gsap.to(col3Ref.current, {
        y: -250,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // Add scrub smoothing
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Split items into 3 columns
  const col1 = items.filter((_, i) => i % 3 === 0);
  const col2 = items.filter((_, i) => i % 3 === 1);
  const col3 = items.filter((_, i) => i % 3 === 2);

  return (
    <section className="min-h-screen bg-ln-bg pt-32 pb-32 px-8 md:px-16 overflow-hidden relative" ref={containerRef}>
      {/* Background Precision Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />

      {/* Massive Background Watermarks */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full text-center z-0 select-none pointer-events-none opacity-[0.03]">
        <h2 className="font-serif font-black italic text-[22vw] leading-none uppercase text-ln-text tracking-tighter">
          AESTHETICS
        </h2>
      </div>

      <div className="absolute top-[50%] -left-[5%] opacity-[0.02] font-serif font-black italic text-[15vw] uppercase text-ln-text z-0 select-none pointer-events-none [writing-mode:vertical-rl] rotate-180">
        VISUAL_ARCHIVE
      </div>

      <div className="absolute bottom-[5%] -right-[5%] opacity-[0.02] font-serif font-black italic text-[15vw] uppercase text-ln-text z-0 select-none pointer-events-none">
        DESIGN
      </div>

      <div className="max-w-screen-xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="mb-24 border-b border-black/10 pb-10">
            <p className="font-sans font-black text-[10px] tracking-[0.5em] uppercase text-ln-accent mb-4 bg-ln-dark px-3 py-1 inline-block">Visual Archive_v3</p>
            <h1 className="font-serif font-black italic text-[12vw] md:text-[8vw] leading-[0.85] uppercase text-ln-text tracking-tighter">
              Gallery<span className="text-ln-accent">.</span>
            </h1>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative pb-12 pt-6">
          {/* Column 1 - Parallax Down */}
          <div ref={col1Ref} className="flex flex-col gap-6">
            {col1.map((item, idx) => (
              <GalleryCard key={`c1-${idx}`} item={item} />
            ))}
          </div>

          {/* Column 2 - Static */}
          <div className="flex flex-col gap-6">
            {col2.map((item, idx) => (
              <GalleryCard key={`c2-${idx}`} item={item} />
            ))}
          </div>

          {/* Column 3 - Parallax Up */}
          <div ref={col3Ref} className="flex flex-col gap-6">
            {col3.map((item, idx) => (
              <GalleryCard key={`c3-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ item }) {
  return (
    <div
      className="group relative overflow-hidden cursor-pointer border border-black/10 hover:border-ln-accent transition-all duration-700 w-full bg-ln-dark shadow-xl"
      style={{ height: item.h }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Added will-change-transform for smoother scaling */}
        <img 
          src={item.img} 
          alt={item.title}
          className="w-full h-full object-cover filter grayscale brightness-75 contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
      </div>

      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 pointer-events-none">
        <div className="flex justify-between items-start">
          <span className="inline-block bg-ln-accent text-ln-dark font-sans font-black text-[9px] tracking-[0.2em] uppercase px-2 py-1">{item.tag}</span>
          <span className="font-mono text-[9px] text-white/50 uppercase tracking-widest">{item.meta}</span>
        </div>
        
        <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <h4 className="font-serif font-black italic text-3xl md:text-4xl uppercase text-white tracking-tighter leading-none mb-4">{item.title}</h4>
          <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
             <div className="absolute top-0 left-0 h-full bg-ln-accent w-0 group-hover:w-full transition-all duration-700 ease-out delay-200" />
          </div>
        </div>
      </div>
      
      {/* Corner crosshairs */}
      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20 group-hover:border-ln-accent transition-colors duration-500 z-10" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20 group-hover:border-ln-accent transition-colors duration-500 z-10" />
    </div>
  );
}
