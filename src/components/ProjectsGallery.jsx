import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Terminal, Cpu, Layers, Sparkles, X, Check, Code, ShieldCheck, ArrowRight } from 'lucide-react';
import { projectsData } from '../data/portfolioData';

export default function ProjectsGallery({ selectedProject, onSelectProject, onCloseModal }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'AI & Distributed Systems', 'Enterprise Logistics Automation', 'FinTech & Corporate Analytics', 'Enterprise Productivity'];

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative min-h-screen py-28 md:py-36 bg-nature-darkest text-slate-100">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 rounded-full text-emerald-300 font-mono text-xs tracking-widest uppercase mb-3 border border-emerald-500/30">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>05 // ARCHITECTURAL SHOWCASE • MISSION-CRITICAL SYSTEMS</span>
          </div>
          <h2 className="font-cinematic text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-tight">
            SYSTEMS & <span className="text-gradient-emerald">INNOVATIONS</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base font-light">
            Engineered with rigorous full-stack standards, high throughput pipelines, and localized AI intelligence.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`interactive-item px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-emerald-500 text-nature-darkest font-bold shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                  : 'glass-panel text-slate-300 hover:text-emerald-300 hover:border-emerald-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => onSelectProject(project)}
              className="interactive-item group glass-panel rounded-3xl overflow-hidden border border-emerald-500/20 hover:border-emerald-400/50 cursor-pointer transition-all duration-500 hover:shadow-[0_20px_50px_rgba(16,185,129,0.2)] flex flex-col justify-between"
            >
              {/* Image Preview Banner */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nature-darkest via-nature-darkest/40 to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4">
                  <span className="glass-pill px-3 py-1 rounded-full text-xs font-mono text-emerald-300 border border-emerald-500/30">
                    {project.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <h3 className="font-cinematic text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {project.subtitle}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6 p-3.5 rounded-2xl bg-nature-forest/40 border border-emerald-500/15">
                    <span className="font-mono text-xs text-emerald-400 block font-semibold mb-1">
                      KEY METRIC & IMPACT:
                    </span>
                    <span className="font-mono text-xs text-slate-200">
                      {project.metrics}
                    </span>
                  </div>
                </div>

                {/* Tech Stack Pills & CTA */}
                <div className="pt-4 border-t border-emerald-500/15 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5 max-w-[80%]">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-nature-forest/80 text-emerald-300 border border-emerald-500/15"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-nature-darkest transition-all">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detailed Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseModal}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-3xl glass-panel rounded-3xl overflow-hidden border border-emerald-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[90vh] flex flex-col"
            >
              {/* Header Image */}
              <div className="relative h-56 sm:h-64 overflow-hidden shrink-0">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nature-darkest via-nature-darkest/60 to-transparent" />

                <button
                  onClick={onCloseModal}
                  aria-label="Close modal"
                  className="interactive-item absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white hover:text-emerald-400 border border-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6">
                  <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider block mb-1">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-cinematic text-2xl sm:text-3xl font-extrabold text-white">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Scrollable Modal Content */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div>
                  <h4 className="font-cinematic text-lg font-bold text-emerald-300 mb-2">
                    System Overview
                  </h4>
                  <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Key Architectural Highlights */}
                <div>
                  <h4 className="font-cinematic text-lg font-bold text-emerald-300 mb-3">
                    Architectural Highlights
                  </h4>
                  <ul className="space-y-3">
                    {selectedProject.keyFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-nature-forest/40 border border-emerald-500/15">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-200">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Impact / Metrics */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                  <span className="font-mono text-xs text-emerald-300 font-bold block mb-1">
                    MEASURED ENTERPRISE IMPACT:
                  </span>
                  <p className="text-sm font-mono text-white">
                    {selectedProject.metrics}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-2">
                    Technologies & Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-xl bg-nature-forest border border-emerald-500/25 text-emerald-300 font-mono text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-4 border-t border-emerald-500/20 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    Developed by Tamil Arasan
                  </span>
                  <button
                    onClick={onCloseModal}
                    className="interactive-item px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-nature-darkest font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  >
                    CLOSE SPECIFICATION
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

