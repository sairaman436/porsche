"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ScrollReveal = dynamic(() => import("../../components/ScrollReveal"), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 18 High-Quality Authentic Porsche Images — Unsplash (reliable CDN)
const PORSCHE_IMAGES = [
  "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80", // 911 Turbo S Rear
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80", // Black 911 GT3
  "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80", // Red 911 Carrera
  "https://images.unsplash.com/photo-1611859266164-faecc3df9e32?w=800&q=80", // Silver 911 Detail
  "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80", // Taycan Frozen Blue
  "https://images.unsplash.com/photo-1596468138838-0f34f7fa4b30?w=800&q=80", // Classic 911 Yellow
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80", // 911 GT3 Side Profile
  "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&q=80", // Racing 911 GT3
  "https://images.unsplash.com/photo-1632243110843-69083833246f?w=800&q=80", // Porsche Museum Classic
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80", // Silver 911 Front
  "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80", // 911 GT3 RS
  "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=800&q=80", // Red 911 Targa
  "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=800&q=80", // Porsche 918 Spyder
  "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80", // Yellow 911 Classic
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80", // 911 Carrera Front
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80", // 911 Detail Black
  "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80", // 911 Turbo S Performance
  "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80"  // Taycan Electric
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
              <GalleryCard key={`c1-${idx}`} item={item} onLoad={handleImageLoad} priority={idx < 3} />
            ))}
          </div>

          {/* Column 2 - Static */}
          <div className="flex flex-col gap-6">
            {col2.map((item, idx) => (
              <GalleryCard key={`c2-${idx}`} item={item} onLoad={handleImageLoad} priority={idx < 3} />
            ))}
          </div>

          {/* Column 3 - Parallax Up */}
          <div ref={col3Ref} className="flex flex-col gap-6 will-change-transform">
            {col3.map((item, idx) => (
              <GalleryCard key={`c3-${idx}`} item={item} onLoad={handleImageLoad} priority={idx < 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ item, onLoad, priority = false }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  // Handle cached images where onLoad might not fire
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      handleLoad();
    }
  }, []);

  const handleLoad = () => {
    if (loaded) return;
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
        {/* Native img bypasses Next.js optimization proxy which times out on large Wikimedia files */}
        <img 
          ref={imgRef}
          src={item.img} 
          alt={item.title}
          className={`absolute inset-0 w-full h-full object-cover filter grayscale brightness-75 contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out will-change-transform ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleLoad}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
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
