"use client";
import { useEffect, useRef } from "react";

const steps = [
  { n:"01", title:"Discovery", desc:"We start by listening — understanding your vision, your people, and the feeling you want to carry forward." },
  { n:"02", title:"Direction", desc:"Light, location, mood board. Every detail pre-planned so we arrive with purpose and leave nothing to chance." },
  { n:"03", title:"Capture",   desc:"We work efficiently, invisibly. You feel present; we handle the rest — directing only when truly needed." },
  { n:"04", title:"Delivery",  desc:"Hand-curated, color-graded, and delivered to your private gallery within 10 business days." },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      const g  = await import("gsap");
      const st = await import("gsap/ScrollTrigger");
      const gsap = g.gsap || g.default;
      const { ScrollTrigger } = st;
      gsap.registerPlugin(ScrollTrigger);

      const h2 = sectionRef.current?.querySelector("h2");
      if (h2) {
        gsap.fromTo(h2, { opacity:0, y:50 }, {
          opacity:1, y:0, duration:1, ease:"expo.out",
          scrollTrigger:{ trigger:h2, start:"top 85%" },
        });
      }

      // Progress line scrub
      if (lineRef.current) {
        gsap.to(lineRef.current.querySelector(".process-line-fill"), {
          scaleX: 1, ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 1,
          },
        });
      }

      // Cards stagger
      gsap.fromTo(sectionRef.current?.querySelectorAll(".proc-card-item") ?? [],
        { opacity:0, y:60, rotateX:20 },
        {
          opacity:1, y:0, rotateX:0,
          stagger:.15, duration:.9, ease:"expo.out",
          scrollTrigger:{ trigger:sectionRef.current, start:"top 70%" },
        }
      );
    };
    load();
  }, []);

  return (
    <section ref={sectionRef} id="process" style={{
      padding:"120px 64px",background:"var(--bg2)",position:"relative",zIndex:1,
    }}>
      <p style={{
        fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:".32em",
        textTransform:"uppercase",color:"var(--gold)",marginBottom:20,
        display:"flex",alignItems:"center",gap:10,
      }}>
        <span style={{width:18,height:1,background:"var(--gold)"}}/>
        How We Work
      </p>
      <h2 style={{
        fontFamily:"var(--font-serif)",fontSize:"clamp(38px,5vw,68px)",
        fontWeight:300,lineHeight:1.05,letterSpacing:"-.03em",marginBottom:80,
        opacity:0,
      }}>
        Process built on<br/><em style={{color:"var(--gold)"}}>intention</em>
      </h2>

      {/* Progress line */}
      <div ref={lineRef} style={{position:"relative",marginBottom:48}}>
        <div className="process-line">
          <div className="process-line-fill"/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1}}>
          {steps.map((_, i) => (
            <div key={i} style={{paddingTop:24,textAlign:"center"}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:"var(--gold)",margin:"0 auto",boxShadow:"0 0 16px rgba(201,167,106,.5)"}}/>
            </div>
          ))}
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"var(--border)"}}>
        {steps.map((s, i) => (
          <div key={i} className="proc-card-item line-sweep" data-cursor style={{
            background:"var(--bg2)",padding:"44px 36px",position:"relative",
            overflow:"hidden",cursor:"none",opacity:0,
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--bg3)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--bg2)")}
          >
            <span style={{
              position:"absolute",right:16,top:8,fontFamily:"var(--font-serif)",
              fontSize:100,fontWeight:300,color:"rgba(201,167,106,.04)",lineHeight:1,userSelect:"none",
            }}>{s.n}</span>
            <span style={{fontFamily:"var(--font-mono)",fontSize:10,letterSpacing:".2em",color:"var(--gold)",marginBottom:28,display:"block"}}>{s.n}</span>
            <div style={{fontFamily:"var(--font-serif)",fontSize:24,fontWeight:400,marginBottom:16,lineHeight:1.2}}>{s.title}</div>
            <p style={{fontSize:13,lineHeight:1.8,color:"var(--muted)"}}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
