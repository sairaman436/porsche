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
      const staggerDelay = isInitialLoad ? 1.2 : 0.05;
      
      if (isInitialLoad) {
        window.hasLoadedOnce = true;
      }

      // Fade out background text and microcopy
      gsap.to([bgText, micros], { 
        opacity: 0, 
        duration: 0.3, 
        ease: "power2.in", 
        delay: staggerDelay 
      });

      // Slide letters UP out of the top of their bounding box mask
      gsap.to(letters, {
        yPercent: -100,
        duration: 0.5,
        stagger: 0.03,
        ease: "expo.in",
        delay: staggerDelay,
        onComplete: () => {
          // Then animate the frosted curtain away
          gsap.to(curtain, {
            scaleY: 0,
            transformOrigin: "top",
            duration: 0.8,
            ease: "power4.inOut",
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
