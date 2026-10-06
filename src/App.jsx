import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navbar from './Components/Navbar.jsx';
import Hero from './Sections/Hero.jsx';
import Experience from './Sections/Experience.jsx';
import About from './Sections/About.jsx';
import Projects from './Sections/Projects.jsx';
import Education from './Sections/Education.jsx';
import TechStack from './Sections/TechStack.jsx';

// Gentle scroll-linked entrance: fades/rises in as the section's top edge
// travels from the bottom of the viewport to 70% of the way up. No exit
// animation, so tall sections are never dimmed while being read.
const SectionWrapper = ({ children, className = '' }) => {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start 0.7'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [32, 0]);

  return (
    <div ref={containerRef} className={className}>
      <motion.div style={reduceMotion ? undefined : { opacity, y }} className="w-full">
        {children}
      </motion.div>
    </div>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();

  // Spring damper so the progress line follows Lenis momentum smoothly
  const springX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const scaleX = reduceMotion ? scrollYProgress : springX;

  return (
    <ReactLenis
      root
      options={{ duration: 0.8, lerp: 0.25, smoothWheel: !reduceMotion, anchors: true }}
    >
      <div className="overflow-x-clip">
        <a href="#main" className="skip-link">Skip to content</a>
        <Navbar />

        <main id="main">
          <SectionWrapper>
            <Hero id="hero" />
          </SectionWrapper>

          <SectionWrapper>
            <Projects id="projects" />
          </SectionWrapper>

          <SectionWrapper>
            <Experience id="experience" />
          </SectionWrapper>

          <SectionWrapper>
            <Education id="education" />
          </SectionWrapper>

          <SectionWrapper>
            <About id="about" />
          </SectionWrapper>

          <SectionWrapper>
            <TechStack id="techstack" />
          </SectionWrapper>
        </main>

        <footer className="site-footer">
          <p>&copy; {new Date().getFullYear()} Ernesto Cardoso</p>
        </footer>

        {/* Reading progress indicator */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX }}
          className="fixed left-0 right-0 top-0 h-[3px] origin-left z-[60] bg-[var(--accent)]"
        />
      </div>
    </ReactLenis>
  );
}

export default App;
