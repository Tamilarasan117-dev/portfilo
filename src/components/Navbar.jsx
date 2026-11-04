import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Compass, Sparkles, FileText } from 'lucide-react';
import AudioPlayer from './AudioPlayer';

export default function Navbar({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Forest', href: '#forest' },
    { name: 'Waterfall', href: '#waterfall' },
    { name: 'Mountain', href: '#mountain' },
    { name: '3D Realm', href: '#three-realm' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3.5 bg-nature-darkest/80 backdrop-blur-xl border-b border-emerald-500/15 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'py-6 bg-gradient-to-b from-black/80 via-black/30 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#hero"
            className="interactive-item group flex items-center gap-3 text-white focus:outline-none"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-800 p-0.5 shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.7)] transition-all duration-300">
              <div className="w-full h-full bg-nature-darkest rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-emerald-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-cinematic font-bold tracking-widest text-sm md:text-base text-slate-100 group-hover:text-emerald-300 transition-colors">
                TAMIL ARASAN
              </span>
              <span className="text-[10px] font-mono tracking-wider text-emerald-400/80 -mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                AI & FULL-STACK
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 glass-pill px-4 py-1.5 rounded-full border border-emerald-500/20">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="interactive-item px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-full transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs: Audio Toggle & Resume */}
          <div className="hidden sm:flex items-center gap-3">
            <AudioPlayer />
            <button
              onClick={onOpenResume}
              className="interactive-item flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-nature-darkest font-mono text-xs font-semibold tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.7)] hover:scale-105"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>RESUME</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <AudioPlayer />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="interactive-item p-2 rounded-lg bg-nature-forest/60 border border-emerald-500/30 text-emerald-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[65px] z-40 bg-nature-darkest/95 backdrop-blur-2xl border-b border-emerald-500/20 px-6 py-8 lg:hidden flex flex-col gap-4 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="interactive-item px-4 py-2.5 rounded-xl text-slate-200 hover:text-emerald-300 hover:bg-emerald-500/10 font-cinematic text-lg tracking-wider flex items-center justify-between border border-transparent hover:border-emerald-500/20 transition-all"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400/60" />
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-emerald-500/20 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-3 rounded-xl bg-emerald-500 text-nature-darkest font-mono text-sm font-bold tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <FileText className="w-4 h-4" />
                <span>VIEW PROFILE & RESUME</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

