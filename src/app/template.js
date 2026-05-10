"use client";
import { useEffect } from "react";
import gsap from "gsap";

export default function Template({ children }) {
  useEffect(() => {
    // Check if the curtain exists from a TransitionLink click
    const curtain = document.getElementById("porsche-transition-curtain");
    const letters = document.querySelectorAll("#porsche-transition-logo .transition-letter");
    const micros = document.querySelectorAll("#porsche-transition-logo .transition-micro span");
    const bgText = document.querySelector("#porsche-transition-logo .transition-bg-text");

    if (curtain) {
      // Determine if this is the very first load of the session
      const isInitialLoad = !window.hasLoadedOnce;
      const sequenceDelay = isInitialLoad ? 1 : 0.2;
      
      if (isInitialLoad) {
        window.hasLoadedOnce = true;
      }

      // 1. Animate Progress Bar
      gsap.to(".transition-progress-bar", {
        scaleX: 1,
        duration: 2,
        ease: "power3.inOut",
        delay: sequenceDelay
      });

      // 2. Animate Percentage
      const percentObj = { value: 0 };
      gsap.to(percentObj, {
        value: 100,
        duration: 2,
        ease: "power3.inOut",
        delay: sequenceDelay,
        onUpdate: () => {
          const el = document.querySelector(".transition-percent");
          if (el) el.innerText = Math.round(percentObj.value).toString().padStart(2, '0') + "%";
        }
      });

      // 3. Fade out background text and UI elements
      gsap.to([bgText, micros, ".transition-loader-ui"], { 
        opacity: 0, 
        duration: 0.5, 
        ease: "power2.in", 
        delay: sequenceDelay + 2.2 
      });

      // 4. Slide letters UP
      gsap.to(letters, {
        yPercent: -100,
        duration: 0.6,
        stagger: 0.04,
        ease: "expo.in",
        delay: sequenceDelay + 2.2,
        onComplete: () => {
          // 5. Final Curtain Reveal
          gsap.to(curtain, {
            scaleY: 0,
            transformOrigin: "top",
            duration: 1,
            ease: "expo.inOut",
          });
        }
      });
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
