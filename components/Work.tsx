"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const projects = [
  {
    cat:"Portrait",title:"Elara — Natural Light",
    src:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80&auto=format&fit=crop",
    size:"tall",
  },
  {
    cat:"Wedding",title:"The Adeyemi Ceremony",
    src:"https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80&auto=format&fit=crop",
    size:"wide",
  },
  {
    cat:"Editorial",title:"Vogue West Africa",
    src:"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=80&auto=format&fit=crop",
    size:"tall",
  },
  {
    cat:"Commercial",title:"Kéhi Beauty Campaign",
    src:"https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=700&q=80&auto=format&fit=crop",
    size:"wide",
  },
  {
    cat:"Portrait",title:"Shadow & Gold Series",
    src:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=700&q=80&auto=format&fit=crop",
    size:"tall",
  },
  {
    cat:"Wedding",title:"Rooftop, Lagos",
    src:"https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=700&q=80&auto=format&fit=crop",
    size:"wide",
  },
];

const filters = ["All","Portrait","Wedding","Editorial","Commercial"];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("All");

  useEffect(() => {
    let gsap: any, ScrollTrigger: any;
    const load = async () => {
      const g  = await import("gsap");
      const st = await import("gsap/ScrollTrigger");
      gsap = g.gsap || g.default;
      ScrollTrigger = st.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // ── HEADING reveal ──
      if (headRef.current) {
        gsap.fromTo(headRef.current.querySelectorAll(".anim-word"),
          { opacity:0, y:50 },
          {
            opacity:1, y:0, stagger:.1, duration:.9, ease:"expo.out",
            scrollTrigger:{ trigger:headRef.current, start:"top 85%" },
          }
        );
      }

      // ── HORIZONTAL SCROLL ──
      const track = trackRef.current;
      if (track && window.innerWidth > 768) {
        const dist = track.scrollWidth - window.innerWidth + 128;
        gsap.to(track, {
          x: -dist,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${dist}`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
          },
        });
      }

      // ── 3D card tilts ──
      document.querySelectorAll(".work-card").forEach(card => {
        const el = card as HTMLElement;
        el.addEventListener("mousemove", e => {
          const r = el.getBoundingClientRect();
          const x = ((e as MouseEvent).clientX - r.left) / r.width  - 0.5;
          const y = ((e as MouseEvent).clientY - r.top)  / r.height - 0.5;
          el.style.transform = `perspective(1000px) rotateY(${x*14}deg) rotateX(${-y*10}deg) scale(1.03)`;
        });
        el.addEventListener("mouseleave", () => {
          el.style.transform = "perspective(1000px) rotateY(0) rotateX(0) scale(1)";
        });
      });
    };
    load();
  }, []);

  const visible = active === "All" ? projects : projects.filter(p => p.cat === active);

  return (
    <section ref={sectionRef} id="work" style={{background:"var(--bg)",position:"relative",zIndex:1}}>
      <div style={{padding:"100px 64px 60px"}}>
        <div ref={headRef} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:60}}>
          <div>
            <p className="anim-word" style={{
              fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:".32em",
              textTransform:"uppercase",color:"var(--gold)",marginBottom:20,
              display:"flex",alignItems:"center",gap:10,
            }}>
              <span style={{width:18,height:1,background:"var(--gold)"}}/>
              Selected Work
            </p>
            <h2 className="anim-word" style={{
              fontFamily:"var(--font-serif)",
              fontSize:"clamp(40px,5.5vw,70px)",fontWeight:300,
              lineHeight:1.0,letterSpacing:"-.03em",
            }}>
              A story in every<br/><em style={{color:"var(--gold)"}}>frame</em>
            </h2>
          </div>
          <div style={{display:"flex",gap:0}} className="hide-mobile">
            {filters.map(f => (
              <button key={f} onClick={() => setActive(f)} style={{
                fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:".2em",
                textTransform:"uppercase",padding:"8px 16px",
                background:"none",border:"none",borderBottom:`1px solid ${active===f?"var(--gold)":"transparent"}`,
                color: active===f ? "var(--text)" : "var(--muted)",
                cursor:"none",transition:"color .2s,border-color .2s",
              }}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div ref={trackRef} className="h-scroll-track" style={{padding:"0 64px 80px"}}>
        {visible.map((p, i) => (
          <div
            key={i}
            className="work-card gallery-item"
            data-cursor
            style={{
              flex:"0 0 auto",
              width: p.size === "tall" ? 360 : 520,
              height: p.size === "tall" ? 520 : 380,
              transition:"transform .15s ease-out",
              transformStyle:"preserve-3d",
            }}
          >
            <div className="img-wrap" style={{position:"absolute",inset:0}}>
              <Image
                src={p.src}
                alt={p.title}
                fill
                style={{objectFit:"cover"}}
                unoptimized
              />
            </div>
            <div className="overlay">
              <p style={{fontFamily:"var(--font-mono)",fontSize:8,letterSpacing:".28em",textTransform:"uppercase",color:"var(--gold)",marginBottom:6}}>
                {p.cat}
              </p>
              <p style={{fontFamily:"var(--font-serif)",fontSize:20,fontWeight:400,color:"var(--text)"}}>
                {p.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
