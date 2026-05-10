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
      // Default to White for high contrast on black curtain, unless it's a specific accented theme
      bgText.style.color = themeColor === "#1A1A1A" ? "#FFFFFF" : themeColor;
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
        letterSpan.className = `transition-letter font-sans font-black uppercase ${textSize} leading-none tracking-tighter inline-block translate-y-full`;
        letterSpan.style.color = "#999999"; // Metallic Grey Branding
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

    // EXECUTE TRANSITION (Buttermax Reroute)
    const sequenceDelay = 0;

    // 0. Organic Bubbles Rise
    gsap.to(bubbles, {
      y: "-120vh",
      opacity: 1,
      duration: 1.2,
      stagger: { amount: 0.5, from: "random" },
      ease: "expo.inOut",
      delay: sequenceDelay
    });

    // 1. Organic Liquid Fill (Slightly Offset for Depth)
    gsap.to(bubbleFill, {
      y: 0,
      duration: 0.9,
      ease: "expo.inOut",
      delay: sequenceDelay + 0.15
    });

    // 2. Technical Typography & Diagnostics
    const microSpans = document.querySelectorAll(".transition-micro span");
    
    // Dynamic Text Color: Neon Green on Dark, Black on Light/Themed
    const targetTextColor = themeColor === "#1A1A1A" ? "#CCFF00" : "#000000";

    // High-Visibility shift
    gsap.to([letters, microSpans], { 
      color: targetTextColor, 
      duration: 0.2, 
      delay: sequenceDelay + 0.4 
    });

    // Branding Settle
    gsap.to(letters, {
      yPercent: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "expo.out",
      delay: sequenceDelay + 0.1
    });

    // Watermark visibility
    if (bgText) {
      gsap.to(bgText, {
        opacity: 0.4,
        duration: 0.8,
        delay: sequenceDelay + 0.4
      });
    }

    // Diagnostic Reveal
    gsap.fromTo(microSpans, 
      { x: -10, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out", delay: sequenceDelay + 0.5 }
    );

    // Navigation trigger (Precise Timing)
    gsap.delayedCall(sequenceDelay + 1.2, () => {
      router.push(href);
    });
  };

  return (
    <a href={href} onClick={handleTransition} className={className}>
      {children}
    </a>
  );
}
