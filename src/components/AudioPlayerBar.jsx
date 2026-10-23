import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  X, 
  Music, 
  RotateCcw, 
  ChevronUp, 
  ChevronDown, 
  Loader2
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default function AudioPlayerBar() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    isPlayerOpen,
    togglePlay,
    seek,
    changeVolume,
    stopAudio
  } = useAudio();

  const [isExpanded, setIsExpanded] = useState(false);

  if (!currentTrack || !isPlayerOpen) return null;

  return (
    <div className="fixed bottom-14 lg:bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 animate-in slide-in-from-bottom-5 duration-300">
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 border-2 border-emerald-600/50 rounded-3xl p-4 sm:p-5 shadow-2xl shadow-emerald-950/80 backdrop-blur-xl">
        
        {/* Top Bar: Title & Controls */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isPlaying ? (
                <div className="flex items-end gap-0.5 h-4">
                  <span className="w-1 bg-emerald-400 rounded-full animate-bounce" style={{ height: '100%', animationDelay: '0ms' }} />
                  <span className="w-1 bg-emerald-400 rounded-full animate-bounce" style={{ height: '60%', animationDelay: '150ms' }} />
                  <span className="w-1 bg-emerald-400 rounded-full animate-bounce" style={{ height: '80%', animationDelay: '300ms' }} />
                </div>
              ) : (
                <Music className="w-5 h-5" />
              )}
            </div>

            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white truncate flex items-center gap-1.5">
                <span>{currentTrack.surahName}</span>
              </h4>
              <p className="text-[11px] text-emerald-400 truncate">
                {currentTrack.reciter}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title={isExpanded ? "Sembunyikan detail" : "Buka detail ayat"}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
            <button
              onClick={stopAudio}
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
              title="Tutup pemutar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="space-y-1 my-2">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main Controls: Play/Pause, Rewind, Volume */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => seek(Math.max(0, currentTime - 15))}
            className="text-slate-400 hover:text-white p-1 rounded-lg text-xs flex items-center gap-0.5"
            title="Mundur 15 detik"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[10px]">-15s</span>
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-950/60 transition-transform active:scale-95"
            title={isPlaying ? "Jeda" : "Putar"}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => changeVolume(volume === 0 ? 0.8 : 0)}
              className="text-slate-400 hover:text-white"
            >
              {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => changeVolume(Number(e.target.value))}
              className="w-14 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 hidden sm:block"
            />
          </div>
        </div>

        {/* Expanded Details: Faidah & Focus Verses */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 space-y-2 animate-in fade-in duration-200">
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-emerald-900/40">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
                Fokus Renungan:
              </span>
              <p className="text-[11px] font-medium text-white">
                {currentTrack.focusVerses}
              </p>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              "{currentTrack.wisdom}"
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
