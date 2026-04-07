"use client";
import { useEffect, useRef } from "react";

export default function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.body.scrollHeight - window.innerHeight;
      const pct      = total > 0 ? scrolled / total : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${pct})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position:"fixed",top:0,left:0,right:0,height:1,
        background:"linear-gradient(90deg,var(--gold),var(--gold-bright))",
        zIndex:9999,transformOrigin:"left",transform:"scaleX(0)",
      }}
    />
  );
}
