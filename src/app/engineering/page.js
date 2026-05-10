"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ScrollStack = dynamic(() => import("../../components/ScrollStack"), { ssr: false });
const ScrollReveal = dynamic(() => import("../../components/ScrollReveal"), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const techCards = [
  { num: "01", tag: "Powertrain", title: "The Boxer Engine", desc: "Opposing cylinders, naturally balanced. The center of gravity stays infinitely low. The unmistakable acoustic signature of Porsche." },
  { num: "02", tag: "Transmission", title: "Porsche PDK", desc: "Dual-clutch perfection. Shifts in milliseconds without interrupting power flow. The comfort of an automatic, the soul of a manual." },
  { num: "03", tag: "Aerodynamics", title: "Active Aero (PAA)", desc: "Adaptive cooling flaps, extending spoilers, and active diffusers. Seamlessly transitioning from low-drag to high-downforce." },
  { num: "04", tag: "Braking", title: "PCCB Ceramics", desc: "Carbon-ceramic brake discs — 50% lighter than cast-iron with fade-free motorsport stopping power." },
  { num: "05", tag: "Handling", title: "Rear-Axle Steering", desc: "Virtual wheelbase adjustment. Tight corners at low speed, unparalleled stability at high speed." },
  { num: "06", tag: "Electrification", title: "800V Architecture", desc: "The backbone of E-Performance. Lighter wiring, consistent output, ultra-fast charging in under 25 minutes." },
  { num: "07", tag: "Sustainability", title: "eFuels", desc: "Synthetic fuels from water and captured CO2. Nearly CO2-neutral driving from renewable wind energy." },
  { num: "08", tag: "Revolution", title: "T-Hybrid System", desc: "Electric exhaust turbocharger plus motor in PDK. Zero turbo lag. Devastating, instantaneous torque." },
];

export default function Engineering() {
  useEffect(() => {
    // Magnetic Effect for technical tags
    const magneticElements = document.querySelectorAll(".magnetic");
    magneticElements.forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);
        gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: "power2.out" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="min-h-screen bg-ln-bg relative overflow-hidden cursor-none">
      
      {/* Precision Engineering Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />

      {/* Floating Technical Annotations */}
      <div className="absolute top-[20%] left-[2%] h-[60%] opacity-[0.15] font-mono text-[9px] text-ln-dark z-0 select-none pointer-events-none [writing-mode:vertical-rl] rotate-180 uppercase tracking-[0.5em] hidden lg:block">
        ENGINEERING_DATA_STREAM // COMPONENT_ID: 911-SR-2024 // TOLERANCE: 0.0001MM // MATERIAL: T6-ALUMINUM
      </div>
      <div className="absolute top-[30%] right-[2%] h-[60%] opacity-[0.15] font-mono text-[9px] text-ln-dark z-0 select-none pointer-events-none [writing-mode:vertical-rl] uppercase tracking-[0.5em] hidden lg:block">
        SYSTEM_VOLTAGE: 800V // THERMAL_LIMIT: 140C // PRESSURE: 1.4 BAR // SHIFT_TIME: 50MS
      </div>
      
      {/* Noise Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />

      {/* Massive Engineering Watermarks */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-full text-center z-0 select-none pointer-events-none opacity-[0.03]">
        <h2 className="font-serif font-black italic text-[22vw] leading-none uppercase text-ln-text tracking-tighter">
          ENGINEERING
        </h2>
      </div>

      <div className="absolute top-[40%] -left-[10%] opacity-[0.03] font-serif font-black italic text-[15vw] uppercase text-ln-text z-0 select-none pointer-events-none [writing-mode:vertical-rl] rotate-180">
        DRIVETRAIN
      </div>

      <div className="absolute top-[60%] -right-[5%] opacity-[0.03] font-serif font-black italic text-[12vw] uppercase text-ln-text z-0 select-none pointer-events-none">
        PRECISION
      </div>

      <div className="absolute bottom-[10%] left-[5%] opacity-[0.03] font-serif font-black italic text-[18vw] uppercase text-ln-text z-0 select-none pointer-events-none tracking-tight">
        PERFORMANCE
      </div>

      {/* Fixed heading that stays visible */}
      <div className="pt-32 pb-48 px-8 md:px-16 bg-ln-bg relative z-10">
        <div className="max-w-screen-xl mx-auto">
          <ScrollReveal>
            <p className="font-sans font-black text-[10px] tracking-[0.4em] uppercase text-ln-accent mb-4 bg-ln-dark px-3 py-1 inline-block">Technical_Spec_v2.0</p>
            <h1 className="font-serif font-black italic text-[10vw] md:text-[7vw] leading-[0.85] uppercase text-ln-text">
              Uncompromising
            </h1>
            <h1 className="font-serif font-black italic text-[12vw] md:text-[8vw] leading-[0.85] uppercase text-ln-text">
              Precision<span className="text-ln-accent">.</span>
            </h1>
            <p className="font-sans text-sm text-ln-muted mt-6 max-w-lg">
              Scroll through the 8 engineering pillars that define every Porsche.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* ScrollStack section */}
      <ScrollStack cards={techCards} />

      {/* Bottom stats: ECU Readout Style */}
      <div className="px-8 md:px-16 py-32 bg-ln-dark relative z-20">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Powertrain Force", value: "541 HP", sub: "Combined hybrid output / ECU Stage 1", unit: "hp" },
            { label: "Velocity Delta", value: "2.9s", sub: "0-100 km/h / Launch Control", unit: "sec" },
            { label: "Terminal Speed", value: "315 km/h", sub: "V-Max / Aerodynamic Limit", unit: "km/h" },
          ].map((stat, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="bg-black/40 backdrop-blur-xl border-l-4 border-ln-accent p-8 group hover:bg-black/60 transition-all duration-500 magnetic">
                <div className="flex justify-between items-start mb-6 pointer-events-none">
                  <p className="font-sans font-bold text-[10px] tracking-[0.3em] uppercase text-white/30">{stat.label}</p>
                  <span className="text-ln-accent/20 font-black text-xs italic">{stat.unit}</span>
                </div>
                <h3 className="font-serif font-black italic text-6xl text-white mb-4 group-hover:text-ln-accent transition-colors duration-500 pointer-events-none">{stat.value}</h3>
                <div className="h-[2px] w-full bg-white/10 mb-4 overflow-hidden pointer-events-none">
                  <div className="h-full bg-ln-accent w-0 group-hover:w-full transition-all duration-1000 ease-out" />
                </div>
                <p className="font-sans text-[10px] tracking-widest text-white/40 uppercase pointer-events-none">{stat.sub}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
