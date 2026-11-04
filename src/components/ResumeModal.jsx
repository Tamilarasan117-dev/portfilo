import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Mail, Phone, MapPin, Linkedin, Award, Briefcase, GraduationCap, Code2, Sparkles } from 'lucide-react';
import { personalInfo, skillsData, experienceData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-4xl glass-panel rounded-3xl border border-emerald-500/30 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] max-h-[92vh] flex flex-col bg-nature-darkest text-slate-100"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-nature-forest/80 via-nature-deep to-nature-darkest border-b border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
                  CURRICULUM VITAE
                </span>
                <span className="text-slate-400 text-xs">• Verified Dossier</span>
              </div>
              <h2 className="font-cinematic text-2xl sm:text-3xl font-extrabold text-white">
                {personalInfo.name}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-300 font-mono mt-0.5">
                {personalInfo.title}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="mailto:tamil636919@gmail.com"
                className="interactive-item px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-nature-darkest font-mono text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>CONTACT DIRECTLY</span>
              </a>

              <button
                onClick={onClose}
                aria-label="Close resume"
                className="interactive-item p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 font-light text-sm">
            {/* Contact details row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-nature-forest/30 border border-emerald-500/15 font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:tamil636919@gmail.com" className="hover:text-emerald-300 underline">
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Linkedin className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-300 underline truncate"
                >
                  linkedin.com/in/tamil-arasan
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h3 className="font-cinematic text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Professional Summary
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {personalInfo.bio}
              </p>
            </div>

            {/* Industrial Experience */}
            <div>
              <h3 className="font-cinematic text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                Industrial Experience
              </h3>

              {experienceData.map((exp, i) => (
                <div key={i} className="p-5 rounded-2xl bg-nature-forest/40 border border-emerald-500/20">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h4 className="font-cinematic text-base font-bold text-emerald-300">
                      {exp.role}
                    </h4>
                    <span className="font-mono text-xs text-slate-400">{exp.period}</span>
                  </div>
                  <div className="font-mono text-xs text-white mb-3">
                    {exp.company} • {exp.location}
                  </div>
                  <ul className="space-y-2 mb-4 text-xs text-slate-300 list-disc list-inside">
                    {exp.responsibilities.map((r, rIdx) => (
                      <li key={rIdx} className="leading-relaxed">
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-nature-forest text-[11px] font-mono text-emerald-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div>
              <h3 className="font-cinematic text-lg font-bold text-white mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                Education & Credentials
              </h3>
              <div className="p-5 rounded-2xl bg-nature-forest/40 border border-emerald-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="font-cinematic text-base font-bold text-white">
                    {personalInfo.education.degree}
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {personalInfo.education.institution}
                  </p>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
                  CGPA: {personalInfo.education.cgpa}
                </div>
              </div>
            </div>

            {/* Technical Skills & AI Tools */}
            <div>
              <h3 className="font-cinematic text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                Core Technical Skills & AI Developer Toolchain
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-nature-forest/40 border border-emerald-500/15">
                  <span className="font-mono text-xs text-emerald-400 font-bold block mb-2">
                    CORE PROFICIENCIES
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {skillsData.coreTechnical.map((s) => (
                      <span key={s.name} className="px-2 py-1 rounded bg-black/40 text-xs font-mono text-slate-200">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-nature-forest/40 border border-emerald-500/15">
                  <span className="font-mono text-xs text-amber-300 font-bold block mb-2">
                    AI WORKFLOWS & TOOLS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {skillsData.developerAndAiTools.map((t) => (
                      <span key={t.name} className="px-2 py-1 rounded bg-black/40 text-xs font-mono text-amber-200">
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

