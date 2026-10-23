import React from 'react';
import { 
  Shield, 
  BookOpen, 
  Users, 
  FileText, 
  Sparkles, 
  Flame, 
  AlertTriangle, 
  BookMarked,
  Download,
  Moon
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenPanic, 
  onOpenInstall, 
  onOpenNightShield,
  onOpenThemeModal,
  activeThemeIcon,
  isDangerTime,
  streakDays 
}) {
  const navItems = [
    { id: 'dashboard', label: 'Beranda', icon: Shield },
    { id: 'spiritual', label: 'Al-Qur\'an & Sunnah', icon: BookOpen },
    { id: 'community', label: 'Halaqah Iffah', icon: Users },
    { id: 'articles', label: 'Wawasan & Sains', icon: FileText },
    { id: 'vault', label: 'Benteng Kesucian', icon: Sparkles },
    { id: 'journal', label: 'Jurnal Muhasabah', icon: BookMarked },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/75 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-emerald-600 to-teal-700 p-0.5 shadow-lg shadow-emerald-950/60 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-slate-950/90 rounded-[10px] flex items-center justify-center backdrop-blur-sm">
                <span className="font-arabic text-xl font-bold text-amber-300">ع</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  Iffah
                </span>
                <span className="font-arabic text-sm text-emerald-400 font-normal">
                  (عِفَّة)
                </span>
              </div>
              <p className="text-[10px] text-slate-300 hidden sm:block">
                Suaka Pemulihan & Penjaga Kesucian Diri
              </p>
            </div>
          </div>

          {/* Center Navigation for Desktop */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-700/40 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Suasana Theme, Danger Hours, Install PWA, Streak & SOS */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Theme Selector Button */}
            <button
              onClick={onOpenThemeModal}
              title="Ganti Pemandangan Suasana (Sunrise, Gunung, Laut, Bintang)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/70 border border-white/15 hover:border-amber-400/60 text-slate-200 hover:text-amber-300 text-xs font-medium transition-all backdrop-blur-md shadow"
            >
              <span className="text-sm">{activeThemeIcon || '🌅'}</span>
              <span className="hidden xl:inline text-[11px]">Suasana</span>
            </button>

            {/* Danger Hours (Jam Rawan) Button */}
            <button
              onClick={onOpenNightShield}
              title={isDangerTime ? "⚠️ Jam Rawan Sedang Aktif! Klik untuk perlindungan" : "Buka Benteng Jam Rawan"}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all backdrop-blur-md ${
                isDangerTime
                  ? 'bg-indigo-950/90 border-indigo-400 text-indigo-200 shadow-lg shadow-indigo-950/80 animate-pulse'
                  : 'bg-slate-900/70 border-white/10 text-slate-300 hover:text-indigo-300 hover:border-indigo-600/50'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">
                {isDangerTime ? 'Jam Rawan' : 'Benteng Malam'}
              </span>
            </button>

            {/* Install PWA Button */}
            <button
              onClick={onOpenInstall}
              title="Pasang Iffah di HP Anda"
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/70 border border-white/10 hover:border-emerald-500/60 text-slate-200 hover:text-emerald-300 text-xs font-medium transition-all backdrop-blur-md"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pasang App</span>
            </button>

            {/* Streak Indicator */}
            <div 
              onClick={() => setActiveTab('dashboard')}
              title="Hari Bebas Maksiat" 
              className="flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-500/40 hover:border-emerald-400/70 transition-colors px-2.5 sm:px-3 py-1.5 rounded-xl cursor-pointer backdrop-blur-md"
            >
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <div className="text-left">
                <div className="text-[10px] text-emerald-300 leading-none font-medium">Bersih</div>
                <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                  {streakDays} <span className="text-[10px] text-slate-300 font-normal">Hari</span>
                </div>
              </div>
            </div>

            {/* Panic Button (SOS Syahwat) */}
            <button
              onClick={onOpenPanic}
              className="relative group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-red-900/40 hover:shadow-red-700/60 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <AlertTriangle className="w-4 h-4" />
              <span className="tracking-wide">SOS</span>
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Bottom Bar Navigation */}
      <div className="lg:hidden flex items-center justify-around bg-slate-950/90 border-t border-white/10 px-2 py-2 overflow-x-auto backdrop-blur-xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-lg text-[10px] transition-all min-w-[56px] ${
                isActive
                  ? 'text-amber-400 font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 mb-1 ${isActive ? 'text-amber-400 scale-110' : 'text-slate-400'}`} />
              <span className="truncate max-w-[64px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
