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

    // === THEME COLOR MAP (unique per page) ===
    const getThemeColor = (path) => {
      if (path.includes("engineering")) return "#CCFF00"; // Neon Green
      if (path.includes("gallery")) return "#00F0FF";     // Cyan
      if (path.includes("heritage")) return "#D4AF37";    // Gold
      if (path.includes("models")) return "#FF0000";      // Speed Red
      return "#CCFF00";                                    // Default: Neon
    };
    const themeColor = getThemeColor(href);

    // === UPDATE WATERMARK ===
    const bgText = document.querySelector("#porsche-transition-logo .transition-bg-text");
    if (bgText) {
      bgText.innerText = word;
      bgText.style.color = "#222222"; // Dark ghost stencil
    }

    // === REBUILD LETTERS (white, hidden below) ===
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
        letterSpan.style.color = "#FFFFFF"; // Pure White branding
        letterSpan.style.backfaceVisibility = "hidden";
        letterSpan.style.WebkitBackfaceVisibility = "hidden";
        letterSpan.style.webkitFontSmoothing = "antialiased";
        maskWrapper.appendChild(letterSpan);
        logoContainer.appendChild(maskWrapper);
      });
    }

    // === HIDE PROGRESS UI (not used during navigation) ===
    const progressBar = document.querySelector(".transition-progress-bar");
    const percentEl = document.querySelector(".transition-percent");
    const loaderUI = document.querySelector(".transition-loader-ui");

    if (progressBar) gsap.set(progressBar, { scaleX: 0 });
    if (percentEl) percentEl.innerText = "";
    if (loaderUI) gsap.set(loaderUI, { opacity: 0 });

    // === SET BUBBLE COLORS TO PAGE THEME ===
    const bubbles = document.querySelectorAll(".transition-bubble");
    const bubbleFill = document.querySelector(".transition-bubble-fill");
    if (bubbles.length > 0) {
      gsap.set(bubbles, { backgroundColor: themeColor, y: 0, opacity: 0 });
      gsap.set(bubbleFill, { backgroundColor: themeColor, y: "100%" });
    }

    // === RESET ALL STATES ===
    const micros = document.querySelectorAll("#porsche-transition-logo .transition-micro span");
    gsap.set(curtain, { yPercent: 0 });
    gsap.set([bgText, micros], { opacity: 1 });

    const letters = document.querySelectorAll(".transition-letter");
    gsap.set(letters, { yPercent: 100, color: "#FFFFFF" }); // Hidden below, white

    // =============================================
    //  BUTTERMAX TRANSITION SEQUENCE
    // =============================================
    const sequenceDelay = 0;

    // 1. Organic Bubbles Rise
    gsap.to(bubbles, {
      y: "-120vh",
      opacity: 1,
      duration: 1.2,
      stagger: { amount: 0.5, from: "random" },
      ease: "expo.inOut",
      delay: sequenceDelay
    });

    // 2. Liquid Fill
    gsap.to(bubbleFill, {
      y: 0,
      duration: 0.9,
      ease: "expo.inOut",
      delay: sequenceDelay + 0.15
    });

    // 3. Letters Slide In (Pure White)
    gsap.to(letters, {
      yPercent: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "expo.out",
      delay: sequenceDelay + 0.1
    });

    // 4. Watermark Reveals (dark ghost stencil)
    if (bgText) {
      gsap.to(bgText, {
        opacity: 0.6,
        duration: 0.8,
        delay: sequenceDelay + 0.4
      });
    }

    // 5. Diagnostic Reveal
    const microSpans = document.querySelectorAll(".transition-micro span");
    gsap.fromTo(microSpans,
      { x: -10, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out", delay: sequenceDelay + 0.5 }
    );

    // 6. Navigate after transition completes
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
