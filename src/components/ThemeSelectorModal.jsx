import React from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import { backgroundThemes } from '../data/backgroundThemes';
import { soundFx } from '../utils/audioHelper';

export default function ThemeSelectorModal({ isOpen, onClose, currentThemeId, onSelectTheme }) {
  if (!isOpen) return null;

  const handleSelect = (id) => {
    soundFx.playTasbihClick();
    onSelectTheme(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900/95 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Pilih Suasana & Pemandangan Hati
            </h3>
            <p className="text-xs text-slate-400">
              Ubah latar belakang untuk menghadirkan ketenangan, harapan, dan energi positif.
            </p>
          </div>
        </div>

        {/* Theme Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
          {backgroundThemes.map((theme) => {
            const isSelected = currentThemeId === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => handleSelect(theme.id)}
                className={`relative group cursor-pointer overflow-hidden rounded-2xl border-2 transition-all p-3.5 flex flex-col justify-between min-h-[140px] shadow-lg ${
                  isSelected
                    ? 'border-emerald-400 ring-2 ring-emerald-500/40'
                    : 'border-slate-800 hover:border-slate-600'
                }`}
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.85)), url(${theme.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{theme.icon}</span>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white drop-shadow-md">
                    {theme.name}
                  </h4>
                  <p className="text-[10px] text-slate-200/90 leading-tight mt-1 line-clamp-2 drop-shadow">
                    {theme.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center text-xs text-slate-400 mt-2">
          💡 Pilihan latar belakang Anda akan tersimpan otomatis dan aktif di setiap kunjungan.
        </div>

      </div>
    </div>
  );
}
