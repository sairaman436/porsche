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
        const textSize = word.length > 7 ? "text-5xl md:text-8xl" : "text-6xl md:text-[12rem]";
        letterSpan.className = `transition-letter font-sans font-black uppercase ${textSize} leading-none text-ln-dark tracking-tighter inline-block translate-y-full`;
        maskWrapper.appendChild(letterSpan);
        logoContainer.appendChild(maskWrapper);
      });
    }

    // Reset Progress & Percent
    const progressBar = document.querySelector(".transition-progress-bar");
    const percentEl = document.querySelector(".transition-percent");
    if (progressBar) gsap.set(progressBar, { scaleX: 0, backgroundColor: themeColor });
    if (percentEl) {
       percentEl.innerText = "00%";
       percentEl.style.color = "#1A1A1A";
    }

    // Set Bubble Colors
    const bubbles = document.querySelectorAll(".transition-bubble");
    const bubbleFill = document.querySelector(".transition-bubble-fill");
    if (bubbles.length > 0) {
      gsap.set(bubbles, { backgroundColor: themeColor, y: 0, opacity: 0 });
      gsap.set(bubbleFill, { backgroundColor: themeColor, y: "100%" });
    }

    const destText = document.querySelector("#porsche-transition-logo .destination-text");
    if (destText) destText.innerText = `DESTINATION ...... ${href.toUpperCase()}`;

    // EXECUTE TRANSITION
    // 0. Bubbles Rise
    gsap.to(bubbles, {
      y: "-120vh",
      opacity: 1,
      duration: 1.2,
      stagger: { amount: 0.6, from: "random" },
      ease: "power3.inOut"
    });

    // 1. Fill Screen
    gsap.to(bubbleFill, {
      y: 0,
      duration: 0.8,
      ease: "power4.inOut",
      delay: 0.3,
      onComplete: () => {
        // Now that screen is covered, update text colors for visibility on dark
        const letters = document.querySelectorAll(".transition-letter");
        const uiText = document.querySelectorAll(".transition-loader-ui span, .transition-micro span, .transition-percent");
        gsap.to([letters, uiText], { color: "#FFFFFF", duration: 0.3 });

        // 2. Animate Letters UP
        gsap.to(letters, {
          yPercent: 0,
          duration: 0.7,
          stagger: 0.04,
          ease: "expo.out"
        });

        // 3. Animate Progress
        gsap.to(progressBar, { scaleX: 1, duration: 1.5, ease: "power3.inOut" });
        const pObj = { v: 0 };
        gsap.to(pObj, {
          v: 100,
          duration: 1.5,
          ease: "power3.inOut",
          onUpdate: () => { if (percentEl) percentEl.innerText = Math.round(pObj.v).toString().padStart(2, '0') + "%"; },
          onComplete: () => {
            // Push route
            setTimeout(() => router.push(href), 100);
          }
        });
      }
    });
  };

  return (
    <a href={href} onClick={handleTransition} className={className}>
      {children}
    </a>
  );
}
