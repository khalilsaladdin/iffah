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
import AudioPlayerBar from './components/AudioPlayerBar';
import { AudioProvider } from './context/AudioContext';
import { useDangerHours } from './utils/useDangerHours';
import { Shield, Heart, Sparkles, Download, Moon } from 'lucide-react';

function MainApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isPanicOpen, setIsPanicOpen] = useState(false);
  const [isInstallForceOpen, setIsInstallForceOpen] = useState(false);
  const [isNightShieldOpen, setIsNightShieldOpen] = useState(false);

  // Hook pendeteksi jam rawan malam (22:00 - 04:30)
  const { isDangerTime, currentHourText } = useDangerHours();

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white pb-20 lg:pb-12">
      
      {/* Navbar with SOS trigger, Jam Rawan & PWA installer */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPanic={() => setIsPanicOpen(true)}
        onOpenInstall={() => setIsInstallForceOpen(true)}
        onOpenNightShield={() => setIsNightShieldOpen(true)}
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

      {/* PWA Install Banner & Modal */}
      <InstallPwaModal 
        isForceOpen={isInstallForceOpen}
        onCloseForce={() => setIsInstallForceOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-8 px-4 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
              ع
            </div>
            <span className="font-semibold text-slate-400">
              Iffah (عِفَّة)
            </span>
            <span>—</span>
            <span>Platform Pemulihan & Penjaga Kehormatan Diri</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button 
              onClick={() => setIsNightShieldOpen(true)}
              className="hover:text-indigo-400 flex items-center gap-1 transition-colors"
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Benteng Jam Rawan</span>
            </button>
            <span>•</span>
            <button 
              onClick={() => setIsInstallForceOpen(true)}
              className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Pasang App (PWA)</span>
            </button>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Al-Qur'an & Sunnah</span>
          </div>
        </div>
      </footer>

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
