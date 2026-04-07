"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const IMGS = {
  a:"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=85&auto=format&fit=crop",
  b:"https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=600&q=80&auto=format&fit=crop",
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgMainRef = useRef<HTMLDivElement>(null);
  const imgAccRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      const g  = await import("gsap");
      const st = await import("gsap/ScrollTrigger");
      const gsap = g.gsap || g.default;
      const { ScrollTrigger } = st;
      gsap.registerPlugin(ScrollTrigger);

      // Parallax on main image
      if (imgMainRef.current) {
        gsap.to(imgMainRef.current.querySelector("img"), {
          y: "18%", ease:"none",
          scrollTrigger:{
            trigger: sectionRef.current,
            start:"top bottom", end:"bottom top",
            scrub: true,
          },
        });
      }
      // Counter-parallax on accent image
      if (imgAccRef.current) {
        gsap.to(imgAccRef.current.querySelector("img"), {
          y: "-12%", ease:"none",
          scrollTrigger:{
            trigger: sectionRef.current,
            start:"top bottom", end:"bottom top",
            scrub: true,
          },
        });
      }

      // Text reveal
      const copy = sectionRef.current?.querySelector(".about-copy");
      if (copy) {
        gsap.fromTo(copy.querySelectorAll(".anim-line"),
          { opacity:0, y:40 },
          {
            opacity:1, y:0, stagger:.12, duration:.9, ease:"expo.out",
            scrollTrigger:{ trigger:copy, start:"top 80%" },
          }
        );
      }
    };
    load();
  }, []);

  return (
    <section ref={sectionRef} id="studio" style={{
      padding:"120px 64px",background:"var(--bg2)",position:"relative",zIndex:1,
    }}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:100,alignItems:"center"}}>
        {/* Visual */}
        <div style={{position:"relative",height:620}}>
          {/* Main image */}
          <div ref={imgMainRef} className="parallax-img" style={{
            position:"absolute",left:0,top:0,width:"74%",height:"84%",
            background:"var(--surface)",
          }}>
            <Image src={IMGS.a} alt="Photography studio" fill style={{objectFit:"cover"}} unoptimized/>
            <div style={{
              position:"absolute",inset:0,
              background:"linear-gradient(to bottom right, rgba(201,167,106,.06), transparent)",
            }}/>
          </div>

          {/* Accent image */}
          <div ref={imgAccRef} className="parallax-img" style={{
            position:"absolute",right:0,bottom:0,width:"50%",height:"55%",
            border:"1px solid var(--border2)",
          }}>
            <Image src={IMGS.b} alt="Camera detail" fill style={{objectFit:"cover"}} unoptimized/>
          </div>

          {/* Medal */}
          <div className="float-1 glow-gold" style={{
            position:"absolute",left:"50%",top:"50%",
            transform:"translate(-50%,-50%) rotate(-8deg)",
            width:88,height:88,background:"var(--gold)",zIndex:10,
            display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
          }}>
            <span style={{fontFamily:"var(--font-serif)",fontSize:28,fontWeight:300,color:"var(--bg)",lineHeight:1}}>8+</span>
            <span style={{fontFamily:"var(--font-mono)",fontSize:8,letterSpacing:".12em",textTransform:"uppercase",color:"rgba(6,6,10,.6)",marginTop:2}}>Years</span>
          </div>

          {/* Gold line decoration */}
          <div style={{
            position:"absolute",left:-32,top:"30%",width:1,height:"40%",
            background:"linear-gradient(to bottom,transparent,var(--gold),transparent)",
          }}/>
        </div>

        {/* Copy */}
        <div className="about-copy">
          <p className="anim-line" style={{
            fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:".32em",
            textTransform:"uppercase",color:"var(--gold)",marginBottom:20,
            display:"flex",alignItems:"center",gap:10,opacity:0,
          }}>
            <span style={{width:18,height:1,background:"var(--gold)"}}/>
            Our Story
          </p>
          <h2 className="anim-line" style={{
            fontFamily:"var(--font-serif)",fontSize:"clamp(36px,4.5vw,62px)",
            fontWeight:300,lineHeight:1.05,letterSpacing:"-.03em",opacity:0,
          }}>
            Where light<br/>finds its <em style={{color:"var(--gold)"}}>soul</em>
          </h2>
          <p className="anim-line" style={{
            fontSize:14,lineHeight:1.9,color:"var(--muted)",
            margin:"28px 0 0",maxWidth:440,opacity:0,
          }}>
            Founded in Lagos in 2018, Lumière was born from the conviction that great photography is never purely technical — it's emotional, deliberate, and deeply human.
          </p>
          <p className="anim-line" style={{
            fontSize:14,lineHeight:1.9,color:"var(--muted)",
            margin:"16px 0 40px",maxWidth:440,opacity:0,
          }}>
            We combine classical compositional training with a contemporary eye, drawing light from places most photographers overlook. We shoot worldwide, but Lagos will always be home.
          </p>
          <div className="anim-line" style={{opacity:0}}>
            <Link href="#contact" className="btn-gold">Work With Us</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
