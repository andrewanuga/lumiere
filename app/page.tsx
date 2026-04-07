import WebGLBackground from "@/components/WebGLBackground";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Services from "@/components/Services";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {
  return (
    <>
      <ProgressBar />
      <WebGLBackground />
      <Nav />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <Marquee />
        <Work />
        <Process />
        <Services />
        <About />
        <Stats />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
