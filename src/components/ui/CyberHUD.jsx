import React from 'react'
import { PORTFOLIO_DATA } from '../../data/portfolioData'
import {
  Zap,
  Camera,
  Navigation,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  MousePointer,
  Flame
} from 'lucide-react'

export function CyberHUD({
  telemetry,
  activeDistrict,
  onEnterDistrict,
  cameraMode,
  onToggleCamera,
  carController
}) {
  const {
    speedKmh = 0,
    rpm = 800,
    gear = 'N',
    coords = { x: 0, z: 0 },
    isBraking = false,
    isBoosting = false,
    steerInputRatio = 0
  } = telemetry

  const speedPct = Math.min(100, Math.round((speedKmh / 160) * 100))
  const rpmPct = Math.min(100, Math.round((rpm / 8500) * 100))

  return (
    <>
      {/* 1. Proximity Banner When Close to Any District Beacon */}
      {activeDistrict && (
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-20 pointer-events-auto animate-bounce">
          <button
            onClick={() => onEnterDistrict(activeDistrict)}
            className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-black/90 border border-cyan-400 text-white font-['Orbitron'] font-bold text-xs uppercase tracking-widest shadow-[0_0_40px_rgba(0,240,255,0.7)] backdrop-blur-md cursor-pointer hover:bg-cyan-500/25 transition-all"
          >
            <span className="w-3.5 h-3.5 rounded-full animate-ping" style={{ backgroundColor: activeDistrict.themeColor }} />
            <span>ENTER {activeDistrict.name}</span>
            <span className="px-2 py-0.5 rounded bg-cyan-400 text-black text-[10px] font-black">E / CLICK</span>
          </button>
        </div>
      )}

      {/* 2. Top-Right Camera View Switcher */}
      <div className="absolute top-20 md:top-6 right-4 md:right-6 z-20 pointer-events-auto flex items-center gap-2">
        <button
          onClick={onToggleCamera}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/80 border border-white/20 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 text-xs font-['Rajdhani'] font-bold uppercase tracking-wider backdrop-blur-md transition-all shadow-xl cursor-pointer"
        >
          <Camera className="w-4 h-4 text-cyan-400" />
          <span>{cameraMode === 'chase' ? 'CHASE CAM' : 'ORBIT CAM'}</span>
          <span className="text-[10px] text-slate-400 font-mono">[C]</span>
        </button>
      </div>

      {/* 3. Center Screen Steering Reticle / Crosshair Indicator */}
      {cameraMode === 'chase' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex flex-col items-center opacity-60">
          <div className="relative w-16 h-1 flex items-center justify-center">
            {/* Center mark */}
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
            {/* Steering deflection dot */}
            <div
              className="absolute w-2.5 h-2.5 rounded-full bg-white border border-cyan-400 shadow-[0_0_10px_#22d3ee] transition-all duration-75"
              style={{
                transform: `translateX(${-steerInputRatio * 32}px)`
              }}
            />
          </div>
        </div>
      )}

      {/* 4. Bottom-Left Mini Radar */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-auto hidden md:block">
        <div className="p-3 rounded-2xl bg-black/85 border border-white/10 backdrop-blur-md shadow-2xl w-44 h-44 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-['Rajdhani'] font-bold text-slate-400 uppercase">
            <span className="flex items-center gap-1 text-cyan-400">
              <Navigation className="w-3 h-3" /> RADAR
            </span>
            <span className="font-mono text-slate-300">
              {Math.round(coords.x)}, {Math.round(coords.z)}
            </span>
          </div>

          {/* Radar Grid Field */}
          <div className="relative w-full h-28 my-1 rounded-xl bg-slate-950/90 border border-white/5 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-px bg-cyan-500/15" />
              <div className="h-full w-px bg-cyan-500/15 absolute" />
              <div className="w-20 h-20 rounded-full border border-cyan-500/15 absolute" />
            </div>

            {/* 7 District Landmarks on Radar */}
            {PORTFOLIO_DATA.districts.map((d) => {
              const rx = ((d.worldPosition[0] + 80) / 160) * 100
              const rz = ((d.worldPosition[2] + 90) / 180) * 100
              return (
                <div
                  key={d.id}
                  title={d.shortTitle}
                  className="absolute w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2 cursor-pointer shadow-[0_0_8px]"
                  style={{
                    left: `${rx}%`,
                    top: `${rz}%`,
                    backgroundColor: d.themeColor,
                    boxShadow: `0 0 8px ${d.themeColor}`
                  }}
                  onClick={() => onEnterDistrict(d)}
                />
              )
            })}

            {/* Player Car Blip */}
            <div
              className="absolute w-3 h-3 rounded-full bg-white border border-cyan-400 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_#00f0ff] z-10"
              style={{
                left: `${((coords.x + 80) / 160) * 100}%`,
                top: `${((coords.z + 90) / 180) * 100}%`
              }}
            />
          </div>

          <div className="text-[10px] font-['Rajdhani'] text-slate-400 flex justify-between">
            <span className="text-cyan-300 font-bold">TAMILARASAN GT</span>
            <span className={isBraking ? 'text-red-400 font-bold' : isBoosting ? 'text-cyan-400 font-bold' : 'text-emerald-400 font-bold'}>
              {isBraking ? 'BRAKE' : isBoosting ? 'NITRO' : 'DRIVE'}
            </span>
          </div>
        </div>
      </div>

      {/* 5. Center-Bottom Fast Action Driving Bar (Fast Access for Mouse/Touch) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex items-center gap-2">
        {/* Turn Left Fast Button */}
        <button
          onMouseDown={() => carController?.triggerControl('left', true)}
          onMouseUp={() => carController?.triggerControl('left', false)}
          onTouchStart={() => carController?.triggerControl('left', true)}
          onTouchEnd={() => carController?.triggerControl('left', false)}
          className="w-12 h-12 rounded-xl bg-black/85 border border-cyan-400/50 hover:bg-cyan-500/30 text-white flex flex-col items-center justify-center font-['Orbitron'] font-bold text-xs shadow-lg backdrop-blur-md active:scale-95 transition-all select-none cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-cyan-400" />
          <span className="text-[8px] text-slate-400">A</span>
        </button>

        {/* Gas / Accelerate Button */}
        <button
          onMouseDown={() => carController?.triggerControl('forward', true)}
          onMouseUp={() => carController?.triggerControl('forward', false)}
          onTouchStart={() => carController?.triggerControl('forward', true)}
          onTouchEnd={() => carController?.triggerControl('forward', false)}
          className="w-14 h-12 rounded-xl bg-gradient-to-t from-cyan-600/40 to-blue-600/40 border border-cyan-400 text-white flex flex-col items-center justify-center font-['Orbitron'] font-bold text-xs shadow-[0_0_18px_rgba(0,240,255,0.4)] backdrop-blur-md active:scale-95 transition-all select-none cursor-pointer"
        >
          <ArrowUp className="w-5 h-5 text-cyan-300" />
          <span className="text-[9px] text-cyan-200">GAS / W</span>
        </button>

        {/* Brake / Reverse Button */}
        <button
          onMouseDown={() => carController?.triggerControl('backward', true)}
          onMouseUp={() => carController?.triggerControl('backward', false)}
          onTouchStart={() => carController?.triggerControl('backward', true)}
          onTouchEnd={() => carController?.triggerControl('backward', false)}
          className="w-14 h-12 rounded-xl bg-gradient-to-t from-red-600/40 to-rose-600/40 border border-red-500/60 text-white flex flex-col items-center justify-center font-['Orbitron'] font-bold text-xs shadow-[0_0_18px_rgba(239,68,68,0.3)] backdrop-blur-md active:scale-95 transition-all select-none cursor-pointer"
        >
          <ArrowDown className="w-5 h-5 text-rose-300" />
          <span className="text-[9px] text-rose-200">BRAKE / S</span>
        </button>

        {/* Turn Right Fast Button */}
        <button
          onMouseDown={() => carController?.triggerControl('right', true)}
          onMouseUp={() => carController?.triggerControl('right', false)}
          onTouchStart={() => carController?.triggerControl('right', true)}
          onTouchEnd={() => carController?.triggerControl('right', false)}
          className="w-12 h-12 rounded-xl bg-black/85 border border-cyan-400/50 hover:bg-cyan-500/30 text-white flex flex-col items-center justify-center font-['Orbitron'] font-bold text-xs shadow-lg backdrop-blur-md active:scale-95 transition-all select-none cursor-pointer"
        >
          <ArrowRight className="w-5 h-5 text-cyan-400" />
          <span className="text-[8px] text-slate-400">D</span>
        </button>

        {/* Nitro Boost Button */}
        <button
          onMouseDown={() => carController?.triggerControl('boost', true)}
          onMouseUp={() => carController?.triggerControl('boost', false)}
          onTouchStart={() => carController?.triggerControl('boost', true)}
          onTouchEnd={() => carController?.triggerControl('boost', false)}
          className={`h-12 px-3 rounded-xl border flex items-center gap-1.5 font-['Orbitron'] font-bold text-xs shadow-lg backdrop-blur-md active:scale-95 transition-all select-none cursor-pointer ${isBoosting
              ? 'bg-cyan-500 text-black border-white shadow-[0_0_25px_#00f0ff]'
              : 'bg-black/85 text-cyan-400 border-cyan-400/50 hover:bg-cyan-500/20'
            }`}
        >
          <Flame className="w-4 h-4 text-cyan-300 animate-pulse" />
          <span className="text-[10px]">NITRO</span>
        </button>
      </div>

      {/* 6. Bottom-Right Cyberpunk Telemetry HUD */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-auto">
        <div className="p-4 rounded-2xl bg-black/90 border border-cyan-500/40 backdrop-blur-md shadow-[0_0_35px_rgba(0,240,255,0.2)] flex flex-col gap-2 min-w-[215px]">
          {/* Digital Speed & Gear */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="font-['Orbitron'] font-black text-4xl text-white tracking-tight drop-shadow-[0_0_18px_rgba(0,240,255,0.9)]">
                {speedKmh}
              </span>
              <span className="text-xs font-['Rajdhani'] font-bold text-cyan-400 tracking-wider">
                KM/H
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="px-2.5 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-['Orbitron'] font-bold text-sm">
                {gear}
              </div>
            </div>
          </div>

          {/* Vertical Tachometer Segment Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-['Rajdhani'] font-semibold text-slate-400">
              <span>RPM: {rpm}</span>
              <span className="text-cyan-300 font-mono">{speedPct}% PWR</span>
            </div>
            <div className="h-2.5 w-full bg-slate-900 rounded-sm overflow-hidden flex gap-0.5 p-0.5 border border-white/10">
              {Array.from({ length: 24 }).map((_, i) => {
                const active = (i / 24) * 100 <= rpmPct
                const isRedline = i >= 20
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-[1px] transition-colors duration-75 ${active
                        ? isRedline
                          ? 'bg-red-500 shadow-[0_0_8px_#ef4444]'
                          : 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]'
                        : 'bg-slate-800/60'
                      }`}
                  />
                )
              })}
            </div>
          </div>

          {/* Mouse Controls Helper badge */}
          <div className="pt-1 border-t border-white/10 text-[9px] font-['Rajdhani'] text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1 text-cyan-300">
              <MousePointer className="w-3 h-3" /> LMB Gas • RMB Brake
            </span>
            <span className="text-slate-400">Mouse Steer Active</span>
          </div>
        </div>
      </div>
    </>
  )
}
