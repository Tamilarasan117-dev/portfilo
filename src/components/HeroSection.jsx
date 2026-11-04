import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles, Terminal, MapPin, Compass, ShieldCheck } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ onExploreClick }) {
  const heroRef = useRef(null);
  const bgImageRef = useRef(null);
  const foregroundLeavesLeftRef = useRef(null);
  const foregroundLeavesRightRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const contentRef = useRef(null);
  const canvasRef = useRef(null);
  const godRaysRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Floating bioluminescent forest motes & micro dust
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 85 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.8 + 0.8,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: -Math.random() * 0.7 - 0.2,
      opacity: Math.random() * 0.7 + 0.3,
      pulse: Math.random() * 0.04 + 0.015,
      hue: Math.random() > 0.3 ? '160, 84%, 49%' : '48, 96%, 53%',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const alpha = Math.max(0.1, Math.min(0.9, p.opacity + Math.sin(Date.now() * 0.002) * 0.2));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, ${alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#10b981';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Mouse parallax tilt
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 24;
    const y = (clientY / innerHeight - 0.5) * 24;
    setMousePos({ x, y });
  };

  // ULTRA PRO SCROLLTRIGGER TIMELINE:
  // 1. Zoom into the rainforest background
  // 2. Foreground jungle canopy leaves part to the left & right
  // 3. Volumetric god-rays flare and track downward
  // 4. Split headline lifts with 3D perspective rotation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Background slow zoom
      heroTl.to(
        bgImageRef.current,
        {
          scale: 1.35,
          yPercent: 20,
          ease: 'none',
        },
        0
      );

      // Parting foreground leaves
      heroTl.to(
        foregroundLeavesLeftRef.current,
        {
          xPercent: -80,
          opacity: 0,
          ease: 'power2.inOut',
        },
        0
      );

      heroTl.to(
        foregroundLeavesRightRef.current,
        {
          xPercent: 80,
          opacity: 0,
          ease: 'power2.inOut',
        },
        0
      );

      // Volumetric god rays angle and scale
      heroTl.to(
        godRaysRef.current,
        {
          opacity: 0.2,
          scale: 1.4,
          yPercent: 30,
          ease: 'none',
        },
        0
      );

      // Main content lift with 3D rotation
      heroTl.to(
        contentRef.current,
        {
          opacity: 0,
          y: -120,
          rotateX: 18,
          scale: 0.92,
          filter: 'blur(10px)',
          ease: 'power2.in',
        },
        0.1
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const headingWords = "EXPLORE THE UNKNOWN".split(" ");

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-nature-darkest select-none"
    >
      {/* 3D PARALLAX BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={bgImageRef}
          className="absolute -inset-16 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: "url('/assets/rainforest_godrays.jpg')",
            transform: `translate3d(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px, 0) scale(1.12)`,
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Ambient Darkness & Volumetric Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-nature-darkest via-nature-darkest/60 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-nature-darkest/85 via-transparent to-nature-darkest/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(16,185,129,0.22),transparent_70%)]" />

        {/* Dynamic God Rays */}
        <div ref={godRaysRef} className="god-rays will-change-transform" />
      </div>

      {/* FOREGROUND JUNGLE LEAVES (Parting on scroll) */}
      <div
        ref={foregroundLeavesLeftRef}
        className="absolute top-0 left-0 w-80 h-full pointer-events-none z-10 opacity-70 bg-gradient-to-r from-nature-darkest via-nature-forest/40 to-transparent filter blur-[1px] will-change-transform"
      />
      <div
        ref={foregroundLeavesRightRef}
        className="absolute top-0 right-0 w-80 h-full pointer-events-none z-10 opacity-70 bg-gradient-to-l from-nature-darkest via-nature-forest/40 to-transparent filter blur-[1px] will-change-transform"
      />

      {/* Micro-Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* HERO CONTENT CONTAINER */}
      <div
        ref={contentRef}
        className="relative z-20 max-w-5xl mx-auto px-6 py-28 md:py-36 text-center flex flex-col items-center justify-center will-change-transform"
        style={{
          transform: `translate3d(${mousePos.x * 0.35}px, ${mousePos.y * 0.35}px, 0)`,
          perspective: '1200px',
        }}
      >
        {/* Top Badges */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-6"
        >
          <div className="glass-pill px-4 py-1.5 rounded-full flex items-center gap-2 border border-emerald-500/35 text-emerald-300 text-xs font-mono tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.25)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>INDOTECH TRANSFORMER SOFTWARE DEVELOPER</span>
          </div>

          <div className="glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-slate-300 text-xs font-mono tracking-wider border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>CHENNAI, TN</span>
          </div>
        </motion.div>

        {/* Split Headline with 3D Flip */}
        <div ref={titleWrapperRef} className="mb-4">
          <span className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-emerald-400 font-bold block mb-3">
            Cinematic Nature 3D Portfolio • Tamil Arasan
          </span>

          <h1 className="font-cinematic text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] text-white uppercase drop-shadow-[0_15px_45px_rgba(0,0,0,0.9)]">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: 60 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 1.1,
                  delay: 0.4 + i * 0.18,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`inline-block mr-3 md:mr-6 will-change-transform ${word === 'UNKNOWN' ? 'text-gradient-emerald' : 'text-slate-100'
                  }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Narrative Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="max-w-2xl text-slate-300 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-10 drop-shadow-md"
        >
          Merging the resilient organic equilibrium of ancient rainforests with
          high-performance <span className="text-emerald-300 font-normal">Full-Stack Architecture</span> and{' '}
          <span className="text-emerald-300 font-normal">Autonomous AI Agent Systems</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#forest"
            onClick={onExploreClick}
            className="interactive-item group w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-nature-darkest font-mono font-bold tracking-wider text-sm flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(16,185,129,0.45)] hover:shadow-[0_0_55px_rgba(16,185,129,0.75)] transition-all duration-300 hover:scale-105"
          >
            <span>DESCEND INTO BIOSPHERE</span>
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
          </a>

          <a
            href="#waterfall"
            className="interactive-item w-full sm:w-auto px-8 py-4 rounded-full glass-panel hover:bg-emerald-500/10 text-slate-200 hover:text-white font-mono text-sm tracking-wider flex items-center justify-center gap-2 border border-emerald-500/25 hover:border-emerald-400/50 transition-all duration-300"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>SEE WATERFALLS IN FALLS (3)</span>
          </a>
        </motion.div>

        {/* Live Metrics Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-14 pt-8 border-t border-emerald-500/20 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 text-center max-w-3xl"
        >
          <div>
            <div className="font-cinematic text-2xl sm:text-3xl font-extrabold text-emerald-400">8.5</div>
            <div className="text-[11px] font-mono text-slate-400 tracking-wider uppercase mt-1">B.Tech CGPA</div>
          </div>
          <div>
            <div className="font-cinematic text-2xl sm:text-3xl font-extrabold text-emerald-400">3+</div>
            <div className="text-[11px] font-mono text-slate-400 tracking-wider uppercase mt-1">Enterprise Systems</div>
          </div>
          <div>
            <div className="font-cinematic text-2xl sm:text-3xl font-extrabold text-emerald-400">45%</div>
            <div className="text-[11px] font-mono text-slate-400 tracking-wider uppercase mt-1">Dispatch Speedup</div>
          </div>
          <div>
            <div className="font-cinematic text-2xl sm:text-3xl font-extrabold text-emerald-400">Ollama</div>
            <div className="text-[11px] font-mono text-slate-400 tracking-wider uppercase mt-1">Custom AI Agents</div>
          </div>
        </motion.div>
      </div>

      {/* Mouse scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-slate-400 pointer-events-none"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400/80">
          Scroll To Descend
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-emerald-500/40 flex items-start justify-center p-1 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
