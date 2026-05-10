"use client";
import { useEffect, useRef } from "react";

export default function TargetCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.25;
      cursorY += (mouseY - cursorY) * 0.25;
      cursor.style.transform = `translate(${cursorX - 5}px, ${cursorY - 5}px)`;

      ringX += (mouseX - ringX) * 0.08;
      ringY += (mouseY - ringY) * 0.08;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;

      requestAnimationFrame(animate);
    };

    const onEnter = () => {
      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.borderColor = "#CCFF00";
      ring.style.opacity = "1";
      cursor.style.background = "#CCFF00";
    };
    const onLeave = () => {
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.borderColor = "rgba(26, 26, 26, 0.3)";
      ring.style.opacity = "0.5";
      cursor.style.background = "#1A1A1A";
    };

    window.addEventListener("mousemove", onMouseMove);

    const interactiveEls = document.querySelectorAll("a, button, .lando-card, .tilt-target");
    interactiveEls.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      interactiveEls.forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ width: 10, height: 10, borderRadius: "50%", background: "#1A1A1A" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{
          width: 40, height: 40, borderRadius: "50%",
          border: "1.5px solid rgba(26, 26, 26, 0.3)",
          opacity: 0.5,
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, opacity 0.3s ease",
        }}
      />
    </>
  );
}
