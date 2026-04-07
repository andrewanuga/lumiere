"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mx = useRef(0), my = useRef(0);
  const rx = useRef(0), ry = useRef(0);
  const raf = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top  = e.clientY + "px";
      }
    };

    const loop = () => {
      rx.current += (mx.current - rx.current) * 0.1;
      ry.current += (my.current - ry.current) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = rx.current + "px";
        ringRef.current.style.top  = ry.current + "px";
      }
      raf.current = requestAnimationFrame(loop);
    };

    const expand = () => document.body.classList.add("cursor-big");
    const shrink = () => document.body.classList.remove("cursor-big");

    const bind = () => {
      document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
        el.addEventListener("mouseenter", expand);
        el.addEventListener("mouseleave", shrink);
      });
    };

    document.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(loop);
    bind();
    const t = setInterval(bind, 2000);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      clearInterval(t);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} id="cursor-dot"
        style={{
          position:"fixed",zIndex:9999,width:6,height:6,
          background:"var(--gold)",borderRadius:"50%",pointerEvents:"none",
          transform:"translate(-50%,-50%)",transition:"width .2s,height .2s,background .2s",
        }}
      />
      <div ref={ringRef} id="cursor-ring"
        style={{
          position:"fixed",zIndex:9998,width:36,height:36,
          border:"1px solid rgba(201,167,106,.45)",borderRadius:"50%",pointerEvents:"none",
          transform:"translate(-50%,-50%)",
          transition:"width .4s cubic-bezier(.25,.46,.45,.94),height .4s,border-color .3s",
        }}
      />
    </>
  );
}
