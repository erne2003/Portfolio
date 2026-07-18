import { ReactLenis } from 'lenis/react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navbar from './Components/Navbar.jsx';
import Hero from './Sections/Hero.jsx';
import Experience from './Sections/Experience.jsx';
import About from './Sections/About.jsx';
import Projects from './Sections/Projects.jsx';
import Education from './Sections/Education.jsx';
import TechStack from './Sections/TechStacks.jsx';

// Individual section tracker for precise entrance and exit transitions
const SectionWrapper = ({ children, bgGradient }) => {
  const containerRef = useRef(null);

  // Track this specific section's intersection with the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to subtle scale, opacity, and vertical movement
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -60]);

  return (
    <section
      ref={containerRef}
      className={`h-screen w-screen sticky top-0 flex items-center justify-center overflow-hidden ${bgGradient}`}
    >
      {/* Ambient moving background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25" />

      <motion.div
        style={{ opacity, scale, y }}
        className="w-full h-full flex items-center justify-center z-10"
      >
        {children}
      </motion.div>
    </section>
  );
};

function App() {
  // 1. Grab global scroll progress across the entire page body
  const { scrollYProgress } = useScroll();

  // 2. Wrap it in a spring damper so the progress line moves smoothly with Lenis momentum
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <ReactLenis root options={{ duration: .8, lerp: 0.25, smoothTouch: false }}>
      <div className="bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-slate-900 overflow-x-hidden antialiased">
        <Navbar />

        <main className="relative z-10">
          {/* Each section gets a slightly shifting color profile to blend into the next */}
          <SectionWrapper bgGradient="bg-gradient-to-b from-slate-950 to-slate-900">
            <Hero id="hero" />
          </SectionWrapper>

          <SectionWrapper bgGradient="bg-gradient-to-b from-slate-900 to-slate-950">
            <Experience id="experience" />
          </SectionWrapper>

          <SectionWrapper bgGradient="bg-gradient-to-b from-slate-950 to-slate-900">
            <About id="about" />
          </SectionWrapper>

          <SectionWrapper bgGradient="bg-gradient-to-b from-slate-900 to-slate-950">
            <Projects id="projects" />
          </SectionWrapper>

          <SectionWrapper bgGradient="bg-gradient-to-b from-slate-950 to-slate-900">
            <Education id="education" />
          </SectionWrapper>

          <SectionWrapper bgGradient="bg-gradient-to-b from-slate-900 to-zinc-950">
            <TechStack id="techstack" />
          </SectionWrapper>
        </main>

        {/* 3. The Interactive Progress Indicator Bar matching your sample specs */}
        <motion.div
          style={{ scaleX }}
          className="fixed left-0 right-0 h-[5px] bg-teal-500 bottom-[50px] origin-left z-50 mix-blend-screen"
        />
      </div>
    </ReactLenis>
  );
}

export default App;