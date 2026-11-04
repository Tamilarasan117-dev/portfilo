import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mountain, Award, BrainCircuit, Terminal, Sparkles, Check, ChevronRight } from 'lucide-react';
import { skillsData, personalInfo } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function MountainSection() {
  const sectionRef = useRef(null);
  const mountainBgRef = useRef(null);
  const cloudsRef = useRef(null);
  const gridCardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Zoom and parallax on mountain background
      gsap.fromTo(
        mountainBgRef.current,
        { scale: 1.05, yPercent: 0 },
        {
          scale: 1.25,
          yPercent: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Floating clouds horizontal parallax
      gsap.to(cloudsRef.current, {
        xPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="mountain"
      ref={sectionRef}
      className="relative min-h-screen w-full py-28 md:py-36 overflow-hidden bg-nature-darkest text-slate-100 flex flex-col justify-center"
    >
      {/* Background Mountain Atmosphere (Golden Sunrise & Rolling Fog over Peaks) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Mountain Silhouette & Sunlight Gradient */}
        <div
          ref={mountainBgRef}
          className="absolute -inset-10 will-change-transform bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/rainforest_godrays.jpg')", // Rich atmospheric peak backdrop
            filter: 'hue-rotate(25deg) contrast(1.1) brightness(0.7)',
          }}
        />

        {/* Rolling Clouds Layer */}
        <div
          ref={cloudsRef}
          className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.4),transparent_60%)] filter blur-2xl"
        />

        {/* Golden Sunrise Glow from Summit */}
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-amber-500/15 via-emerald-600/10 to-transparent pointer-events-none" />

        {/* Ambient Darkness Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-nature-darkest via-nature-darkest/80 to-nature-darkest" />
        <div className="absolute inset-0 bg-gradient-to-r from-nature-darkest/90 via-transparent to-nature-darkest/90" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 rounded-full text-amber-300 font-mono text-xs tracking-widest uppercase mb-3 border border-amber-500/30">
            <Mountain className="w-3.5 h-3.5 text-amber-400" />
            <span>03 // MOUNTAIN REALM • HIGH-ALTITUDE PERSPECTIVE</span>
          </div>
          <h2 className="font-cinematic text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-tight">
            THE SUMMIT OF <span className="text-gradient-gold">MASTERY</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Ascending above the cloud line to architect intelligent, autonomous systems.
            Merging rigorous Computer Science theory with cutting-edge AI orchestration.
          </p>
        </div>

        {/* Grid Layout: AI Tools & Core Competencies & Education */}
        <div ref={gridCardsRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: AI Developer Tools & Workflows (5 Cols) */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/20 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinematic text-xl font-bold text-white">
                  AI Developer Toolchain
                </h3>
                <span className="text-xs font-mono text-amber-300/80">Accelerated Engineering Sprints</span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm font-light mb-6 leading-relaxed">
              Tamil Arasan leverages state-of-the-art AI tooling to compress development lifecycles, elevate code hygiene, and build localized autonomous agents.
            </p>

            <div className="space-y-3.5">
              {skillsData.developerAndAiTools.map((tool) => (
                <div
                  key={tool.name}
                  className="p-3.5 rounded-2xl bg-nature-forest/40 border border-emerald-500/15 hover:border-amber-400/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-semibold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      {tool.name}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase">Integrated</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-light leading-snug">
                    {tool.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Core Technical Skills & Languages & Education (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Core Technical Matrix */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-cinematic text-xl font-bold text-white">
                    Core Technical Competencies
                  </h3>
                  <span className="text-xs font-mono text-emerald-400/80">Engineered with Precision</span>
                </div>
                <Terminal className="w-6 h-6 text-emerald-400/60" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillsData.coreTechnical.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-2xl bg-nature-forest/40 border border-emerald-500/10 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-slate-200 font-medium">{skill.name}</span>
                      <span className="font-mono text-xs text-emerald-400 font-bold">{skill.level}%</span>
                    </div>
                    {/* Animated Progress Bar */}
                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages & Academic Distinction Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Programming Languages */}
              <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 flex flex-col justify-between">
                <div>
                  <h4 className="font-cinematic text-lg font-bold text-white mb-3">
                    Languages
                  </h4>
                  <ul className="space-y-2 text-xs font-mono text-slate-300">
                    {skillsData.languages.map((lang) => (
                      <li key={lang.name} className="flex items-center justify-between">
                        <span className="text-emerald-300">{lang.name}</span>
                        <span className="text-slate-400 text-[10px]">{lang.proficiency}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Education & Academic Honors */}
              <div className="glass-card p-6 rounded-3xl border border-amber-500/25 flex flex-col justify-between bg-gradient-to-br from-amber-500/10 to-transparent">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span className="font-mono text-xs text-amber-300 tracking-wider font-semibold">
                      ACADEMIC EXCELLENCE
                    </span>
                  </div>
                  <h4 className="font-cinematic text-lg font-bold text-white mb-1">
                    B.Tech Information Technology
                  </h4>
                  <p className="text-xs text-slate-300 font-light mb-3">
                    Kings Engineering College (Autonomous, Affiliated to Anna University), Chennai
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
                    <span>CGPA: 8.5 / 10.0</span>
                    <span className="text-[10px] text-amber-200 font-normal">• First Class Distinction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

