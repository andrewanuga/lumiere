"use client";
import { useEffect, useRef } from "react";

const testimonials = [
  {
    q:"Lumière didn't just photograph our wedding — they felt the room. Every frame holds something completely real.",
    name:"Amara & Kola O.", role:"Wedding clients · Lagos 2024", initials:"AK",
  },
  {
    q:"Our campaign visuals outperformed every previous shoot. The mastery of available light is in another league.",
    name:"Zainab Afolabi", role:"Creative Director · Kéhi Beauty", initials:"ZA",
  },
  {
    q:"I finally have portraits I'm proud to display. They found something in me I hadn't seen in myself before.",
    name:"Tunde Bankole", role:"Portrait client · Abuja", initials:"TB",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const load = async () => {
      const g  = await import("gsap");
      const st = await import("gsap/ScrollTrigger");
      const gsap = g.gsap || g.default;
      const { ScrollTrigger } = st;
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(sectionRef.current?.querySelector("h2"),
        { opacity:0, y:50 },
        { opacity:1, y:0, duration:1, ease:"expo.out",
          scrollTrigger:{ trigger:sectionRef.current, start:"top 80%" } }
      );

      gsap.fromTo(sectionRef.current?.querySelectorAll(".testi-card") ?? [],
        { opacity:0, y:70, rotateX:15 },
        {
          opacity:1, y:0, rotateX:0,
          stagger:.15, duration:1, ease:"expo.out",
          scrollTrigger:{ trigger:sectionRef.current, start:"top 75%" },
        }
      );
    };
    load();

    // 3D tilt on cards
    document.querySelectorAll(".testi-card").forEach(card => {
      const el = card as HTMLElement;
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        const x = ((e as MouseEvent).clientX - r.left) / r.width  - 0.5;
        const y = ((e as MouseEvent).clientY - r.top)  / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${x*10}deg) rotateX(${-y*7}deg) translateY(-6px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateY(0)";
      });
    });
  }, []);

  return (
    <section ref={sectionRef} style={{
      padding:"120px 64px",background:"var(--bg2)",position:"relative",zIndex:1,
    }}>
      <p style={{
        fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:".32em",
        textTransform:"uppercase",color:"var(--gold)",marginBottom:20,
        display:"flex",alignItems:"center",gap:10,
      }}>
        <span style={{width:18,height:1,background:"var(--gold)"}}/>
        Client Words
      </p>
      <h2 style={{
        fontFamily:"var(--font-serif)",fontSize:"clamp(38px,5vw,68px)",
        fontWeight:300,lineHeight:1.05,letterSpacing:"-.03em",marginBottom:72,opacity:0,
      }}>
        What people<br/><em style={{color:"var(--gold)"}}>remember</em>
      </h2>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:28}}>
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="testi-card"
            data-cursor
            style={{opacity:0,transformStyle:"preserve-3d",transition:"transform .14s ease-out"}}
          >
            <span style={{
              fontFamily:"var(--font-serif)",fontSize:80,fontWeight:300,
              color:"var(--gold)",opacity:.22,lineHeight:.5,marginBottom:24,display:"block",
            }}>&ldquo;</span>
            <p style={{
              fontFamily:"var(--font-serif)",fontStyle:"italic",
              fontSize:16,lineHeight:1.82,color:"rgba(240,236,224,.78)",marginBottom:32,
            }}>{t.q}</p>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{
                width:36,height:36,borderRadius:"50%",flexShrink:0,
                background:"var(--gold2)",border:"1px solid rgba(201,167,106,.3)",
                display:"flex",alignItems:"center",justifyContent:"center",
                fontFamily:"var(--font-mono)",fontSize:10,color:"var(--gold)",
              }}>{t.initials}</div>
              <div>
                <div style={{fontSize:13,fontWeight:500}}>{t.name}</div>
                <div style={{fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:".1em",color:"var(--muted)",marginTop:3}}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
