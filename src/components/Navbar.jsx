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
  Download
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenPanic, onOpenInstall, streakDays }) {
  const navItems = [
    { id: 'dashboard', label: 'Beranda', icon: Shield },
    { id: 'spiritual', label: 'Al-Qur\'an & Sunnah', icon: BookOpen },
    { id: 'community', label: 'Halaqah Iffah', icon: Users },
    { id: 'articles', label: 'Wawasan & Sains', icon: FileText },
    { id: 'vault', label: 'Benteng Kesucian', icon: Sparkles },
    { id: 'journal', label: 'Jurnal Muhasabah', icon: BookMarked },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 p-0.5 shadow-lg shadow-emerald-900/40 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-arabic text-xl font-bold text-emerald-400">ع</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xl tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  Iffah
                </span>
                <span className="font-arabic text-sm text-emerald-400/80 font-normal">
                  (عِفَّة)
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Suaka Pemulihan & Penjaga Kesucian Diri
              </p>
            </div>
          </div>

          {/* Center Navigation for Desktop */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/70 p-1.5 rounded-2xl border border-slate-800/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-500/80'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Install PWA, Streak & SOS */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Install PWA Button */}
            <button
              onClick={onOpenInstall}
              title="Pasang Iffah di HP Anda"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-600/60 text-slate-300 hover:text-emerald-300 text-xs font-medium transition-all"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pasang App</span>
            </button>

            {/* Streak Indicator */}
            <div 
              onClick={() => setActiveTab('dashboard')}
              title="Hari Bebas Maksiat" 
              className="flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-800/50 hover:border-emerald-500/60 transition-colors px-2.5 sm:px-3 py-1.5 rounded-xl cursor-pointer"
            >
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <div className="text-left">
                <div className="text-[10px] text-emerald-400/80 leading-none font-medium">Bersih</div>
                <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                  {streakDays} <span className="text-[10px] text-slate-400 font-normal">Hari</span>
                </div>
              </div>
            </div>

            {/* Panic Button (SOS Syahwat) */}
            <button
              onClick={onOpenPanic}
              className="relative group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-red-900/30 hover:shadow-red-700/50 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
              <AlertTriangle className="w-4 h-4" />
              <span className="tracking-wide">SOS Syahwat</span>
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Bottom Bar Navigation */}
      <div className="lg:hidden flex items-center justify-around bg-slate-950/95 border-t border-slate-800 px-2 py-2 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-lg text-[10px] transition-all min-w-[56px] ${
                isActive
                  ? 'text-emerald-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 mb-1 ${isActive ? 'text-emerald-400 scale-110' : 'text-slate-400'}`} />
              <span className="truncate max-w-[64px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
