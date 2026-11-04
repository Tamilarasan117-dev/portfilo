import React, { useState } from 'react'
import { PORTFOLIO_DATA } from '../../data/portfolioData'
import { 
  Compass, 
  MapPin, 
  Terminal, 
  ShieldCheck, 
  Layers, 
  ExternalLink, 
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react'

export function MilestoneOverlay({ selectedDistrict: propSelectedDistrict, onSelectDistrict }) {
  const [internalSelectedDistrict, setInternalSelectedDistrict] = useState(null)
  const [showIdentityModal, setShowIdentityModal] = useState(false)

  const activeModalDistrict = propSelectedDistrict !== undefined ? propSelectedDistrict : internalSelectedDistrict
  const setDistrict = onSelectDistrict || setInternalSelectedDistrict

  return (
    <>
      {/* 1. Top Brand Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-4 md:p-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          {/* Logo Badge */}
          <div className="w-11 h-11 rounded-lg bg-black/70 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.3)] backdrop-blur-md">
            <span className="font-['Orbitron'] font-black text-cyan-400 text-xl tracking-wider">T</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-['Orbitron'] font-bold text-xl md:text-2xl tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                TAMILARASAN
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-['Rajdhani'] font-bold uppercase tracking-wider bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 rounded">
                v1.0 // FOUNDATION
              </span>
            </div>
            <p className="text-xs text-slate-400 font-['Rajdhani'] font-medium hidden sm:block">
              Full-Stack Developer • Digital Transformation • AI Agent Architect
            </p>
          </div>
        </div>

        {/* Right Status Actions */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => setShowIdentityModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-black/60 border border-slate-700/60 hover:border-cyan-400/80 text-xs md:text-sm font-['Rajdhani'] font-semibold text-slate-200 hover:text-cyan-300 transition-all backdrop-blur-md cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>DEV INTEL</span>
          </button>
        </div>
      </header>

      {/* 2. Top-Center District Quick Bar */}
      <nav className="absolute top-20 md:top-6 left-1/2 -translate-x-1/2 z-10 pointer-events-auto max-w-[94vw] overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-black/75 border border-white/10 backdrop-blur-lg shadow-2xl">
          {PORTFOLIO_DATA.districts.map((d) => (
            <button
              key={d.id}
              onClick={() => setDistrict(d)}
              className={`px-2.5 py-1 rounded-lg text-xs font-['Rajdhani'] font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeModalDistrict?.id === d.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.themeColor }} />
              {d.shortTitle}
            </button>
          ))}
        </div>
      </nav>

      {/* 4. District Detail Modal (When Selected from District Bar or Proximity) */}
      {activeModalDistrict && (
        <div className="fixed inset-0 z-30 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-2xl bg-slate-950/95 border border-cyan-400/40 p-6 shadow-[0_0_50px_rgba(0,240,255,0.25)] text-left">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full shadow-[0_0_10px]" style={{ backgroundColor: activeModalDistrict.themeColor }} />
                <div>
                  <h3 className="font-['Orbitron'] font-bold text-lg text-white">
                    {`DISTRICT 0${activeModalDistrict.districtNumber} // ${activeModalDistrict.name}`}
                  </h3>
                  <p className="text-xs font-['Rajdhani'] text-slate-400">{activeModalDistrict.tagline}</p>
                </div>
              </div>
              <button
                onClick={() => setDistrict(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-5 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              <p className="text-sm text-slate-300 leading-relaxed font-['Inter']">
                {activeModalDistrict.description}
              </p>

              {/* Highlights for About */}
              {activeModalDistrict.highlights && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {activeModalDistrict.highlights.map((h, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-[11px] font-['Rajdhani'] font-semibold text-slate-400 uppercase">{h.label}</div>
                      <div className="text-sm font-semibold text-cyan-300 mt-0.5">{h.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Items for Education */}
              {activeModalDistrict.items && (
                <div className="space-y-3 pt-2">
                  {activeModalDistrict.items.map((edu, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/5 border border-blue-500/30">
                      <div className="flex justify-between items-start">
                        <div className="font-bold text-blue-300 font-['Rajdhani'] text-base">{edu.degree}</div>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-200 border border-blue-400/40">
                          {edu.grade}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">{edu.institution}</div>
                      <ul className="mt-3 space-y-1 text-xs text-slate-300 list-disc list-inside">
                        {edu.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Categories for Skills */}
              {activeModalDistrict.categories && (
                <div className="space-y-3 pt-2">
                  {activeModalDistrict.categories.map((cat, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/5 border border-emerald-500/30">
                      <div className="text-xs font-['Rajdhani'] font-bold text-emerald-400 uppercase tracking-wider mb-2">
                        {cat.name}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="px-2.5 py-1 text-xs rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Projects List */}
              {activeModalDistrict.projectsList && (
                <div className="space-y-3 pt-2">
                  {activeModalDistrict.projectsList.map((proj, pIdx) => (
                    <div key={pIdx} className="p-4 rounded-xl bg-white/5 border border-amber-500/30">
                      <div className="flex justify-between items-start">
                        <div className="font-bold text-amber-300 font-['Rajdhani'] text-base">{proj.title}</div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-200">
                          {proj.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {proj.technologies.map((t, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 text-[10px] rounded bg-white/10 text-slate-300 font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Experience */}
              {activeModalDistrict.experiences && (
                <div className="space-y-3 pt-2">
                  {activeModalDistrict.experiences.map((exp, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/5 border border-purple-500/30">
                      <div className="font-bold text-purple-300 font-['Rajdhani'] text-base">{exp.company}</div>
                      <div className="text-xs text-slate-400">{exp.role} • {exp.location}</div>
                      <ul className="mt-3 space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                        {exp.responsibilities.map((r, rIdx) => (
                          <li key={rIdx} className="leading-relaxed">{r}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Achievements */}
              {activeModalDistrict.awards && (
                <div className="space-y-3 pt-2">
                  {activeModalDistrict.awards.map((awd, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/5 border border-pink-500/30">
                      <div className="font-bold text-pink-300 font-['Rajdhani'] text-base">{awd.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{awd.organization}</div>
                      <p className="text-xs text-slate-300 mt-2">{awd.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Contact Garage */}
              {activeModalDistrict.contactInfo && (
                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-xl bg-white/5 border border-red-500/30 space-y-2">
                    <div className="text-xs text-slate-400">Direct Email:</div>
                    <a href={`mailto:${activeModalDistrict.contactInfo.email}`} className="block text-sm font-mono text-cyan-300 hover:underline">
                      {activeModalDistrict.contactInfo.email}
                    </a>
                    <div className="text-xs text-slate-400 pt-2">Phone / Mobile:</div>
                    <div className="text-sm font-mono text-slate-200">{activeModalDistrict.contactInfo.phone}</div>
                    <div className="text-xs text-slate-400 pt-2">Location:</div>
                    <div className="text-sm text-slate-200">{activeModalDistrict.contactInfo.location}</div>
                    <div className="pt-3 flex gap-3">
                      <a
                        href={activeModalDistrict.contactInfo.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-blue-600/30 border border-blue-400/40 text-blue-300 text-xs font-semibold hover:bg-blue-600/50 flex items-center gap-1.5"
                      >
                        LinkedIn <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setDistrict(null)}
                className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-['Orbitron'] font-bold text-xs uppercase hover:bg-cyan-400 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              >
                Close Station
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Developer Intel Modal */}
      {showIdentityModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-2xl bg-slate-950/95 border border-cyan-400/40 p-6 shadow-[0_0_50px_rgba(0,240,255,0.25)] text-left">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Terminal className="w-6 h-6 text-cyan-400" />
                <div>
                  <h3 className="font-['Orbitron'] font-bold text-lg text-white">TAMILARASAN</h3>
                  <p className="text-xs font-['Rajdhani'] text-cyan-300">Developer Dossier & Architecture</p>
                </div>
              </div>
              <button
                onClick={() => setShowIdentityModal(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-5 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <span className="text-xs font-['Rajdhani'] font-bold text-cyan-400 uppercase tracking-wider">Professional Bio</span>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed font-['Inter']">
                  {PORTFOLIO_DATA.identity.bio}
                </p>
              </div>

              <div>
                <span className="text-xs font-['Rajdhani'] font-bold text-cyan-400 uppercase tracking-wider">Career Goals</span>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed font-['Inter']">
                  {PORTFOLIO_DATA.identity.careerGoals}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[11px] font-['Rajdhani'] text-slate-400">Current Industrial Org</div>
                  <div className="text-xs font-bold text-white mt-1">Indotech Transformer Limited</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[11px] font-['Rajdhani'] text-slate-400">Academic Merit</div>
                  <div className="text-xs font-bold text-cyan-300 mt-1">B.Tech IT • 8.5 CGPA</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowIdentityModal(false)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-['Rajdhani'] font-bold text-xs uppercase transition-all cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

