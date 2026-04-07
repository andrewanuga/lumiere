"use client";
import { useEffect, useRef } from "react";

const stats = [
  { value:400, suffix:"+", label:"Projects Complete" },
  { value:12,  suffix:"",  label:"Industry Awards"   },
  { value:98,  suffix:"%", label:"Client Return Rate" },
  { value:6,   suffix:"+", label:"Years Shooting"    },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggered  = useRef(false);

  useEffect(() => {
    const load = async () => {
      const g  = await import("gsap");
      const st = await import("gsap/ScrollTrigger");
      const gsap = g.gsap || g.default;
      const { ScrollTrigger } = st;
      gsap.registerPlugin(ScrollTrigger);

      // Section reveal
      gsap.fromTo(sectionRef.current?.querySelectorAll(".stat-item") ?? [],
        { opacity:0, y:50 },
        {
          opacity:1, y:0, stagger:.12, duration:.9, ease:"expo.out",
          scrollTrigger:{ trigger:sectionRef.current, start:"top 80%" },
        }
      );

      // Count up
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          if (triggered.current) return;
          triggered.current = true;
          document.querySelectorAll(".counter-num").forEach((el, i) => {
            const target = stats[i].value;
            gsap.fromTo({ val:0 }, { val:target }, {
              duration: 2.2,
              ease: "power2.out",
              onUpdate() { el.textContent = Math.round((this as any).targets()[0].val) + stats[i].suffix; },
            });
          });
        },
      });
    };
    load();
  }, []);

  return (
    <section ref={sectionRef} style={{
      padding:"100px 64px",
      background:"var(--bg)",
      borderTop:"1px solid var(--border)",
      borderBottom:"1px solid var(--border)",
      position:"relative",zIndex:1,
    }}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"var(--border)"}}>
        {stats.map((s, i) => (
          <div key={i} className="stat-item" style={{
            background:"var(--bg)",padding:"48px 40px",
            borderRight: i < stats.length - 1 ? "1px solid var(--border)" : undefined,
            opacity:0,
          }}>
            <div className="counter-num">0{s.suffix}</div>
            <div style={{
              fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:".22em",
              textTransform:"uppercase",color:"var(--muted)",marginTop:12,
            }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
