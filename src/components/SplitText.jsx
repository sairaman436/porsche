'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SplitText({ 
  text, 
  className = "", 
  delay = 0, 
  type = "words", // "words" or "chars"
  stagger = 0.05,
  threshold = 0.1
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    let items;

    // Basic splitting (for more complex splitting, libraries like SplitType are better, 
    // but we can do a simple one here for efficiency)
    if (type === "words") {
      const words = text.split(' ');
      el.innerHTML = words.map(word => `<span class="split-item inline-block whitespace-nowrap">${word}&nbsp;</span>`).join('');
      items = el.querySelectorAll('.split-item');
    } else {
      const chars = text.split('');
      el.innerHTML = chars.map(char => `<span class="split-item inline-block">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
      items = el.querySelectorAll('.split-item');
    }

    gsap.fromTo(items, 
      { 
        y: 100, 
        opacity: 0,
        rotateX: -90,
        transformOrigin: "0% 50% -50"
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: stagger,
        delay: delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      if (ScrollTrigger.getById(el.id)) ScrollTrigger.getById(el.id).kill();
    };
  }, [text, type, delay, stagger]);

  return (
    <div 
      ref={containerRef} 
      className={`perspective-1000 ${className}`}
      style={{ perspective: '1000px' }}
    >
      {text}
    </div>
  );
}
