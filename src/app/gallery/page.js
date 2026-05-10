"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ScrollReveal = dynamic(() => import("../../components/ScrollReveal"), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// === OPTIMIZED IMAGE SOURCES ===
// Using Wikimedia's thumbnail API: /thumb/ + /800px- gives us a fast 800px-wide version
// This drops each image from ~5MB to ~100KB

const PORSCHE_IMAGES = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Porsche_911_991_GT2_RS_at_6_Hours_of_Nuerburgring_WEC_2017.jpg/800px-Porsche_911_991_GT2_RS_at_6_Hours_of_Nuerburgring_WEC_2017.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Porsche_Mission_E%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3885%29.jpg/800px-Porsche_Mission_E%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3885%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/2024_Porsche_911_992_Carrera_GTS_%2824306%29.jpg/800px-2024_Porsche_911_992_Carrera_GTS_%2824306%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Porsche_959_Paris_Dakar_%283335774531%29.jpg/800px-Porsche_959_Paris_Dakar_%283335774531%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/3rd_placed_Porsche_911_GT1_drivers_Karl_Wendlinger%2C_Yannick_Dalmas_%26_Scott_Goodyear_on_the_podium_at_the_1996_Le_Mans_%2851702542698%29.jpg/800px-3rd_placed_Porsche_911_GT1_drivers_Karl_Wendlinger%2C_Yannick_Dalmas_%26_Scott_Goodyear_on_the_podium_at_the_1996_Le_Mans_%2851702542698%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/2016_Porsche_919_Hybrid_Le_Mans.jpg/800px-2016_Porsche_919_Hybrid_Le_Mans.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Stuttgart_Jul_2012_54_%28Porsche_Museum_-_1996_Porsche_Boxster%29.JPG/800px-Stuttgart_Jul_2012_54_%28Porsche_Museum_-_1996_Porsche_Boxster%29.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Porsche_99X_Electric.jpg/800px-Porsche_99X_Electric.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Porsche_963_LMDh.jpg/800px-Porsche_963_LMDh.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Porsche_356_No._1_Roadster_IMG_0814.jpg/800px-Porsche_356_No._1_Roadster_IMG_0814.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Porsche_901_prototype_at_Pebble_Beach_Concours_2023.jpg/800px-Porsche_901_prototype_at_Pebble_Beach_Concours_2023.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Porsche_911_1974_Turbo_Nr.1_LSideFront_PorscheM_9June2013_%2814989610066%29.jpg/800px-Porsche_911_1974_Turbo_Nr.1_LSideFront_PorscheM_9June2013_%2814989610066%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Porsche_Cayenne_S_%28955%29_Washington_DC_Metro_Area%2C_USA.jpg/800px-Porsche_Cayenne_S_%28955%29_Washington_DC_Metro_Area%2C_USA.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/2020_Porsche_911_Turbo_S_Automatic_3.7_Front.jpg/800px-2020_Porsche_911_Turbo_S_Automatic_3.7_Front.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/2020_Porsche_Taycan_Turbo_S_Front.jpg/800px-2020_Porsche_Taycan_Turbo_S_Front.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Porsche_911_Targa_4_GTS_2018_Red.jpg/800px-Porsche_911_Targa_4_GTS_2018_Red.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Porsche_Carrera_GT_-_Front.jpg/800px-Porsche_Carrera_GT_-_Front.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Porsche_918_Spyder_-_IAA_2013.jpg/800px-Porsche_918_Spyder_-_IAA_2013.jpg"
];

