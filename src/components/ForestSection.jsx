import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TreePine, Cpu, Network, Workflow, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ForestSection() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const contentCard1Ref = useRef(null);
  const contentCard2Ref = useRef(null);
  const titleRef = useRef(null);
  const progressBadgeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Stage 1: Deep Canopy Dive & Zoom
      tl.to(imageRef.current, {
        scale: 1.4,
        yPercent: 8,
        filter: 'brightness(0.6) contrast(1.15)',
        duration: 2,
        ease: 'power1.inOut',
      })
        // Title fades in and ascends
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 80, scale: 0.92, rotateX: 20 },
          { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1.2, ease: 'power2.out' },
          '-=1.2'
        )
        // Card 1 slides in with 3D tilt
        .fromTo(
          contentCard1Ref.current,
          { opacity: 0, x: -80, y: 30, rotateY: 15 },
          { opacity: 1, x: 0, y: 0, rotateY: 0, duration: 1.4, ease: 'power2.out' },
          '-=0.5'
        )
        // Card 2 slides in from right with 3D tilt
        .fromTo(
          contentCard2Ref.current,
          { opacity: 0, x: 80, y: 30, rotateY: -15 },
          { opacity: 1, x: 0, y: 0, rotateY: 0, duration: 1.4, ease: 'power2.out' },
          '-=1'
        )
        // Progress badge pulse
        .fromTo(
          progressBadgeRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
          '-=0.5'
        )
        // Transition out cleanly before unpin
        .to(
          [titleRef.current, contentCard1Ref.current, contentCard2Ref.current, progressBadgeRef.current],
          {
            opacity: 0.15,
            y: -50,
            scale: 0.95,
            duration: 1,
            ease: 'power1.in',
          },
          '+=0.6'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="forest"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-nature-darkest text-slate-100 flex items-center justify-center select-none"
    >
      {/* Background Scaling Forest Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={imageRef}
          className="absolute -inset-16 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: "url('/assets/rainforest_godrays.jpg')",
            backgroundPosition: 'center 40%',
          }}
        />

        {/* Darkness & Mist Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-nature-darkest via-nature-darkest/55 to-nature-darkest/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-nature-darkest/90 via-transparent to-nature-darkest/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,7,4,0.85)_100%)]" />
      </div>

      {/* Atmospheric Fog Effect */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-nature-moss/10 mix-blend-screen filter blur-3xl opacity-40 animate-pulse-slow" />

      {/* Pinned Content Presentation */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 w-full flex flex-col items-center">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-8 md:mb-10 will-change-transform" style={{ perspective: '1000px' }}>
          <div className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 rounded-full text-emerald-400 font-mono text-xs tracking-widest uppercase mb-3 border border-emerald-500/30">
            <TreePine className="w-3.5 h-3.5 text-emerald-400" />
            <span>02 // FOREST REALM • PINNED SCROLL ZOOM</span>
          </div>
          <h2 className="font-cinematic text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-tight">
            ROOTED IN <span className="text-gradient-emerald">RESILIENCE</span>
          </h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto text-sm sm:text-base font-light">
            Like ancient canopies enduring violent storms, enterprise architectures
            must be engineered for unbreakable continuity, seamless interconnectivity, and organic growth.
          </p>
        </div>

        {/* Dual Glass Content Cards with 3D Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          {/* Card 1: Enterprise Foundation */}
          <div
            ref={contentCard1Ref}
            className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-400/50 transition-all duration-300 will-change-transform"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Workflow className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinematic font-bold text-lg sm:text-xl text-white">
                  Indotech Transformer Experience
                </h3>
                <span className="text-xs font-mono text-emerald-400/80">Digital Transformation & Networking</span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 font-light">
              Spearheading industrial system modernization in Chennai. Translating heavy engineering requirements into resilient digital tools that automate mission-critical equipment pipelines.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>3 Critical Enterprise Systems Deployed to Production</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>AI Developer Tool Integration (Cursor, Codex, Claude)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Optimized IT Networking & Cross-Departmental Workflows</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Core Engineering Capabilities */}
          <div
            ref={contentCard2Ref}
            className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-400/50 transition-all duration-300 will-change-transform"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-400/10 rounded-full blur-2xl group-hover:bg-emerald-400/20 transition-all" />

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinematic font-bold text-lg sm:text-xl text-white">
                  Technical Roots & Algorithms
                </h3>
                <span className="text-xs font-mono text-emerald-400/80">Kings Engineering College • CGPA: 8.5/10</span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 font-light">
              Rigorous grounding in Data Structures, algorithmic optimization, and full-stack software lifecycle. Proficient across JavaScript/TypeScript, Python, Java, and modern web architectures.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {['TypeScript', 'React', 'Python', 'Java', 'DSA', 'Network Security', 'Ollama Agents'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-nature-forest/80 border border-emerald-500/20 text-emerald-300 font-mono text-[11px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Progress Subtext */}
        <div ref={progressBadgeRef} className="mt-8 text-center text-xs font-mono text-emerald-400/70 uppercase tracking-widest flex items-center gap-2 justify-center">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
          <span>Keep Scrolling To Dive Into The Cascading Waterfalls</span>
        </div>
      </div>
    </section>
  );
}
