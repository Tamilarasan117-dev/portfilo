import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Waves,
  Zap,
  ArrowRight,
  Activity,
  CheckCircle2,
  Volume2,
  VolumeX,
  Droplets,
  Layers,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function WaterfallSection({ onSelectProject }) {
  const containerRef = useRef(null);
  const droneWrapperRef = useRef(null);
  const waterfallImgRef = useRef(null);
  const waterfallCanvasRef = useRef(null);
  const sprayCanvasRef = useRef(null);
  const hudRef = useRef(null);
  const textPhase1Ref = useRef(null);
  const textPhase2Ref = useRef(null);
  const cardsWrapperRef = useRef(null);
  const cardRefs = useRef([]);

  const [waterVolume, setWaterVolume] = useState('torrential'); // 'torrential' | 'cinematic'
  const [soundActive, setSoundActive] = useState(false);
  const audioContextRef = useRef(null);
  const waterfallNoiseRef = useRef(null);
  const waterfallGainRef = useRef(null);

  const enterpriseProjects = projectsData.filter((p) => p.id !== 'custom-ai-agent');

  // 1. REALISTIC FLOWING WATERFALL CANVAS SIMULATION ("Waterfalls in Falls")
  // Renders real animated cascading water chutes, white-water foam streaks, and plunge pool turbulence directly on the canyon cliffs
  useEffect(() => {
    const canvas = waterfallCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Chutes representing the major and minor cascades falling into the chasm
    const cascades = [
      // Main central heavy plunge (center of canyon)
      { xPct: 0.48, topPct: 0.12, botPct: 0.58, width: 28, speed: 18, color: 'rgba(230, 245, 255, 0.85)' },
      // Secondary left falls
      { xPct: 0.31, topPct: 0.22, botPct: 0.62, width: 22, speed: 15, color: 'rgba(215, 240, 250, 0.75)' },
      // Secondary right falls
      { xPct: 0.59, topPct: 0.28, botPct: 0.65, width: 18, speed: 16, color: 'rgba(220, 245, 255, 0.75)' },
      // Left rim bridal veil falls
      { xPct: 0.26, topPct: 0.32, botPct: 0.68, width: 14, speed: 13, color: 'rgba(200, 235, 245, 0.65)' },
      // Far right rim cascade
      { xPct: 0.63, topPct: 0.35, botPct: 0.64, width: 12, speed: 14, color: 'rgba(210, 240, 250, 0.6)' },
    ];

    // Falling water ribbons / droplets per cascade
    const ribbons = [];
    cascades.forEach((c) => {
      const count = waterVolume === 'torrential' ? 45 : 25;
      for (let i = 0; i < count; i++) {
        ribbons.push({
          cascade: c,
          offsetPct: (Math.random() - 0.5) * 0.03,
          yRatio: Math.random(), // 0 to 1 between topPct and botPct
          length: Math.random() * 45 + 25,
          thickness: Math.random() * 2.8 + 1.2,
          speedMult: Math.random() * 0.5 + 0.8,
          opacity: Math.random() * 0.4 + 0.5,
          shimmer: Math.random() * Math.PI * 2,
        });
      }
    });

    // Pool churning foam bubbles at the bottom of the falls
    const foamBubbles = Array.from({ length: 60 }, () => ({
      xRatio: 0.47 + (Math.random() - 0.5) * 0.18,
      yRatio: 0.58 + (Math.random() - 0.5) * 0.08,
      radius: Math.random() * 5 + 2,
      baseRadius: Math.random() * 5 + 2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.04 + 0.02,
    }));

    let frame = 0;

    const renderWaterfalls = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // A. Draw each cascading water chute with realistic rushing velocity
      cascades.forEach((c) => {
        const startX = (c.xPct) * width;
        const startY = (c.topPct) * height;
        const endY = (c.botPct) * height;
        const cascadeHeight = endY - startY;

        // Base glowing water body
        const grad = ctx.createLinearGradient(startX, startY, startX, endY);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
        grad.addColorStop(0.3, 'rgba(190, 242, 235, 0.6)');
        grad.addColorStop(0.85, 'rgba(240, 253, 250, 0.85)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

        ctx.beginPath();
        ctx.moveTo(startX - c.width * 0.3, startY);
        ctx.lineTo(startX + c.width * 0.3, startY);
        ctx.lineTo(startX + c.width * 0.6, endY);
        ctx.lineTo(startX - c.width * 0.6, endY);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // B. Animated rapid water ribbons plunging down
      ribbons.forEach((r) => {
        const c = r.cascade;
        const startX = (c.xPct + r.offsetPct) * width;
        const startY = c.topPct * height;
        const endY = c.botPct * height;
        const totalDist = endY - startY;

        // Accelerate downwards
        r.yRatio += (c.speed * 0.0016 * r.speedMult);
        if (r.yRatio > 1) {
          r.yRatio = 0;
          r.offsetPct = (Math.random() - 0.5) * 0.03;
        }

        const currY = startY + r.yRatio * totalDist;
        const currentLength = r.length * (1 + r.yRatio * 0.5); // elongates as it falls

        ctx.beginPath();
        ctx.moveTo(startX, currY);
        ctx.lineTo(startX, Math.min(endY, currY + currentLength));
        ctx.strokeStyle = `rgba(255, 255, 255, ${r.opacity * (0.6 + Math.sin(frame * 0.1 + r.shimmer) * 0.4)})`;
        ctx.lineWidth = r.thickness;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // C. Churning impact foam in the plunge pool
      foamBubbles.forEach((b) => {
        b.phase += b.speed;
        const curX = b.xRatio * width + Math.sin(b.phase) * 12;
        const curY = b.yRatio * height + Math.cos(b.phase) * 6;
        const currentRadius = b.baseRadius * (1 + Math.sin(b.phase * 2) * 0.35);

        const foamGrad = ctx.createRadialGradient(curX, curY, 0, curX, curY, currentRadius);
        foamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
        foamGrad.addColorStop(0.6, 'rgba(209, 250, 229, 0.45)');
        foamGrad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(curX, curY, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = foamGrad;
        ctx.fill();
      });

      animId = requestAnimationFrame(renderWaterfalls);
    };

    renderWaterfalls();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [waterVolume]);

  // 2. REALISTIC 3D DRONE SPRAY & VAPOR CLOUDS (Rising upwards and flying toward camera)
  useEffect(() => {
    const canvas = sprayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D Mist Particles flying out of the gorge
    const mistParticles = Array.from({ length: 140 }, () => ({
      x: width * 0.48 + (Math.random() - 0.5) * (width * 0.4),
      y: height * 0.65 + (Math.random() - 0.5) * (height * 0.2),
      z: Math.random() * 800 + 100, // 3D depth
      vx: (Math.random() - 0.5) * 1.8,
      vy: -Math.random() * 2.5 - 1.2, // Rising up
      radius: Math.random() * 25 + 15,
      alpha: Math.random() * 0.25 + 0.08,
      rotation: Math.random() * Math.PI * 2,
    }));

    const renderSpray = () => {
      ctx.clearRect(0, 0, width, height);

      mistParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z -= 1.8; // Moving towards camera

        if (p.z < 20 || p.y < -50 || p.x < -100 || p.x > width + 100) {
          p.z = 800;
          p.x = width * 0.48 + (Math.random() - 0.5) * (width * 0.35);
          p.y = height * 0.65 + Math.random() * (height * 0.15);
        }

        // Perspective projection
        const scale = 500 / p.z;
        const projRadius = p.radius * scale;
        const curAlpha = Math.min(0.4, p.alpha * (p.z / 800));

        const mistGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, projRadius);
        mistGrad.addColorStop(0, `rgba(255, 255, 255, ${curAlpha})`);
        mistGrad.addColorStop(0.5, `rgba(209, 250, 229, ${curAlpha * 0.5})`);
        mistGrad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(p.x, p.y, projRadius, 0, Math.PI * 2);
        ctx.fillStyle = mistGrad;
        ctx.fill();
      });

      animId = requestAnimationFrame(renderSpray);
    };

    renderSpray();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // 3. ULTRA PRO SCROLLING TRIGGER ANIMATION:
  // Pin section for 350vh.
  // Stage 1: Aerial Approach (High camera looking at circular canyon, text reveals)
  // Stage 2: Drone Plunge (Camera zooms from 1.0 to 2.7 right into the plunging waterfall!)
  // Stage 3: Systems Emerge from Mist (Staggered 3D perspective flip of Indotech production systems)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Phase 1: High Drone Approach -> Plunge Dive into the Canyon
      pinTimeline
        // Initial text fades and ascends
        .to(textPhase1Ref.current, {
          opacity: 0,
          y: -60,
          filter: 'blur(6px)',
          duration: 1,
          ease: 'power2.in',
        })
        // Dramatic Drone Camera Dive right into the plunging waterfall!
        .to(
          droneWrapperRef.current,
          {
            scale: 2.55,
            xPercent: -4,
            yPercent: -18,
            rotationZ: 1.8,
            duration: 3,
            ease: 'power2.inOut',
          },
          '-=0.5'
        )
        // Waterfall canvases zoom and intensify with the drone
        .to(
          [waterfallCanvasRef.current, sprayCanvasRef.current],
          {
            scale: 2.2,
            opacity: 1,
            duration: 3,
            ease: 'power2.inOut',
          },
          '<0'
        )
        // Phase 2 text appears in mid-plunge
        .fromTo(
          textPhase2Ref.current,
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power2.out' },
          '-=1.5'
        )
        // Cards container reveal
        .fromTo(
          cardsWrapperRef.current,
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' },
          '-=0.5'
        )
        // Stagger each enterprise system card with 3D perspective rotation
        .fromTo(
          cardRefs.current,
          {
            opacity: 0,
            y: 90,
            rotateX: 25,
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            stagger: 0.5,
            duration: 2,
            ease: 'power3.out',
          },
          '-=1'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 4. ACOUSTIC WATERFALL RUMBLE GENERATOR (Web Audio API)
  const toggleWaterfallSound = () => {
    if (soundActive) {
      if (waterfallGainRef.current && audioContextRef.current) {
        waterfallGainRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.4);
        setTimeout(() => setSoundActive(false), 400);
      }
    } else {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioCtx();
        }
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
        const ctx = audioContextRef.current;

        // Roaring waterfall white/brown noise
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
        }

        const brownSource = ctx.createBufferSource();
        brownSource.buffer = noiseBuffer;
        brownSource.loop = true;

        // Lowpass waterfall rumble filter
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 1);

        brownSource.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        brownSource.start(0);
        waterfallNoiseRef.current = brownSource;
        waterfallGainRef.current = gainNode;
        setSoundActive(true);
      } catch (e) {
        console.warn('Audio not supported', e);
      }
    }
  };

  return (
    <section
      id="waterfall"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-nature-darkest text-slate-100 flex items-center justify-center select-none"
    >
      {/* DRONE DIVE CAMERA WRAPPER */}
      <div
        ref={droneWrapperRef}
        className="absolute inset-0 z-0 overflow-hidden will-change-transform"
        style={{ transformOrigin: '48% 46%' }}
      >
        {/* User's Aerial Waterfall Chasm Base Image */}
        <div
          ref={waterfallImgRef}
          className="absolute -inset-24 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: "url('/assets/waterfall_aerial.jpg')",
            backgroundPosition: 'center 46%',
          }}
        />

        {/* REALISTIC ANIMATED WATERFALL CASCADES CANVAS */}
        <canvas
          ref={waterfallCanvasRef}
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-95"
        />

        {/* 3D DRONE VAPOR & SPRAY CANVAS */}
        <canvas
          ref={sprayCanvasRef}
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-85"
        />

        {/* Atmospheric Sunlight Refraction & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-nature-darkest via-nature-darkest/45 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-nature-darkest/80 via-transparent to-nature-darkest/80 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(16,185,129,0.22),transparent_70%)] pointer-events-none" />
      </div>

      {/* TOP HUD CONTROLS */}
      <div
        ref={hudRef}
        className="absolute top-24 inset-x-0 z-30 max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between pointer-events-auto"
      >
        <div className="glass-pill px-4 py-1.5 rounded-full flex items-center gap-2 border border-emerald-500/30 text-emerald-300 font-mono text-xs tracking-wider">
          <Droplets className="w-4 h-4 text-emerald-400 animate-bounce" />
          <span>REALISTIC WATERFALL DYNAMICS: {waterVolume.toUpperCase()}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Water Volume Toggle */}
          <button
            onClick={() => setWaterVolume(waterVolume === 'torrential' ? 'cinematic' : 'torrential')}
            className="interactive-item glass-pill px-3 py-1.5 rounded-full text-xs font-mono text-slate-200 hover:text-emerald-300 hover:border-emerald-400/50 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>FLOW: {waterVolume === 'torrential' ? 'TORRENTIAL (HEAVY)' : 'CINEMATIC (MIST)'}</span>
          </button>

          {/* Waterfall Acoustic Sound Toggle */}
          <button
            onClick={toggleWaterfallSound}
            aria-label="Toggle waterfall roaring sound"
            className="interactive-item glass-pill px-3 py-1.5 rounded-full text-xs font-mono text-emerald-300 hover:text-white border border-emerald-500/30 hover:border-emerald-400 transition-all flex items-center gap-1.5"
          >
            {soundActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>WATERFALL AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-emerald-400/70" />
                <span>ROAR AUDIO</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* PHASE 1: AERIAL TEXT REVEAL (High Drone Perspective) */}
      <div
        ref={textPhase1Ref}
        className="absolute z-20 max-w-4xl mx-auto px-6 text-center pointer-events-none will-change-transform"
      >
        <div className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 rounded-full text-emerald-300 font-mono text-xs tracking-widest uppercase mb-4 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <Waves className="w-3.5 h-3.5 text-emerald-400" />
          <span>03 // WATERFALL EXPERIENCE • REALISTIC FLOWING CASCADES</span>
        </div>
        <h2 className="font-cinematic text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase leading-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
          THE LIVING <span className="text-gradient-emerald">WATERFALLS</span>
        </h2>
        <p className="mt-4 text-slate-200 text-sm sm:text-lg font-light max-w-2xl mx-auto drop-shadow-md">
          A continuous torrent of kinetic energy plunging through ancient canyon rock.
          Scroll down to initiate the drone plunge into the roaring spray and reveal mission-critical systems.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-mono text-emerald-400/80 tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>SCROLL DOWN TO DIVE INTO THE GORGE</span>
        </div>
      </div>

      {/* PHASE 2: MID-PLUNGE SUBTITLE & CARDS (Emerges as Camera Zooms 2.5x) */}
      <div
        ref={cardsWrapperRef}
        className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 w-full flex flex-col items-center opacity-0 pointer-events-auto"
      >
        <div ref={textPhase2Ref} className="text-center max-w-2xl mx-auto mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold block mb-1">
            CANOPY DEPTH: 120M // INDOTECH PRODUCTION PIPELINES
          </span>
          <h3 className="font-cinematic text-2xl sm:text-4xl font-black text-white uppercase">
            AUTOMATED <span className="text-gradient-emerald">VELOCITY</span>
          </h3>
        </div>

        {/* 3 PRODUCTION SYSTEMS CARDS (Hover Zoom & Deep Dive) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {enterpriseProjects.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              onClick={() => onSelectProject && onSelectProject(project)}
              className="interactive-item glass-panel p-6 sm:p-7 rounded-3xl relative overflow-hidden group cursor-pointer border border-emerald-500/25 hover:border-emerald-400/60 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(16,185,129,0.35)] flex flex-col justify-between"
              style={{ perspective: '1000px' }}
            >
              {/* Top Card Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] text-emerald-300 uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25">
                    {project.category}
                  </span>
                  <span className="font-mono text-xs text-slate-400 font-bold">
                    0{idx + 1}
                  </span>
                </div>

                <h4 className="font-cinematic text-xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                  {project.title}
                </h4>

                <p className="text-slate-300 text-xs font-light leading-relaxed mb-4 line-clamp-2">
                  {project.subtitle}
                </p>

                {/* Metrics Pill */}
                <div className="mb-4 p-3 rounded-2xl bg-black/50 border border-emerald-500/20 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-mono text-emerald-300">{project.metrics}</span>
                </div>

                {/* Key feature preview */}
                <div className="space-y-1.5 mb-5 text-[11px] text-slate-300">
                  {project.keyFeatures.slice(0, 2).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-3 border-t border-emerald-500/15 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">
                  Tap for Blueprint
                </span>

                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-nature-darkest flex items-center justify-center transition-all">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator prompt */}
      <div className="absolute bottom-6 inset-x-0 text-center pointer-events-none z-30 font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400/60">
        Pinned Multi-Stage Scrub • Continue Scrolling to Reach Mountain Summit
      </div>
    </section>
  );
}
