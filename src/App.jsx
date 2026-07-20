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
const SectionWrapper = ({ children }) => {
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

  // Blur: 6px when entering → 0 in view → 6px when exiting
  const blurValue = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [3, 0, 0, 3]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  return (
    <div ref={containerRef}>
      <motion.div
        style={{ opacity, scale, y, filter }}
        className="w-full z-10"
      >
        {children}
      </motion.div>
    </div>
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
          <SectionWrapper>
            <Hero id="hero" />
          </SectionWrapper>

          <SectionWrapper>
            <Experience id="experience" />
          </SectionWrapper>

          <SectionWrapper>
            <About id="about" />
          </SectionWrapper>

          <SectionWrapper>
            <Projects id="projects" />
          </SectionWrapper>

          <SectionWrapper>
            <Education id="education" />
          </SectionWrapper>

          <SectionWrapper>
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