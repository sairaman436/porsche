"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function Template({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Check if the curtain exists from a TransitionLink click
    const curtain = document.getElementById("porsche-transition-curtain");
    const letters = document.querySelectorAll("#porsche-transition-logo .transition-letter");
    const micros = document.querySelectorAll("#porsche-transition-logo .transition-micro span");
    const bgText = document.querySelector("#porsche-transition-logo .transition-bg-text");

    const getThemeColor = (path) => {
      if (path.includes("engineering")) return "#CCFF00"; 
      if (path.includes("gallery")) return "#00F0FF";     
      if (path.includes("heritage")) return "#D4AF37";    
      if (path.includes("models")) return "#FF0000";      
      return "#1A1A1A";                             
    };
    const themeColor = getThemeColor(pathname);

    const getWordFromPath = (path) => {
      if (path === "/" || !path) return "PORSCHE";
      const segments = path.split("/").filter(Boolean);
      const lastSegment = segments[segments.length - 1];
      return lastSegment.toUpperCase();
    };
    const word = getWordFromPath(pathname);

    if (curtain) {
      // 1. Update Content for initial load
      if (bgText) {
        bgText.innerText = word;
        bgText.style.color = themeColor;
      }
      
      const logoContainer = document.getElementById("porsche-dynamic-word");
      if (logoContainer && !window.hasLoadedOnce) { // Only force update on very first mount
        logoContainer.innerHTML = ""; 
        word.split("").forEach((char) => {
          const maskWrapper = document.createElement("div");
          maskWrapper.className = "overflow-hidden inline-flex";
          const letterSpan = document.createElement("span");
          letterSpan.innerText = char;
          const textSize = word.length > 7 ? "text-5xl md:text-8xl" : "text-6xl md:text-[12rem]";
          letterSpan.className = "transition-letter font-sans font-black uppercase " + textSize + " leading-none text-ln-dark tracking-tighter inline-block translate-y-0";
          maskWrapper.appendChild(letterSpan);
          logoContainer.appendChild(maskWrapper);
        });
      }

      // 2. Set initial colors
      const bubbles = document.querySelectorAll(".transition-bubble");
      const bubbleFill = document.querySelector(".transition-bubble-fill");
      const progressBar = document.querySelector(".transition-progress-bar");
      
      if (bubbles.length > 0) {
        gsap.set([bubbles, bubbleFill, progressBar], { backgroundColor: themeColor });
      }

      // Determine if this is the very first load of the session
      const isInitialLoad = !window.hasLoadedOnce;
      
      if (isInitialLoad) {
        window.hasLoadedOnce = true;
        
        // --- INITIAL BOOT SEQUENCE (Only on first visit) ---
        const bootDelay = 0.2;

        // Start letters hidden but in High-Visibility White
        gsap.set(letters, { yPercent: 100, color: "#FFFFFF", opacity: 1 });

        // 1. Bubbles Rise & Fill
        gsap.to(".transition-bubble", {
          y: "-120vh",
          opacity: 1,
          duration: 1.2,
          stagger: { amount: 0.6, from: "random" },
          ease: "power3.inOut",
          delay: bootDelay
        });

        gsap.to(".transition-bubble-fill", {
          y: 0,
          duration: 1,
          ease: "power4.inOut",
          delay: bootDelay
        });

        // 2. Progress & Percentage
        gsap.to(".transition-progress-bar", {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          delay: bootDelay
        });

        const percentObj = { value: 0 };
        gsap.to(percentObj, {
          value: 100,
          duration: 1.2,
          ease: "power3.inOut",
          delay: bootDelay,
          onUpdate: () => {
            const el = document.querySelector(".transition-percent");
            if (el) el.innerText = Math.round(percentObj.value).toString().padStart(2, '0') + "%";
          }
        });

        // 3. Slide Letters IN (as liquid covers them)
        const microSpans = document.querySelectorAll(".transition-micro span");
        
        // Dynamic Text Color: Neon Green on Dark, Black on Light/Themed
        const targetTextColor = themeColor === "#1A1A1A" ? "#CCFF00" : "#000000";

        gsap.to([letters, microSpans, ".transition-percent"], {
          color: targetTextColor,
          duration: 0.4,
          delay: bootDelay + 0.6
        });

        gsap.to(letters, {
          yPercent: 0,
          duration: 0.7,
          stagger: 0.04,
          ease: "expo.out",
          delay: bootDelay + 0.5
        });

        if (bgText) {
          gsap.to(bgText, { 
            opacity: 0.5, 
            color: "#CCFF00",
            duration: 0.6, 
            delay: bootDelay + 0.6 
          });
        }

        // 4. Slide Letters OUT & Reveal (Final Reveal)
        gsap.to([bgText, micros, ".transition-loader-ui"], { 
          opacity: 0, 
          duration: 0.3, 
          ease: "power2.in", 
          delay: bootDelay + 1.8 // Increased delay for better visibility
        });

        gsap.to(letters, {
          yPercent: -100,
          duration: 0.6,
          stagger: 0.03,
          ease: "expo.in",
          delay: bootDelay + 1.8,
          onComplete: () => {
            gsap.to(curtain, {
              yPercent: -100,
              duration: 0.8,
              ease: "expo.inOut",
            });
          }
        });
      } else {
        // --- NAVIGATION REVEAL (Fast Reveal only) ---
        // No redundant progress animations. Just reveal the new page.
        gsap.to([bgText, micros, ".transition-loader-ui"], { 
          opacity: 0, 
          duration: 0.3, 
          ease: "power2.in", 
          delay: 0.1 
        });

        gsap.to(letters, {
          yPercent: -100,
          duration: 0.6,
          stagger: 0.03,
          ease: "expo.in",
          delay: 0.1,
          onComplete: () => {
            gsap.to(curtain, {
              yPercent: -100,
              duration: 0.8,
              ease: "expo.inOut",
            });
          }
        });
      }
    }

    // Page content slide up animation
    gsap.fromTo(
      "#page-content-wrapper",
      { y: 60, opacity: 0, filter: "blur(5px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out", delay: 0.4 }
    );
  }, []);

  return <div id="page-content-wrapper">{children}</div>;
}
