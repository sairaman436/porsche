"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ParallaxFrames({ totalFrames = 2500 }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const textIntroRef = useRef(null);
  const textAeroRef = useRef(null);
  const textHybridRef = useRef(null);
  const textLaunchRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Internal resolution
    canvas.width = 1920;
    canvas.height = 1080;

    // Clear to black immediately to prevent white flash
    ctx.fillStyle = "#0B0D0E";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const frameObj = { frame: 1 };
    const imageCache = new Map();

    // Preload first batch of frames for instant start
    for (let i = 1; i <= 100; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(5, '0');
      img.src = `/frames/frame_${paddedIndex}.webp`;
      img.onload = () => {
        imageCache.set(i, img);
        // If we are still at the start, draw it immediately
        if (lastRequestedFrame === i || (i === 1 && currentlyDrawnFrame === -1)) {
          renderFrame(lastRequestedFrame);
        }
      };
      imageCache.set(i, img);
    }

    let isDrawing = false;
    let pendingFrame = null;

    let lastRequestedFrame = 1;
    let currentlyDrawnFrame = -1;

    const drawFrame = (index) => {
      if (currentlyDrawnFrame === index) return;
      if (!imageCache.has(index)) return;
      const img = imageCache.get(index);
      if (!img.complete || img.naturalHeight === 0) return;

      // Calculate aspect ratio to cover the canvas
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        
      currentlyDrawnFrame = index;
    };

    const renderFrame = (index) => {
      lastRequestedFrame = index;

      if (imageCache.has(index)) {
        const img = imageCache.get(index);
        if (img.complete && img.naturalHeight !== 0) {
          drawFrame(index);
          return;
        }
      }

      // Find the closest available frame to avoid empty canvas or visual jumping
      let bestIndex = -1;
      let minDistance = Infinity;

      if (currentlyDrawnFrame !== -1) {
        minDistance = Math.abs(index - currentlyDrawnFrame);
        bestIndex = currentlyDrawnFrame;
      }

      let searchRadius = 1;
      while (searchRadius < minDistance && searchRadius < 200) {
        // Check frame behind
        if (imageCache.has(index - searchRadius)) {
          const img = imageCache.get(index - searchRadius);
          if (img.complete && img.naturalHeight !== 0) {
            bestIndex = index - searchRadius;
            break;
          }
        }
        // Check frame ahead
        if (imageCache.has(index + searchRadius)) {
          const img = imageCache.get(index + searchRadius);
          if (img.complete && img.naturalHeight !== 0) {
            bestIndex = index + searchRadius;
            break;
          }
        }
        searchRadius++;
      }

      if (bestIndex !== -1) {
        drawFrame(bestIndex);
      }

      // Load the requested frame if not in cache
      if (!imageCache.has(index)) {
        const img = new Image();
        const paddedIndex = String(index).padStart(5, '0');
        img.src = `/frames/frame_${paddedIndex}.webp`;
        imageCache.set(index, img);

        img.onload = () => {
          // Whenever ANY image finishes loading, trigger a re-evaluation for the CURRENT target frame
          // This guarantees we only ever visually "upgrade" to closer frames, eliminating all jumping glitches
          renderFrame(lastRequestedFrame);
        };
      }
    };

    renderFrame(1);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    // Animate frames
    tl.to(frameObj, {
      frame: totalFrames,
      snap: "frame",
      ease: "none",
      duration: 1, // Explicitly set duration to 1 to match the text animation total time
      onUpdate: () => {
        renderFrame(Math.round(frameObj.frame));
      }
    }, 0);

    // Scroll indicator fades out
    tl.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.05 }, 0);

    // Intro (0% to 20%)
    tl.to(textIntroRef.current, { opacity: 0, y: -80, duration: 0.15 }, 0.05);

    // Aero (25% to 45%)
    tl.fromTo(textAeroRef.current, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.1 }, 0.25)
      .to(textAeroRef.current, { opacity: 0, y: -80, duration: 0.1 }, 0.45);

    // Hybrid (55% to 75%)
    tl.fromTo(textHybridRef.current, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.1 }, 0.55)
      .to(textHybridRef.current, { opacity: 0, y: -80, duration: 0.1 }, 0.75);

    // Launch (85% to 100%)
    tl.fromTo(textLaunchRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.15 }, 0.85);

    return () => {
      tl.kill();
    };
  }, [totalFrames]);

  return (
    <div ref={containerRef} className="relative w-full h-[600vh]">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-ln-bg">
        <canvas ref={canvasRef} className="w-full h-full object-cover" />

        {/* Darkening overlay for text contrast & Cinematic vignette */}
        <div className="absolute inset-0 pointer-events-none bg-black/30" />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 100%), linear-gradient(to top, #0B0D0E 0%, transparent 30%, transparent 70%, #0B0D0E 100%)'
        }} />

        {/* Phase 1: Intro — Lando-style massive serif */}
        <div ref={textIntroRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 drop-shadow-2xl">
          <p className="font-sans font-bold text-sm md:text-base tracking-[0.5em] uppercase text-ln-accent mb-8 reveal reveal-delay-1 drop-shadow-lg">Porsche AG — Stuttgart</p>
          <h1 className="font-serif font-black italic text-[12vw] md:text-[10vw] leading-[0.85] text-center uppercase text-white">
            THE <span className="text-ln-accent">911</span>
          </h1>
          <h2 className="font-serif font-black italic text-[7vw] md:text-[5vw] leading-none text-center uppercase text-white mt-4 tracking-widest">
            T-HYBRID
          </h2>
        </div>

        {/* Scroll indicator */}
        <div ref={scrollIndicatorRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none drop-shadow-lg">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-ln-accent animate-pulse" />
          <p className="font-sans font-bold text-[9px] tracking-[0.3em] uppercase text-ln-muted mt-3">Scroll to explore</p>
        </div>

        {/* Phase 2: Active Aero */}
        <div ref={textAeroRef} className="absolute top-1/2 left-8 md:left-24 -translate-y-1/2 max-w-2xl pointer-events-none opacity-0 drop-shadow-2xl">
          <p className="font-sans font-bold text-sm md:text-base tracking-[0.4em] uppercase text-ln-accent mb-6 drop-shadow-lg">Active Aerodynamics</p>
          <h2 className="font-serif font-black italic text-[8vw] md:text-[6vw] leading-[0.9] uppercase text-white">
            FORM <br /><span className="text-stroke-accent">FOLLOWS</span><br />FUNCTION.
          </h2>
          <p className="font-sans text-base md:text-lg text-white leading-relaxed mt-6 max-w-lg drop-shadow-lg font-medium">
            Adaptive air flaps and an active front spoiler optimize airflow dynamically, balancing drag and downforce with absolute precision.
          </p>
        </div>

        {/* Phase 3: Hybrid Heart */}
        <div ref={textHybridRef} className="absolute top-1/2 right-8 md:right-24 -translate-y-1/2 max-w-2xl text-right pointer-events-none opacity-0 drop-shadow-2xl">
          <p className="font-sans font-bold text-sm md:text-base tracking-[0.4em] uppercase text-ln-accent mb-6 drop-shadow-lg">E-Performance</p>
          <h2 className="font-serif font-black italic text-[8vw] md:text-[6vw] leading-[0.9] uppercase text-white">
            THE<br /><span className="text-ln-accent">HYBRID</span><br />HEART.
          </h2>
          <p className="font-sans text-base md:text-lg text-white leading-relaxed mt-6 max-w-lg ml-auto drop-shadow-lg font-medium">
            An integrated electric turbocharger and a newly developed 3.6-litre boxer engine deliver unparalleled responsiveness.
          </p>
        </div>

        {/* Phase 4: Unleash */}
        <div ref={textLaunchRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 drop-shadow-2xl">
          <h2 className="font-serif font-black italic text-[15vw] md:text-[12vw] leading-none uppercase text-white text-center tracking-tighter drop-shadow-[0_20px_50px_rgba(204,255,0,0.3)]">
            <span className="text-stroke-accent">UN</span>LEASH<span className="text-ln-accent">.</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
