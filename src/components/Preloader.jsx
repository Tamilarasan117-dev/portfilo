import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 600);
          }, 300);
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 4;
        return Math.min(100, prev + increment);
      });
    }, 70);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] } }}
          className="fixed inset-0 z-[99999] bg-nature-darkest flex flex-col items-center justify-center p-6 select-none overflow-hidden"
        >
          {/* Subtle god-rays in preloader */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_70%)] pointer-events-none" />

          {/* Central Logo Emblem */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center mb-8 relative z-10"
          >
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-800 p-0.5 shadow-[0_0_35px_rgba(16,185,129,0.45)] mb-4">
              <div className="w-full h-full bg-nature-darkest rounded-[22px] flex items-center justify-center">
                <Compass className="w-8 h-8 text-emerald-400 animate-spin-slow" />
              </div>
            </div>

            <h1 className="font-cinematic text-2xl font-bold tracking-widest text-white uppercase">
              TAMIL ARASAN
            </h1>
            <span className="text-xs font-mono tracking-widest text-emerald-400/80 uppercase mt-1">
              Cinematic Nature 3D Experience
            </span>
          </motion.div>

          {/* Progress Indicator */}
          <div className="w-64 sm:w-80 flex flex-col items-center gap-3 relative z-10">
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-emerald-300 to-emerald-400 transition-all duration-150 ease-out shadow-[0_0_15px_#10b981]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="tracking-wider uppercase">Synthesizing Biosphere...</span>
              <span className="text-emerald-400 font-bold">{progress}%</span>
            </div>
          </div>

          {/* Quote */}
          <div className="absolute bottom-10 inset-x-0 text-center text-xs font-mono text-slate-400/60 tracking-wider">
            "Nature never rushes, yet everything is accomplished."
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

