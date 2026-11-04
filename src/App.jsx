import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ForestSection from './components/ForestSection';
import WaterfallSection from './components/WaterfallSection';
import MountainSection from './components/MountainSection';
import ThreeScene from './components/ThreeScene';
import ProjectsGallery from './components/ProjectsGallery';
import ContactSection from './components/ContactSection';
import ResumeModal from './components/ResumeModal';
import Preloader from './components/Preloader';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Setup Lenis Smooth Scrolling and synchronize with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-nature-darkest text-slate-100 overflow-x-hidden">
      {/* Cinematic Overlays */}
      <div className="cinematic-grain" />
      <div className="cinematic-vignette" />

      {/* Preloader */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Custom Fluid Cursor */}
      <CustomCursor />

      {/* Navigation Bar */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Main Experience Stream */}
      <main>
        {/* Section 1: Hero */}
        <HeroSection onExploreClick={() => {}} />

        {/* Section 2: Forest Experience */}
        <ForestSection />

        {/* Section 3: Waterfall Experience */}
        <WaterfallSection onSelectProject={(p) => setSelectedProject(p)} />

        {/* Section 4: Mountain Experience */}
        <MountainSection />

        {/* Section 5: 3D Nature Experience (Three.js & R3F) */}
        <ThreeScene />

        {/* Section 6: Systems & Projects Gallery */}
        <ProjectsGallery
          selectedProject={selectedProject}
          onSelectProject={(p) => setSelectedProject(p)}
          onCloseModal={() => setSelectedProject(null)}
        />

        {/* Section 7: Contact & Minimal Cinematic Ending */}
        <ContactSection onOpenResume={() => setResumeOpen(true)} />
      </main>

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}

