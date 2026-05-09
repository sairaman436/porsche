import "./globals.css";
import TransitionLink from "../components/TransitionLink";
import GlobalCurtain from "../components/GlobalCurtain";
import dynamic from "next/dynamic";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-playfair" });

const TargetCursor = dynamic(() => import("../components/TargetCursor"), { ssr: false });
export const metadata = {
  title: "Porsche 911 T-Hybrid | The New Standard",
  description: "Experience the next evolution of the iconic 911. Hybrid power meets timeless design.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} bg-ln-bg text-ln-text cursor-none md:cursor-none`}>
        <TargetCursor />
        <GlobalCurtain />
        <div className="organic-bg" />

        {/* ===== GLASSMORPHIC NAVIGATION ===== */}
        <nav className="fixed top-0 left-0 w-full z-50 glass px-8 py-5 flex justify-between items-center">
          <TransitionLink href="/" className="flex flex-col leading-none">
            <span className="font-serif font-black text-xl tracking-tight italic text-ln-text">PORSCHE</span>
            <span className="font-sans font-extrabold text-[10px] tracking-[0.3em] text-ln-accent bg-ln-dark px-2 py-0.5 uppercase">911 T-Hybrid</span>
          </TransitionLink>

          <div className="hidden md:flex items-center gap-10 text-[11px] font-sans font-bold tracking-[0.15em] uppercase">
            <TransitionLink href="/" className="squiggle-hover text-ln-muted hover:text-ln-text transition-colors">Home</TransitionLink>
            <TransitionLink href="/models" className="squiggle-hover text-ln-muted hover:text-ln-text transition-colors">Models</TransitionLink>
            <TransitionLink href="/engineering" className="squiggle-hover text-ln-muted hover:text-ln-text transition-colors">Engineering</TransitionLink>
            <TransitionLink href="/heritage" className="squiggle-hover text-ln-muted hover:text-ln-text transition-colors">Heritage</TransitionLink>
            <TransitionLink href="/achievements" className="squiggle-hover text-ln-muted hover:text-ln-text transition-colors">Motorsport</TransitionLink>
            <TransitionLink href="/gallery" className="squiggle-hover text-ln-muted hover:text-ln-text transition-colors">Gallery</TransitionLink>
          </div>

          <button className="bg-ln-accent text-ln-dark font-sans font-black text-[11px] tracking-[0.1em] uppercase px-6 py-3 hover:scale-105 transition-transform hidden md:block">Configure</button>
        </nav>

        <main className="relative z-10">{children}</main>

        {/* ===== FOOTER ===== */}
        <footer className="relative z-10 border-t border-ln-border bg-ln-dark px-8 md:px-16 py-16">
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-serif font-black text-2xl italic text-white mb-4">PORSCHE</h4>
              <p className="text-white/50 text-sm font-sans leading-relaxed">
                There is no substitute. Since 1931, Porsche has pushed the boundaries of performance, design, and engineering from Stuttgart to the world.
              </p>
            </div>
            <div>
              <h5 className="font-sans font-bold text-[11px] tracking-[0.2em] uppercase text-white/30 mb-6">Explore</h5>
              <div className="flex flex-col gap-3">
                <TransitionLink href="/models" className="text-sm font-sans text-white/50 hover:text-ln-accent transition-colors">All Models</TransitionLink>
                <TransitionLink href="/engineering" className="text-sm font-sans text-white/50 hover:text-ln-accent transition-colors">Engineering</TransitionLink>
                <TransitionLink href="/heritage" className="text-sm font-sans text-white/50 hover:text-ln-accent transition-colors">Heritage</TransitionLink>
                <TransitionLink href="/achievements" className="text-sm font-sans text-white/50 hover:text-ln-accent transition-colors">Motorsport</TransitionLink>
                <TransitionLink href="/gallery" className="text-sm font-sans text-white/50 hover:text-ln-accent transition-colors">Gallery</TransitionLink>
              </div>
            </div>
            <div>
              <h5 className="font-sans font-bold text-[11px] tracking-[0.2em] uppercase text-white/30 mb-6">Connect</h5>
              <div className="flex flex-col gap-3">
                <span className="text-sm font-sans text-white/50 hover:text-ln-accent transition-colors cursor-pointer">Instagram</span>
                <span className="text-sm font-sans text-white/50 hover:text-ln-accent transition-colors cursor-pointer">YouTube</span>
                <span className="text-sm font-sans text-white/50 hover:text-ln-accent transition-colors cursor-pointer">X / Twitter</span>
              </div>
            </div>
          </div>
          <div className="max-w-screen-xl mx-auto mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
            <p className="text-white/30 text-xs font-sans">&copy; 2026 Porsche AG. All rights reserved.</p>
            <p className="text-white/30 text-xs font-sans tracking-widest uppercase">Stuttgart, Germany</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
