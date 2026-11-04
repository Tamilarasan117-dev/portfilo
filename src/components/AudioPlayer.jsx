import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Disc, Sparkles, ChevronUp, ChevronDown, Play, Pause } from 'lucide-react';

const TRACKS = [
  {
    id: 'forest',
    title: 'Emerald Canopy',
    artist: 'Morning Rainforest Ambience',
    src: '/assets/forest_birds.mp3',
    genre: 'Nature Soundscape',
  },
  {
    id: 'cinematic',
    title: 'Cinematic Odyssey',
    artist: 'Atmospheric Orchestral',
    src: '/assets/cinematic_theme.mp3',
    genre: 'Melodic Soundtrack',
  },
  {
    id: 'rain',
    title: 'Misty Cascades',
    artist: 'Gentle Rainfall & Stream',
    src: '/assets/rain_stream.mp3',
    genre: 'Water & Mist',
  },
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [volume, setVolume] = useState(0.45);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);

  const currentTrack = TRACKS[currentTrackIdx];

  // Initialize Audio
  useEffect(() => {
    const audio = new Audio(currentTrack.src);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Update track src when user selects another track
  const switchTrack = (idx) => {
    setCurrentTrackIdx(idx);
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      audioRef.current.pause();
      audioRef.current.src = TRACKS[idx].src;
      audioRef.current.volume = volume;
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch((e) => console.log('Autoplay error', e));
      }
    }
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio play was prevented by browser policy:', err);
        });
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  return (
    <>
      {/* 1. COMPACT NAVBAR PILL (Click to Toggle Play/Pause or Expand) */}
      <div className="relative">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause soundtrack' : 'Play cinematic soundtrack'}
          className="interactive-item group flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-nature-dark/85 backdrop-blur-md text-emerald-300 hover:text-emerald-100 hover:border-emerald-400/60 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] text-xs tracking-wider"
        >
          <div className="flex items-center gap-1.5">
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-emerald-400 rounded-full animate-pulse h-3"></span>
                  <span className="w-0.5 bg-emerald-300 rounded-full animate-pulse h-2" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-0.5 bg-emerald-400 rounded-full animate-pulse h-3.5" style={{ animationDelay: '300ms' }}></span>
                  <span className="w-0.5 bg-emerald-200 rounded-full animate-pulse h-1.5" style={{ animationDelay: '75ms' }}></span>
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-emerald-400/60 group-hover:text-emerald-400" />
                <Music className="w-3 h-3 text-emerald-400/80" />
              </>
            )}
          </div>

          <span className="hidden sm:inline font-mono font-medium max-w-[120px] truncate">
            {isPlaying ? currentTrack.title : 'PLAY SOUNDTRACK'}
          </span>

          <span
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-0.5 hover:bg-emerald-500/20 rounded cursor-pointer ml-0.5"
            title="Music Settings"
          >
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </span>
        </button>

        {/* 2. EXPANDABLE MUSIC PLAYLIST DROPDOWN */}
        {isExpanded && (
          <div className="absolute right-0 top-full mt-2 w-72 glass-panel p-4 rounded-2xl border border-emerald-500/30 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-emerald-500/20">
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                <Disc className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin-slow text-emerald-400' : 'text-slate-400'}`} />
                <span>Cinematic Soundtrack</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">3 Tracks</span>
            </div>

            {/* Tracks List */}
            <div className="space-y-1.5 mb-3">
              {TRACKS.map((track, i) => (
                <button
                  key={track.id}
                  onClick={() => switchTrack(i)}
                  className={`w-full text-left p-2 rounded-xl transition-all flex items-center justify-between text-xs ${currentTrackIdx === i
                      ? 'bg-emerald-500/20 border border-emerald-500/35 text-white'
                      : 'hover:bg-white/5 text-slate-300'
                    }`}
                >
                  <div className="truncate pr-2">
                    <div className="font-semibold text-emerald-300 truncate">{track.title}</div>
                    <div className="text-[10px] text-slate-400 truncate">{track.artist}</div>
                  </div>
                  {currentTrackIdx === i && isPlaying && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {/* Volume Slider */}
            <div className="pt-2 border-t border-emerald-500/20 flex items-center gap-2.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase">VOL</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-nature-forest rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <span className="text-[10px] font-mono text-emerald-400">{Math.round(volume * 100)}%</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. FLOATING AMBIENT MUSIC HUD (Bottom Left for easy access) */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-3 glass-panel px-4 py-2.5 rounded-2xl border border-emerald-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.7)]">
        <button
          onClick={togglePlay}
          className="interactive-item w-8 h-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-nature-darkest flex items-center justify-center transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          aria-label={isPlaying ? 'Pause soundtrack' : 'Play soundtrack'}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-cinematic font-bold text-white tracking-wide">
              {currentTrack.title}
            </span>
            {isPlaying && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            )}
          </div>
          <span className="text-[10px] font-mono text-emerald-400/90 -mt-0.5">
            {currentTrack.artist}
          </span>
        </div>
      </div>
    </>
  );
}
