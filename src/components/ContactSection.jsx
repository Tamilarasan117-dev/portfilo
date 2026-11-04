import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, Mail, Phone, MapPin, Linkedin, ArrowUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function ContactSection({ onOpenResume }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Live Chennai, India IST clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory nature confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#10b981', '#34d399', '#6ee7b7', '#fbbf24'],
      });
    }, 900);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="relative min-h-screen pt-28 pb-12 bg-nature-darkest text-slate-100 flex flex-col justify-between overflow-hidden"
    >
      {/* Background Starry Mist & Mountain Silhouette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.12),transparent_75%)]" />
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-black via-nature-darkest/90 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 w-full mb-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 rounded-full text-emerald-300 font-mono text-xs tracking-widest uppercase mb-3 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>06 // REACH OUT • TRANSMISSION TO CHENNAI</span>
          </div>
          <h2 className="font-cinematic text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-tight">
            LET'S BUILD THE <span className="text-gradient-emerald">EXTRAORDINARY</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base font-light">
            Whether architecting next-generation AI agents, scaling enterprise systems, or exploring visionary full-stack engineering collaborations.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Direct Info & Location Card (5 Cols) */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-emerald-500/25 flex flex-col justify-between">
            <div>
              <h3 className="font-cinematic text-2xl font-bold text-white mb-2">
                Tamil Arasan
              </h3>
              <p className="text-xs font-mono text-emerald-400 mb-6">
                Information Technology Professional & Software Developer
              </p>

              <div className="space-y-4 mb-8">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="interactive-item flex items-center gap-3 p-3.5 rounded-2xl bg-nature-forest/40 border border-emerald-500/15 hover:border-emerald-400/50 hover:bg-emerald-500/10 transition-all text-slate-200"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono text-emerald-400 block uppercase">Email</span>
                    <span className="font-mono text-xs truncate block text-slate-100">{personalInfo.email}</span>
                  </div>
                </a>

                <a
                  href="tel:+916369199759"
                  className="interactive-item flex items-center gap-3 p-3.5 rounded-2xl bg-nature-forest/40 border border-emerald-500/15 hover:border-emerald-400/50 hover:bg-emerald-500/10 transition-all text-slate-200"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 block uppercase">Mobile</span>
                    <span className="font-mono text-xs text-slate-100">{personalInfo.phone}</span>
                  </div>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="interactive-item flex items-center gap-3 p-3.5 rounded-2xl bg-nature-forest/40 border border-emerald-500/15 hover:border-emerald-400/50 hover:bg-emerald-500/10 transition-all text-slate-200"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono text-emerald-400 block uppercase">LinkedIn Network</span>
                    <span className="font-mono text-xs truncate block text-slate-100">linkedin.com/in/tamil-arasan-9b2418258</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-nature-forest/40 border border-emerald-500/15 text-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 block uppercase">Location</span>
                    <span className="font-mono text-xs text-slate-100">{personalInfo.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Time indicator pill */}
            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                  CHENNAI, INDIA (IST)
                </span>
                <span className="font-mono text-base font-bold text-emerald-400">
                  {currentTime || 'Loading...'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>OPEN TO ROLES</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Message Form (7 Cols) */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-emerald-500/25 relative overflow-hidden">
            <h3 className="font-cinematic text-2xl font-bold text-white mb-2">
              Send Direct Dispatch
            </h3>
            <p className="text-xs font-mono text-slate-400 mb-6">
              Initiate a high-priority transmission or project collaboration.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-14 text-center flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-cinematic text-2xl font-bold text-white mb-2">
                  Dispatch Transmitted
                </h4>
                <p className="text-slate-300 text-sm max-w-md font-light mb-6">
                  Thank you for reaching out. Tamil Arasan will review your message and respond shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="interactive-item px-6 py-2.5 rounded-full bg-nature-forest border border-emerald-500/30 text-emerald-300 font-mono text-xs hover:bg-emerald-500/20 transition-all"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-2xl bg-nature-forest/50 border border-emerald-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-2xl bg-nature-forest/50 border border-emerald-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1.5">
                    Message / Collaboration Inquiry
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, team opportunity, or engineering inquiry..."
                    className="w-full px-4 py-3 rounded-2xl bg-nature-forest/50 border border-emerald-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="interactive-item w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-nature-darkest font-mono font-bold tracking-wider text-sm flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_45px_rgba(16,185,129,0.6)] transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-nature-darkest border-t-transparent rounded-full animate-spin"></span>
                      <span>TRANSMITTING...</span>
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>TRANSMIT DISPATCH</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Smooth Footer Banner */}
      <div className="border-t border-emerald-500/20 pt-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} <span className="text-white font-semibold">TAMIL ARASAN</span>. Handcrafted with Cinematic 3D & Nature Aesthetics.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenResume}
              className="interactive-item text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
            >
              Curriculum Vitae
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="interactive-item flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 hover:bg-emerald-500 hover:text-nature-darkest transition-all"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

