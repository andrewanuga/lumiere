"use client";
import { useEffect, useRef } from "react";

const services = [
  { n:"01", name:"Portrait Sessions",    tags:["Studio","Location","Family"],           price:"From ₦180,000" },
  { n:"02", name:"Wedding Coverage",     tags:["Full Day","Documentary","Fine Art"],    price:"From ₦650,000" },
  { n:"03", name:"Commercial & Brand",   tags:["Product","Campaign","Lifestyle"],       price:"Custom Quote"  },
  { n:"04", name:"Editorial",            tags:["Magazine","Fashion","Concept"],         price:"Custom Quote"  },
  { n:"05", name:"Events & Occasions",   tags:["Corporate","Milestone","Cultural"],     price:"From ₦300,000" },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const load = async () => {
      const g  = await import("gsap");
      const st = await import("gsap/ScrollTrigger");
      const gsap = g.gsap || g.default;
      const { ScrollTrigger } = st;
      gsap.registerPlugin(ScrollTrigger);

      const h2 = sectionRef.current?.querySelector("h2");
      if (h2) {
        gsap.fromTo(h2,
          { opacity:0, y:50 },
          { opacity:1, y:0, duration:1, ease:"expo.out",
            scrollTrigger:{ trigger:sectionRef.current, start:"top 80%" } }
        );
      }

      gsap.fromTo(sectionRef.current?.querySelectorAll(".svc-item") ?? [],
        { opacity:0, x:-40 },
        { opacity:1, x:0, stagger:.1, duration:.8, ease:"power3.out",
          scrollTrigger:{ trigger:sectionRef.current, start:"top 75%" } }
      );
    };
    load();
  }, []);

  return (
    <section ref={sectionRef} id="services" style={{
      padding:"120px 64px",background:"var(--bg)",position:"relative",zIndex:1,
    }}>
      <p style={{
        fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:".32em",
        textTransform:"uppercase",color:"var(--gold)",marginBottom:20,
        display:"flex",alignItems:"center",gap:10,
      }}>
        <span style={{width:18,height:1,background:"var(--gold)"}}/>
        What We Offer
      </p>
      <h2 style={{
        fontFamily:"var(--font-serif)",fontSize:"clamp(38px,5vw,68px)",
        fontWeight:300,lineHeight:1.05,letterSpacing:"-.03em",marginBottom:72,opacity:0,
      }}>
        Crafted for every<br/><em style={{color:"var(--gold)"}}>occasion</em>
      </h2>

      <div>
        {services.map((s, i) => (
          <div
            key={i}
            className="svc-item"
            data-cursor
            style={{
              display:"grid",gridTemplateColumns:"48px 1fr 220px 120px 60px",
              alignItems:"center",gap:32,padding:"28px 0",
              borderBottom:"1px solid var(--border)",
              borderTop: i===0 ? "1px solid var(--border)" : undefined,
              cursor:"none",position:"relative",overflow:"hidden",
              transition:"padding .3s",opacity:0,
            }}
            onMouseEnter={e => (e.currentTarget.style.paddingLeft = "16px")}
            onMouseLeave={e => (e.currentTarget.style.paddingLeft = "0px")}
          >
            <span style={{fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:".2em",color:"var(--faint)",textAlign:"right"}}>{s.n}</span>
            <span style={{fontFamily:"var(--font-serif)",fontSize:24,fontWeight:400}}>{s.name}</span>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {s.tags.map(t => (
                <span key={t} style={{
                  fontFamily:"var(--font-mono)",fontSize:8,letterSpacing:".18em",textTransform:"uppercase",
                  padding:"4px 12px",border:"1px solid var(--border2)",color:"var(--muted)",
                }}>{t}</span>
              ))}
            </div>
            <span style={{fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:".1em",color:"var(--muted)"}}>{s.price}</span>
            <span style={{
              fontFamily:"var(--font-mono)",fontSize:12,color:"var(--gold)",
              textAlign:"right",transition:"letter-spacing .3s",
            }}
            onMouseEnter={e => (e.currentTarget.style.letterSpacing = "6px")}
            onMouseLeave={e => (e.currentTarget.style.letterSpacing = "normal")}
            >→</span>
          </div>
        ))}
      </div>
    </section>
  );
}
