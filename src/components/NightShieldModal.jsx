import React, { useState, useEffect } from 'react';
import { 
  Moon, 
  X, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  Bed, 
  Bell, 
  Droplets, 
  BookOpen, 
  Volume2, 
  ArrowRight,
  Clock,
  Lock,
  Headphones,
  Check
} from 'lucide-react';
import { bedtimeSunnahSteps, nighttimeTactics } from '../data/dangerHoursData';
import { soundFx } from '../utils/audioHelper';
import { useAudio } from '../context/AudioContext';
import { murottalTracks } from '../data/murottalData';

export default function NightShieldModal({ isOpen, onClose, isForceOpen }) {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [notificationStatus, setNotificationStatus] = useState('default');
  const [isSleepModeActive, setIsSleepModeActive] = useState(false);
  const [dangerHoursSettings, setDangerHoursSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('iffah_danger_hours_settings');
      return saved ? JSON.parse(saved) : { start: '22:00', end: '04:30', autoAlert: true };
    } catch {
      return { start: '22:00', end: '04:30', autoAlert: true };
    }
  });

  const { playTrack, currentTrack, isPlaying } = useAudio();

  useEffect(() => {
    if ('Notification' in window) {
      setNotificationStatus(Notification.permission);
    }
  }, []);

  const handleRequestNotification = async () => {
    if (!('Notification' in window)) {
      alert('Browser Anda tidak mendukung notifikasi sistem.');
      return;
    }
    const permission = await Notification.requestPermission();
    setNotificationStatus(permission);
    if (permission === 'granted') {
      soundFx.playCelebrationTone();
      new Notification('Iffah — Pengingat Jam Rawan Aktif', {
        body: 'Alhamdulillah! Kami akan mengingatkan Anda setiap pukul 22.00 untuk menjauhkan ponsel dari ranjang.',
        icon: '/pwa-192x192.png'
      });
    }
  };

  const toggleStep = (stepId) => {
    soundFx.playTasbihClick();
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter((id) => id !== stepId));
    } else {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const handleStartSleep = () => {
    soundFx.playCelebrationTone();
    setIsSleepModeActive(true);
  };

  if (!isOpen && !isForceOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-300">
      
      {/* Jika Mode Tidur Aktif (Layar Hening) */}
      {isSleepModeActive ? (
        <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-indigo-900/40 rounded-3xl p-8 text-center text-slate-100 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Moon className="w-8 h-8" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
            Selamat Beristirahat dalam Perlindungan Allah
          </h3>
          <p className="text-xs text-indigo-300 font-medium mb-6">
            Malaikat penjaga mendampingimu hingga azan Subuh berkumandang.
          </p>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed mb-6 italic">
            "Bismika Allahumma ahya wa bismika amut."
            <br />
            <span className="text-[10px] text-slate-500 not-italic block mt-1">
              (Dengan nama-Mu ya Allah, aku hidup dan aku mati)
            </span>
          </div>

          <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-900/40 text-xs text-indigo-200 mb-6">
            🛡️ <strong>Langkah Terakhir:</strong> Letakkan ponselmu sekarang di atas meja yang jauh dari kasur, lalu matikan lampu kamar.
          </div>

          <button
            onClick={() => {
              setIsSleepModeActive(false);
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Buka Kunci Layar (Keluar)
          </button>
        </div>
      ) : (
        /* Modal Utama Panduan Jam Rawan */
        <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/80">
          
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Tombol Tutup */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-start gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0 shadow-lg animate-pulse">
              <Moon className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-2.5 py-0.5 rounded-full">
                  Benteng Jam Rawan (22.00 - 04.30)
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Zona Waktu Paling Kritis Relapse
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Lebih dari 90% kekhilafan terjadi sendirian di atas ranjang saat larut malam. Kendalikan lingkunganmu sebelum kantuk mengikis akal sehatmu.
              </p>
            </div>
          </div>

          {/* Banner Quick Audio & Notification Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {/* Notifikasi Pengingat */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Notifikasi Jam Rawan</div>
                  <div className="text-[10px] text-slate-400">Peringatan otomatis pukul 22.00</div>
                </div>
              </div>
              {notificationStatus === 'granted' ? (
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800/60 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Aktif
                </span>
              ) : (
                <button
                  onClick={handleRequestNotification}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold transition-colors"
                >
                  Aktifkan
                </button>
              )}
            </div>

            {/* Murottal Pengantar Tidur */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Headphones className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Murottal An-Nur</div>
                  <div className="text-[10px] text-slate-400">Penenang jiwa sebelum tidur</div>
                </div>
              </div>
              <button
                onClick={() => playTrack(murottalTracks[0])}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold transition-colors"
              >
                {isPlaying && currentTrack?.id === 'm-annur' ? 'Jeda' : 'Putar'}
              </button>
            </div>
          </div>

          {/* Adab Tidur Sunnah Checklist */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
              <span>Benteng Sunnah Nabawiyyah Sebelum Tidur:</span>
              <span className="text-indigo-400 font-mono">
                {completedSteps.length} / {bedtimeSunnahSteps.length} Terlaksana
              </span>
            </div>

            <div className="space-y-2.5">
              {bedtimeSunnahSteps.map((step) => {
                const isChecked = completedSteps.includes(step.id);
                return (
                  <div
                    key={step.id}
                    onClick={() => toggleStep(step.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'bg-indigo-950/40 border-indigo-500/60 text-slate-200'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-lg border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                      isChecked ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700 bg-slate-900'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-xs font-bold ${isChecked ? 'text-indigo-300' : 'text-slate-200'}`}>
                          {step.title}
                        </h4>
                        <span className="text-[10px] text-slate-500">{step.source}</span>
                      </div>

                      {step.arabic && (
                        <p className="font-arabic text-sm text-right text-indigo-200/90 my-1 font-bold">
                          {step.arabic}
                        </p>
                      )}

                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Aturan Taktis Larut Malam */}
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-900/40 mb-6 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
              <ShieldAlert className="w-4 h-4" />
              <span>3 Aturan Emas Ranjang Bebas Maksiat:</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 pl-4 list-disc marker:text-indigo-400">
              {nighttimeTactics.map((tactic, idx) => (
                <li key={idx} className="leading-relaxed">
                  <strong className="text-white">{tactic.title}: </strong>
                  <span className="text-slate-400">{tactic.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action: Kunci HP & Tidur */}
          <button
            onClick={handleStartSleep}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-950/80 transition-all hover:scale-[1.01] active:scale-95"
          >
            <Lock className="w-4 h-4" />
            <span>Bismillah, Aku Letakkan HP di Luar & Tidur Sekarang!</span>
          </button>

        </div>
      )}

    </div>
  );
}
