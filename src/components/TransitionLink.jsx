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

    // Update massive background text
    const bgText = document.querySelector("#porsche-transition-logo .transition-bg-text");
    if (bgText) bgText.innerText = word;

    // Update dynamic foreground masked letters
    const logoContainer = document.getElementById("porsche-dynamic-word");
    if (logoContainer) {
      logoContainer.innerHTML = ""; // Clear old letters
      word.split("").forEach((char) => {
        const maskWrapper = document.createElement("div");
        maskWrapper.className = "overflow-hidden inline-flex";

        const letterSpan = document.createElement("span");
        letterSpan.innerText = char;
        // Text scales dynamically with word length
        const textSize = word.length > 7 ? "text-5xl md:text-8xl" : "text-6xl md:text-[10rem]";
        letterSpan.className = `transition-letter font-sans font-black uppercase ${textSize} leading-none text-ln-dark tracking-tighter inline-block drop-shadow-xl translate-y-full`;
        
        maskWrapper.appendChild(letterSpan);
        logoContainer.appendChild(maskWrapper);
      });
    }

    // Update destination text
    const destText = document.querySelector("#porsche-transition-logo .destination-text");
    if (destText) destText.innerText = `DESTINATION ...... ${href}`;

    const letters = document.querySelectorAll("#porsche-transition-logo .transition-letter");
    const micros = document.querySelectorAll("#porsche-transition-logo .transition-micro span");

    // Reset states for entry
    gsap.set(letters, { yPercent: 100 });
    gsap.set(micros, { opacity: 0, x: -20 });
    gsap.set(bgText, { scale: 0.9, opacity: 0 });

    // Animate the curtain UP (Exit current page)
    gsap.to(curtain, {
      scaleY: 1,
      transformOrigin: "bottom",
      duration: 0.7,
      ease: "power4.inOut",
      onComplete: () => {
        // Background massive text subtle scale
        gsap.to(bgText, { scale: 1, opacity: 0.05, duration: 2, ease: "power2.out" });

        // Stagger animate the letters sliding UP out of their masks
        gsap.to(letters, {
          yPercent: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: "expo.out",
        });

        // Animate microcopy in
        gsap.to(micros, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          onComplete: () => {
            // Push the new route just as the aesthetic settles
            setTimeout(() => router.push(href), 150);
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
