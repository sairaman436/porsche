"use client";
import { useEffect, useState } from "react";

export default function Masonry({ items, columns = 3 }) {
  const [cols, setCols] = useState(columns);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCols(1);
      else if (window.innerWidth < 1024) setCols(2);
      else setCols(columns);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    setLoaded(true);
    return () => window.removeEventListener("resize", handleResize);
  }, [columns]);

  const colArrays = Array.from({ length: cols }, () => []);
  items.forEach((item, idx) => {
    colArrays[idx % cols].push({ ...item, globalIdx: idx });
  });

  return (
    <div className="flex gap-4 w-full">
      {colArrays.map((col, colIdx) => (
        <div key={colIdx} className="flex-1 flex flex-col gap-4">
          {col.map((item) => (
            <div
              key={item.globalIdx}
              className="group relative overflow-hidden cursor-pointer"
              style={{
                height: item.height || "280px",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${item.globalIdx * 0.06}s`,
                background: "rgba(255, 255, 255, 0.7)",
                border: "1px solid rgba(0, 0, 0, 0.08)",
                boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
              
              <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: "linear-gradient(105deg, transparent 30%, rgba(204,255,0,0.08) 40%, rgba(204,255,0,0.18) 50%, rgba(204,255,0,0.08) 60%, transparent 70%)",
                }}
              />

              <div className="absolute bottom-0 left-0 right-0 z-30 p-5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-sans font-bold text-[9px] tracking-[0.3em] uppercase text-ln-accent opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-400 bg-ln-dark px-2 py-0.5 inline-block mb-1">{item.tag}</p>
                    <h4 className="font-serif font-black italic text-xl uppercase text-ln-text group-hover:text-ln-dark transition-colors duration-300">{item.title}</h4>
                  </div>
                  <div className="w-8 h-8 border border-ln-border group-hover:border-ln-accent group-hover:bg-ln-accent flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-ln-text group-hover:text-ln-dark transition-colors">
                      <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-ln-light transform group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
