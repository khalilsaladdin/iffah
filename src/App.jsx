import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import SpiritualHub from './components/SpiritualHub';
import CommunityHub from './components/CommunityHub';
import ArticlesHub from './components/ArticlesHub';
import IffahVault from './components/IffahVault';
import JournalHub from './components/JournalHub';
import PanicModal from './components/PanicModal';
import InstallPwaModal from './components/InstallPwaModal';
import NightShieldModal from './components/NightShieldModal';
import ThemeSelectorModal from './components/ThemeSelectorModal';
import ScreeningModal from './components/ScreeningModal';
import AudioPlayerBar from './components/AudioPlayerBar';
import { AudioProvider } from './context/AudioContext';
import { useDangerHours } from './utils/useDangerHours';
import { backgroundThemes } from './data/backgroundThemes';
import { Download, Moon, ClipboardCheck } from 'lucide-react';

function MainApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isPanicOpen, setIsPanicOpen] = useState(false);
  const [isInstallForceOpen, setIsInstallForceOpen] = useState(false);
  const [isNightShieldOpen, setIsNightShieldOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isScreeningOpen, setIsScreeningOpen] = useState(false);

  // Background Theme: Default Sunrise Fajar Harapan (Vibe Positif & Hangat)
  const [activeThemeId, setActiveThemeId] = useState(() => {
    try {
      const saved = localStorage.getItem('iffah_active_theme');
      return saved || 'sunrise';
    } catch {
      return 'sunrise';
    }
  });

  const activeTheme = backgroundThemes.find((t) => t.id === activeThemeId) || backgroundThemes[0];

  const handleSelectTheme = (id) => {
    setActiveThemeId(id);
    try {
      localStorage.setItem('iffah_active_theme', id);
    } catch {
      // fallback
    }
  };

  // Hook pendeteksi jam rawan malam (22:00 - 04:30)
  const { isDangerTime } = useDangerHours();

  // Persistent Clean Days Streak
  const [streakData, setStreakData] = useState(() => {
    try {
      const saved = localStorage.getItem('iffah_streak_data');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      days: 5,
      startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('iffah_streak_data', JSON.stringify(streakData));
    } catch {
      // fallback
    }
  }, [streakData]);

  const handleResetStreak = (reason) => {
    setStreakData({
      days: 0,
      startDate: new Date().toISOString()
    });
    // Simpan ke log muhasabah secara otomatis jika ada
    try {
      const savedEntries = localStorage.getItem('iffah_journal_entries');
      const entries = savedEntries ? JSON.parse(savedEntries) : [];
      const resetEntry = {
        id: `reset-${Date.now()}`,
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        mood: 'Sedang Bangkit Kembali',
        triggers: [reason || 'Kekhilafan sesaat'],
        counterAction: 'Mandi taubat, wudhu, dan bertekad memperbaiki dinding pertahanan diri.',
        reflection: 'Ya Allah, ampunilah hamba-Mu yang lemah ini. Jangan biarkan syaitan menertawakan kejatuhanku. Bimbing aku untuk bangkit lebih kuat.'
      };
      localStorage.setItem('iffah_journal_entries', JSON.stringify([resetEntry, ...entries]));
    } catch {
      // ignore
    }
  };

  const handleAddDay = () => {
    setStreakData((prev) => ({
      ...prev,
      days: prev.days + 1
    }));
  };

  return (
    <div 
      className="min-h-screen text-slate-100 flex flex-col selection:bg-amber-500 selection:text-white pb-20 lg:pb-12 relative transition-all duration-700 bg-cover bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage: `url(${activeTheme.imageUrl})`
      }}
    >
      {/* Dynamic Atmospheric Gradient Overlay */}
      <div 
        className={`fixed inset-0 bg-gradient-to-b ${activeTheme.overlay} backdrop-blur-[2px] transition-all duration-700 pointer-events-none z-0`} 
      />

      {/* Main Container relative to sit on top of background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navbar with SOS trigger, Jam Rawan, Theme & PWA installer */}
        <Navbar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenPanic={() => setIsPanicOpen(true)}
          onOpenInstall={() => setIsInstallForceOpen(true)}
          onOpenNightShield={() => setIsNightShieldOpen(true)}
          onOpenThemeModal={() => setIsThemeModalOpen(true)}
          onOpenScreening={() => setIsScreeningOpen(true)}
          activeThemeIcon={activeTheme.icon}
          isDangerTime={isDangerTime}
          streakDays={streakData.days}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {activeTab === 'dashboard' && (
            <DashboardView 
              streakData={streakData}
              onResetStreak={handleResetStreak}
              onAddDay={handleAddDay}
              setActiveTab={setActiveTab}
              onOpenPanic={() => setIsPanicOpen(true)}
              onOpenNightShield={() => setIsNightShieldOpen(true)}
              onOpenScreening={() => setIsScreeningOpen(true)}
              isDangerTime={isDangerTime}
            />
          )}

          {activeTab === 'spiritual' && <SpiritualHub />}

          {activeTab === 'community' && <CommunityHub />}

          {activeTab === 'articles' && <ArticlesHub />}

          {activeTab === 'vault' && <IffahVault />}

          {activeTab === 'journal' && <JournalHub />}
        </main>

        {/* Persistent Floating Audio Player Bar */}
        <AudioPlayerBar />

        {/* SOS Syahwat Emergency Modal */}
        <PanicModal 
          isOpen={isPanicOpen}
          onClose={() => setIsPanicOpen(false)}
        />

        {/* Benteng Jam Rawan Malam Modal */}
        <NightShieldModal 
          isOpen={isNightShieldOpen}
          onClose={() => setIsNightShieldOpen(false)}
          isForceOpen={isNightShieldOpen}
        />

        {/* Theme Selector Modal */}
        <ThemeSelectorModal 
          isOpen={isThemeModalOpen}
          onClose={() => setIsThemeModalOpen(false)}
          currentThemeId={activeThemeId}
          onSelectTheme={handleSelectTheme}
        />

        {/* Tes Skrining Mandiri Modal */}
        <ScreeningModal 
          isOpen={isScreeningOpen}
          onClose={() => setIsScreeningOpen(false)}
        />

        {/* PWA Install Banner & Modal */}
        <InstallPwaModal 
          isForceOpen={isInstallForceOpen}
          onCloseForce={() => setIsInstallForceOpen(false)}
        />

        {/* Footer with Theme Pill & Quick Links */}
        <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-xl py-8 px-4 text-center text-xs text-slate-400 mt-12">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 font-bold text-xs">
                ع
              </div>
              <span className="font-semibold text-slate-200">
                Iffah (عِفَّة)
              </span>
              <span>—</span>
              <span>Platform Pemulihan & Penjaga Kehormatan Diri</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300">
              <button 
                onClick={() => setIsScreeningOpen(true)}
                className="hover:text-amber-300 flex items-center gap-1.5 transition-colors font-medium text-amber-300/90"
              >
                <ClipboardCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Tes Skrining CPAS</span>
              </button>
              <span>•</span>
              <button 
                onClick={() => setIsThemeModalOpen(true)}
                className="hover:text-amber-300 flex items-center gap-1.5 transition-colors font-medium"
              >
                <span>{activeTheme.icon}</span>
                <span>Suasana: {activeTheme.name}</span>
              </button>
              <span>•</span>
              <button 
                onClick={() => setIsNightShieldOpen(true)}
                className="hover:text-indigo-400 flex items-center gap-1 transition-colors"
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Benteng Malam</span>
              </button>
              <span>•</span>
              <button 
                onClick={() => setIsInstallForceOpen(true)}
                className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Pasang App (PWA)</span>
              </button>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default function App() {
  return (
    <AudioProvider>
      <MainApp />
    </AudioProvider>
  );
}
