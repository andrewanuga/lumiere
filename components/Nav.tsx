"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position:"fixed",top:0,left:0,right:0,zIndex:500,
        display:"flex",alignItems:"center",justifyContent:"space-between",
        padding: scrolled ? "20px 64px" : "36px 64px",
        background: scrolled ? "rgba(6,6,10,0.88)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition:"padding .5s,background .5s,border-color .5s,backdrop-filter .5s",
      }}
    >
      <Link href="/" style={{
        fontFamily:"var(--font-serif)",fontSize:20,fontWeight:400,
        letterSpacing:".06em",color:"var(--text)",textDecoration:"none",
        display:"flex",alignItems:"center",gap:4,
      }}>
        Lumière<span style={{color:"var(--gold)",fontSize:26,lineHeight:.8}}>·</span>
      </Link>

      <ul style={{display:"flex",gap:40,listStyle:"none"}} className="hide-mobile">
        {["Work","Services","Studio","Contact"].map(item => (
          <li key={item}>
            <Link href={`#${item.toLowerCase()}`} style={{
              fontFamily:"var(--font-mono)",fontSize:10,
              letterSpacing:".22em",textTransform:"uppercase",
              color:"var(--muted)",textDecoration:"none",
              transition:"color .25s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
            >{item}</Link>
          </li>
        ))}
      </ul>

      <button className="btn-gold" style={{cursor:"none"}}>
        Book a Session
      </button>
    </nav>
  );
}