const items = [
  { title: "911 GT3 RS", tag: "Track", h: "420px", img: PORSCHE_IMAGES[0], meta: "F/2.8 // ISO 100 // 35MM" },
  { title: "Mission E", tag: "Concept", h: "400px", img: PORSCHE_IMAGES[1], meta: "F/4.0 // ISO 400 // 35MM" },
  { title: "992 GTS", tag: "Hybrid", h: "480px", img: PORSCHE_IMAGES[2], meta: "F/1.8 // ISO 100 // 85MM" },
  
  { title: "959 Dakar", tag: "Off-Road", h: "360px", img: PORSCHE_IMAGES[3], meta: "F/5.6 // ISO 400 // 24MM" },
  { title: "911 GT1", tag: "Legend", h: "460px", img: PORSCHE_IMAGES[4], meta: "F/2.8 // ISO 100 // 50MM" },
  { title: "919 Hybrid", tag: "Le Mans", h: "420px", img: PORSCHE_IMAGES[5], meta: "F/2.0 // ISO 100 // 200MM" },
  
  { title: "Boxster", tag: "Mid-Engine", h: "400px", img: PORSCHE_IMAGES[6], meta: "F/4.0 // ISO 200 // 50MM" },
  { title: "99X Electric", tag: "Formula E", h: "380px", img: PORSCHE_IMAGES[7], meta: "F/4.0 // ISO 800 // 85MM" },
  { title: "963 LMDh", tag: "Prototype", h: "460px", img: PORSCHE_IMAGES[8], meta: "F/1.8 // ISO 100 // 200MM" },
  
  { title: "356 Speedster", tag: "Classic", h: "340px", img: PORSCHE_IMAGES[9], meta: "F/2.8 // ISO 200 // 35MM" },
  { title: "901 Prototype", tag: "Heritage", h: "420px", img: PORSCHE_IMAGES[10], meta: "F/4.0 // ISO 400 // 50MM" },
  { title: "930 Turbo", tag: "Flagship", h: "440px", img: PORSCHE_IMAGES[11], meta: "F/2.8 // ISO 100 // 50MM" },
  
  { title: "Cayenne S", tag: "SUV", h: "380px", img: PORSCHE_IMAGES[12], meta: "F/2.8 // ISO 100 // 85MM" },
  { title: "911 Turbo S", tag: "Performance", h: "400px", img: PORSCHE_IMAGES[13], meta: "F/5.6 // ISO 400 // 35MM" },
  { title: "Taycan S", tag: "EV", h: "480px", img: PORSCHE_IMAGES[14], meta: "F/5.6 // ISO 800 // 70MM" },
  
  { title: "911 Targa", tag: "Style", h: "350px", img: PORSCHE_IMAGES[15], meta: "F/4.0 // ISO 400 // 50MM" },
  { title: "Carrera GT", tag: "V10", h: "440px", img: PORSCHE_IMAGES[16], meta: "F/1.8 // ISO 100 // 50MM" },
  { title: "918 Spyder", tag: "Hypercar", h: "470px", img: PORSCHE_IMAGES[17], meta: "F/2.0 // ISO 100 // 200MM" },
];

export default function Gallery() {
  const containerRef = useRef(null);
  const col1Ref = useRef(null);
  const col3Ref = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    // GSAP Parallax with optimized settings
    const ctx = gsap.context(() => {
      gsap.to(col1Ref.current, {
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true,
        }
      });

      gsap.to(col3Ref.current, {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true,
        }
      });
    }, containerRef);

    // Refresh ScrollTrigger when images load to ensure correct positions
    if (imagesLoaded >= 6) {
       ScrollTrigger.refresh();
    }

    return () => ctx.revert();
  }, [imagesLoaded]);

  // Handle image load tracking
  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };

  const col1 = items.filter((_, i) => i % 3 === 0);
  const col2 = items.filter((_, i) => i % 3 === 1);
  const col3 = items.filter((_, i) => i % 3 === 2);

  return (
    <section className="min-h-screen bg-ln-bg pt-32 pb-32 px-8 md:px-16 overflow-hidden relative" ref={containerRef}>
      {/* Background Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />

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
            <p className="font-sans font-black text-[10px] tracking-[0.5em] uppercase text-ln-accent mb-4 bg-ln-dark px-3 py-1 inline-block">Visual Archive_v4</p>
            <h1 className="font-serif font-black italic text-[12vw] md:text-[8vw] leading-[0.85] uppercase text-ln-text tracking-tighter">
              Gallery<span className="text-ln-accent">.</span>
            </h1>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative pb-12 pt-6">
          {/* Column 1 - Parallax Down */}
          <div ref={col1Ref} className="flex flex-col gap-6 will-change-transform">
            {col1.map((item, idx) => (
              <GalleryCard key={`c1-${idx}`} item={item} onLoad={handleImageLoad} priority={idx < 2} />
            ))}
          </div>

          {/* Column 2 - Static */}
          <div className="flex flex-col gap-6">
            {col2.map((item, idx) => (
              <GalleryCard key={`c2-${idx}`} item={item} onLoad={handleImageLoad} priority={idx < 2} />
            ))}
          </div>

          {/* Column 3 - Parallax Up */}
          <div ref={col3Ref} className="flex flex-col gap-6 will-change-transform">
            {col3.map((item, idx) => (
              <GalleryCard key={`c3-${idx}`} item={item} onLoad={handleImageLoad} priority={idx < 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ item, onLoad, priority = false }) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <div
      className="group relative overflow-hidden cursor-pointer border border-black/10 hover:border-ln-accent transition-all duration-700 w-full bg-ln-dark shadow-xl"
      style={{ height: item.h }}
    >
      {/* Shimmer placeholder while loading */}
      {!loaded && (
        <div className="absolute inset-0 z-[5] bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] animate-pulse" />
      )}

      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image 
          src={item.img} 
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover filter grayscale brightness-75 contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out will-change-transform ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleLoad}
          priority={priority}
          loading={priority ? undefined : "lazy"}
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
      
      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20 group-hover:border-ln-accent transition-colors duration-500 z-10" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20 group-hover:border-ln-accent transition-colors duration-500 z-10" />
    </div>
  );
}
