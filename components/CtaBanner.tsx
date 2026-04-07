"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function CtaBanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const load = async () => {
      const g  = await import("gsap");
      const st = await import("gsap/ScrollTrigger");
      const gsap = g.gsap || g.default;
      const { ScrollTrigger } = st;
      gsap.registerPlugin(ScrollTrigger);

      // Scale-up entrance
      gsap.fromTo(sectionRef.current?.querySelector(".cta-inner"),
        { opacity:0, scale:.94 },
        {
          opacity:1, scale:1, duration:1.2, ease:"expo.out",
          scrollTrigger:{ trigger:sectionRef.current, start:"top 75%" },
        }
      );

      // Title chars
      const h2 = sectionRef.current?.querySelector("h2");
      if (h2) {
        const html = h2.innerHTML;
        h2.innerHTML = html.split("").map(c =>
          c === " " ? `<span style="display:inline-block;width:.28em">&nbsp;</span>` :
          c === "<" ? "<" : // preserve HTML
          `<span style="display:inline-block;opacity:0;transform:translateY(60px)">${c}</span>`
        ).join("");

        gsap.to(h2.querySelectorAll("span"), {
          opacity:1, y:0, stagger:.018, duration:.7, ease:"expo.out",
          scrollTrigger:{ trigger:h2, start:"top 80%" },
        });
      }
    };
    load();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        padding:"160px 64px",textAlign:"center",
        position:"relative",overflow:"hidden",background:"var(--bg)",zIndex:1,
      }}
    >
      {/* Animated ambient circles */}
      <div className="float-1" style={{
        position:"absolute",top:"20%",left:"10%",
        width:300,height:300,borderRadius:"50%",
        background:"radial-gradient(circle,rgba(201,167,106,.06) 0%,transparent 70%)",
        pointerEvents:"none",
      }}/>
      <div className="float-2" style={{
        position:"absolute",bottom:"15%",right:"8%",
        width:400,height:400,borderRadius:"50%",
        background:"radial-gradient(circle,rgba(201,167,106,.04) 0%,transparent 70%)",
        pointerEvents:"none",
      }}/>

      {/* Horizontal lines */}
      <div style={{
        position:"absolute",inset:0,pointerEvents:"none",
        backgroundImage:"linear-gradient(var(--border) 1px,transparent 1px)",
        backgroundSize:"100% 80px",
        maskImage:"radial-gradient(ellipse at center,transparent 25%,black 65%)",
      }}/>

      <div className="cta-inner" style={{position:"relative",zIndex:1,opacity:0}}>
        <p style={{
          fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:".32em",
          textTransform:"uppercase",color:"var(--gold)",marginBottom:28,
          display:"flex",alignItems:"center",justifyContent:"center",gap:10,
        }}>
          <span style={{width:18,height:1,background:"var(--gold)"}}/>
          Start the Conversation
        </p>

        <h2 style={{
          fontFamily:"var(--font-serif)",
          fontSize:"clamp(48px,7vw,96px)",fontWeight:300,
          lineHeight:.95,letterSpacing:"-.04em",
          maxWidth:780,margin:"0 auto 40px",
        }}>
          Ready to create something <em style={{color:"var(--gold)"}}>lasting?</em>
        </h2>

        <p style={{
          fontSize:15,lineHeight:1.85,color:"var(--muted)",
          maxWidth:420,margin:"0 auto 56px",
        }}>
          Every great image starts with a conversation. Tell us your vision and we&apos;ll show you what&apos;s possible.
        </p>

        <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
          <Link href="mailto:hello@lumiere.studio" className="btn-gold">
            hello@lumiere.studio
          </Link>
          <Link href="#work" className="btn-outline">
            View Full Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
