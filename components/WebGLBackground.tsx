"use client";
import { useEffect, useRef } from "react";

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Dynamically import Three.js to avoid SSR issues
    let animId: number;
    let renderer: any, scene: any, camera: any, particles: any, geometry: any;

    const init = async () => {
      const THREE = await import("three");

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      // ── PARTICLE FIELD ──
      const count = 3500;
      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      const colorGold = new THREE.Color(0xc9a76a);
      const colorWhite = new THREE.Color(0xf0ece0);
      const colorDim = new THREE.Color(0x2a2520);

      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 30;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

        const r = Math.random();
        const c = r < 0.05 ? colorGold : r < 0.15 ? colorWhite : colorDim;
        colors[i * 3]     = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;

        sizes[i] = Math.random() * 2.5 + 0.5;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // ── FLOATING BOKEH CIRCLES ──
      for (let i = 0; i < 8; i++) {
        const geo = new THREE.SphereGeometry(Math.random() * 0.3 + 0.05, 8, 8);
        const mat = new THREE.MeshBasicMaterial({
          color: Math.random() > 0.5 ? 0xc9a76a : 0x3a3020,
          transparent: true,
          opacity: Math.random() * 0.06 + 0.02,
          blending: THREE.AdditiveBlending,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6 - 2
        );
        scene.add(mesh);
      }

      let scrollY = 0;
      let mouseX = 0, mouseY = 0;

      const onScroll = () => { scrollY = window.scrollY; };
      const onMouse = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("mousemove", onMouse);

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      let t = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        t += 0.0008;

        particles.rotation.y = t * 0.15 + mouseX * 0.08;
        particles.rotation.x = t * 0.08 + mouseY * 0.05;
        particles.position.y = -scrollY * 0.002;

        camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.02;
        camera.position.y += (mouseY * 0.2 - camera.position.y) * 0.02;

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animId);
        geometry.dispose();
        renderer.dispose();
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then(fn => fn && fn());
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      id="webgl-canvas"
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.65,
      }}
    />
  );
}
