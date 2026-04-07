"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=85&auto=format&fit=crop",
  hero2:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80&auto=format&fit=crop",
};

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);
  const imgRef      = useRef<HTMLDivElement>(null);
  const h1Ref       = useRef<HTMLHeadingElement>(null);
  const eyebrowRef  = useRef<HTMLParagraphElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const actionsRef  = useRef<HTMLDivElement>(null);
  const footerRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsap: any, ScrollTrigger: any, cleanup: (() => void) | undefined;

    const load = async () => {
      const g  = await import("gsap");
      const st = await import("gsap/ScrollTrigger");
      gsap = g.gsap || g.default;
      ScrollTrigger = st.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // ── SPLIT TEXT CHARACTER ANIMATION ──
      if (h1Ref.current) {
        const text  = h1Ref.current;
        const lines = text.innerHTML.split("<br>");
        text.innerHTML = lines.map(line =>
          line.split("").map(ch =>
            ch === " "
              ? `<span style="display:inline-block;width:.28em">&nbsp;</span>`
              : `<span class="char" style="display:inline-block;opacity:0;transform:translateY(80px) rotate(6deg)">${ch}</span>`
          ).join("")
        ).join("<br>");

        const chars = text.querySelectorAll(".char");
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.9,
          stagger: 0.025,
          ease: "expo.out",
          delay: 0.4,
        });
      }

      // Eyebrow + sub + actions entrance
      gsap.fromTo([eyebrowRef.current], { opacity:0, y:30 }, { opacity:1, y:0, duration:.8, delay:.3, ease:"power3.out" });
      gsap.fromTo([subRef.current],     { opacity:0, y:30 }, { opacity:1, y:0, duration:.8, delay:.9, ease:"power3.out" });
      gsap.fromTo([actionsRef.current], { opacity:0, y:30 }, { opacity:1, y:0, duration:.8, delay:1.1, ease:"power3.out" });
      gsap.fromTo([footerRef.current],  { opacity:0 },       { opacity:1, duration:.8, delay:1.4 });

      // ── HERO IMAGE PARALLAX ──
      if (imgRef.current) {
        gsap.to(imgRef.current.querySelector("img"), {
          y: "20%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // ── HERO SECTION EXIT ──
      gsap.to(h1Ref.current, {
        y: -80,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "60% top",
          end: "bottom top",
          scrub: true,
        },
      });
    };

    load();

    // ── 3D TILT CARD ──
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const xPct = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      const yPct = ((e.clientY - r.top)  / r.height - 0.5) * 2;
      card.style.transform = `rotateY(${xPct * 12}deg) rotateX(${-yPct * 8}deg) scale(1.02)`;
    };
    const onLeave = () => { card.style.transform = "rotateY(0) rotateX(0) scale(1)"; };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight:"100svh",display:"grid",position:"relative",overflow:"hidden",
        padding:"0 64px",gridTemplateRows:"1fr auto",
      }}
    >
      {/* Ambient radial glow */}
      <div style={{
        position:"absolute",inset:0,pointerEvents:"none",zIndex:0,
        background:"radial-gradient(ellipse 55% 50% at 68% 42%, rgba(201,167,106,.07) 0%,transparent 70%), radial-gradient(ellipse 35% 50% at 18% 65%, rgba(201,167,106,.03) 0%,transparent 60%)",
      }}/>

      {/* Fine grid */}
      <div style={{
        position:"absolute",inset:0,pointerEvents:"none",zIndex:0,
        backgroundImage:"linear-gradient(rgba(240,236,224,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(240,236,224,.022) 1px,transparent 1px)",
        backgroundSize:"72px 72px",
        maskImage:"radial-gradient(ellipse at center, black 0%,transparent 70%)",
      }}/>

      {/* Content grid */}
      <div style={{
        alignSelf:"end",paddingBottom:88,paddingTop:160,position:"relative",zIndex:1,
        display:"grid",gridTemplateColumns:"1fr 420px",gap:60,alignItems:"end",
      }}>
        {/* Left */}
        <div>
          <p ref={eyebrowRef} style={{
            fontFamily:"var(--font-mono)",fontSize:10,letterSpacing:".32em",
            textTransform:"uppercase",color:"var(--gold)",marginBottom:36,opacity:0,
            display:"flex",alignItems:"center",gap:12,
          }}>
            <span style={{width:28,height:1,background:"var(--gold)",flexShrink:0}}/>
            Photography Studio · Lagos · Est. 2018
          </p>

          <h1
            ref={h1Ref}
            className="hero-headline"
            style={{
              fontFamily:"var(--font-serif)",
              fontSize:"clamp(60px,9vw,130px)",
              fontWeight:300,lineHeight:.9,letterSpacing:"-.03em",
            }}
          >
            We speak<br /><em style={{fontStyle:"italic",color:"var(--gold)"}}>fluent</em><br />light.
          </h1>

          <p ref={subRef} style={{
            fontSize:15,lineHeight:1.85,color:"var(--muted)",
            maxWidth:480,marginTop:36,opacity:0,
          }}>
            Portraits, weddings, editorial, and commercial work — every frame crafted with obsessive attention to light, composition, and the untranslatable feeling of a moment held forever.
          </p>

          <div ref={actionsRef} style={{display:"flex",gap:16,marginTop:48,opacity:0}}>
            <Link href="#work" className="btn-gold">View Portfolio</Link>
            <Link href="#contact" className="btn-outline">Book a Session</Link>
          </div>
        </div>

        {/* Right — 3D tilt card */}
        <div style={{perspective:1200,paddingBottom:12}} className="hide-mobile">
          <div
            ref={cardRef}
            style={{
              transformStyle:"preserve-3d",
              transition:"transform .12s ease-out",
              position:"relative",cursor:"none",
            }}
            data-cursor
          >
            {/* Main portrait */}
            <div
              ref={imgRef}
              className="parallax-img"
              style={{height:520,position:"relative",background:"#0e0e15"}}
            >
              <Image
                src={IMAGES.hero}
                alt="Portrait photography"
                fill
                style={{objectFit:"cover",objectPosition:"center top"}}
                priority
                unoptimized
              />
              {/* Overlay */}
              <div style={{
                position:"absolute",inset:0,
                background:"linear-gradient(to bottom, transparent 60%, rgba(6,6,10,.6) 100%)",
              }}/>
            </div>

            {/* 3D floating accent card */}
            <div style={{
              position:"absolute",bottom:-28,left:-28,
              width:140,height:180,
              transform:"translateZ(40px)",
              background:"var(--bg2)",
              border:"1px solid var(--border2)",
              overflow:"hidden",
            }} className="float-1 glow-gold">
              <Image
                src={IMAGES.hero2}
                alt="Studio portrait"
                fill
                style={{objectFit:"cover"}}
                unoptimized
              />
            </div>

            {/* Tag badge */}
            <div style={{
              position:"absolute",top:24,right:-20,
              transform:"translateZ(50px) rotate(4deg)",
              background:"var(--gold)",
              padding:"10px 18px",
              fontFamily:"var(--font-mono)",
              fontSize:9,letterSpacing:".2em",textTransform:"uppercase",
              color:"var(--bg)",
            }} className="float-2">
              Est. 2018
            </div>
          </div>
        </div>
      </div>

      {/* Footer row */}
      <div ref={footerRef} style={{
        display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"24px 0",borderTop:"1px solid var(--border)",
        position:"relative",zIndex:1,opacity:0,
      }}>
        <div style={{
          fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:".25em",
          textTransform:"uppercase",color:"var(--faint)",
          display:"flex",alignItems:"center",gap:16,
        }}>
          <div style={{width:44,height:1,background:"var(--border2)",position:"relative",overflow:"hidden"}}>
            <div className="scroll-fill"/>
          </div>
          Scroll to explore
        </div>
        <span style={{fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:".2em",textTransform:"uppercase",color:"var(--faint)"}}>
          Lagos, NG
        </span>
      </div>
    </section>
  );
}
