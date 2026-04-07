'use client';

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      borderTop:"1px solid var(--border)",
      padding:"56px 64px 40px",
      display:"grid",gridTemplateColumns:"1fr auto 1fr",
      gap:40,alignItems:"start",
      position:"relative",zIndex:1,background:"var(--bg)",
    }}>
      <div>
        <div style={{
          fontFamily:"var(--font-serif)",fontSize:22,fontWeight:400,marginBottom:12,
        }}>
          Lumière<span style={{color:"var(--gold)"}}>·</span>
        </div>
        <p style={{
          fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:".18em",
          color:"var(--muted)",lineHeight:1.7,
        }}>
          Photography studio<br/>Lagos · Abuja · Worldwide
        </p>
      </div>

      <nav style={{display:"flex",flexDirection:"column",gap:14,alignItems:"center"}}>
        {["Work","Services","Studio","Contact"].map(item => (
          <Link key={item} href={`#${item.toLowerCase()}`} style={{
            fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:".22em",
            textTransform:"uppercase",color:"var(--muted)",textDecoration:"none",
            transition:"color .2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
          >{item}</Link>
        ))}
      </nav>

      <div style={{textAlign:"right"}}>
        <div style={{display:"flex",gap:20,justifyContent:"flex-end",marginBottom:28}}>
          {["Instagram","Behance","LinkedIn"].map(s => (
            <Link key={s} href="#" style={{
              fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:".18em",
              textTransform:"uppercase",color:"var(--muted)",textDecoration:"none",
              transition:"color .2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
            >{s}</Link>
          ))}
        </div>
        <p style={{
          fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:".1em",
          color:"rgba(240,236,224,.15)",
        }}>
          © 2026 Lumière Studio · All rights reserved
        </p>
      </div>
    </footer>
  );
}
