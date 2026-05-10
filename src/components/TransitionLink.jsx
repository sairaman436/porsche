"use client";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";

export default function TransitionLink({ href, children, className }) {
  const router = useRouter();
  const pathname = usePathname();

  const getWordFromHref = (path) => {
    if (path === "/") return "PORSCHE";
    const segment = path.replace("/", "").toUpperCase();
    return segment || "PORSCHE";
  };

  const handleTransition = (e) => {
    e.preventDefault();

    if (pathname === href) return;

    const curtain = document.getElementById("porsche-transition-curtain");
    if (!curtain) {
      router.push(href);
      return;
    }

    const word = getWordFromHref(href);

    // Dynamic Colors based on route
    const getThemeColor = (path) => {
      if (path.includes("engineering")) return "#CCFF00"; 
      if (path.includes("gallery")) return "#00F0FF";     
      if (path.includes("heritage")) return "#D4AF37";    
      if (path.includes("models")) return "#FF0000";      
      return "#1A1A1A";                             
    };
    const themeColor = getThemeColor(href);

    // Update UI elements for the destination
    const bgText = document.querySelector("#porsche-transition-logo .transition-bg-text");
    if (bgText) {
      bgText.innerText = word;
      bgText.style.color = themeColor;
    }

    const logoContainer = document.getElementById("porsche-dynamic-word");
    if (logoContainer) {
      logoContainer.innerHTML = ""; 
      word.split("").forEach((char) => {
        const maskWrapper = document.createElement("div");
        maskWrapper.className = "overflow-hidden inline-flex";
        const letterSpan = document.createElement("span");
        letterSpan.innerText = char;
        const textSize = word.length > 7 ? "text-5xl md:text-8xl" : "text-6xl md:text-[10rem]";
        letterSpan.className = `transition-letter font-sans font-black uppercase ${textSize} leading-none text-ln-dark tracking-tighter inline-block translate-y-full`;
        letterSpan.style.backfaceVisibility = "hidden";
        letterSpan.style.WebkitBackfaceVisibility = "hidden";
        letterSpan.style.webkitFontSmoothing = "antialiased";
        maskWrapper.appendChild(letterSpan);
        logoContainer.appendChild(maskWrapper);
      });
    }

    // Reset Progress & Percent (Hide for subpage navigation)
    const progressBar = document.querySelector(".transition-progress-bar");
    const percentEl = document.querySelector(".transition-percent");
    const loaderUI = document.querySelector(".transition-loader-ui");

    if (progressBar) gsap.set(progressBar, { scaleX: 0 });
    if (percentEl) percentEl.innerText = "";
    if (loaderUI) gsap.set(loaderUI, { opacity: 0 });

    // Set Bubble Colors
    const bubbles = document.querySelectorAll(".transition-bubble");
    const bubbleFill = document.querySelector(".transition-bubble-fill");
    if (bubbles.length > 0) {
      gsap.set(bubbles, { backgroundColor: themeColor, y: 0, opacity: 0 });
      gsap.set(bubbleFill, { backgroundColor: themeColor, y: "100%" });
    }

    const micros = document.querySelectorAll("#porsche-transition-logo .transition-micro span");

    // RESET STATES FOR NAVIGATION
    gsap.set(curtain, { yPercent: 0 });
    gsap.set([bgText, micros], { opacity: 1 });
    const letters = document.querySelectorAll(".transition-letter");
    gsap.set(letters, { yPercent: 100, color: "#1A1A1A" }); // Start hidden & dark

    // EXECUTE TRANSITION (Simultaneous Version)
    const sequenceDelay = 0;

    // 0. Bubbles Rise
    gsap.to(bubbles, {
      y: "-120vh",
      opacity: 1,
      duration: 1,
      stagger: { amount: 0.4, from: "random" },
      ease: "power2.inOut",
      delay: sequenceDelay
    });

    // 1. Fill Screen
    gsap.to(bubbleFill, {
      y: 0,
      duration: 0.8,
      ease: "power4.inOut",
      delay: sequenceDelay
    });

    // 2. Animate Letters & Text Color (High Visibility)
    const microSpans = document.querySelectorAll(".transition-micro span");
    gsap.to([letters, microSpans], { 
      color: "#FFFFFF", 
      duration: 0.4, 
      delay: sequenceDelay + 0.3 
    });

    // Make massive background text more visible on the colored screen
    if (bgText) {
      gsap.to(bgText, {
        opacity: 0.15,
        duration: 0.5,
        delay: sequenceDelay + 0.3
      });
    }

    gsap.to(letters, {
      yPercent: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: "expo.out",
      delay: sequenceDelay,
      onComplete: () => {
        // Push route immediately
        router.push(href);
      }
    });
  };

  return (
    <a href={href} onClick={handleTransition} className={className}>
      {children}
    </a>
  );
}
