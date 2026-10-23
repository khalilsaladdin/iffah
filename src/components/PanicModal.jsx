import React, { useState, useEffect } from 'react';
import { 
  AlertOctagon, 
  X, 
  Wind, 
  Flame, 
  Droplets, 
  CheckCircle2, 
  Volume2, 
  Sparkles, 
  ArrowRight,
  Headphones,
  Play,
  Pause
} from 'lucide-react';
import { soundFx } from '../utils/audioHelper';
import { useAudio } from '../context/AudioContext';
import { murottalTracks } from '../data/murottalData';

export default function PanicModal({ isOpen, onClose }) {
  const [secondsLeft, setSecondsLeft] = useState(90);
  const [currentStep, setCurrentStep] = useState(0);
  const [breathPhase, setBreathPhase] = useState('Tarik Nafas...'); // Tarik Nafas, Tahan, Hembuskan

  const { currentTrack, isPlaying, playTrack } = useAudio();

  useEffect(() => {
    let timer = null;
    if (isOpen) {
      soundFx.playCalmingChime();
      timer = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isOpen]);

  // Breathing cycle every 12 seconds
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      const sec = 90 - secondsLeft;
      const mod = sec % 12;
      if (mod < 4) {
        setBreathPhase('Tarik Nafas Dalam... (4s)');
      } else if (mod < 8) {
        setBreathPhase('Tahan Nafas & Istighfar... (4s)');
      } else {
        setBreathPhase('Hembuskan Perlahan... Lepaskan Nafsu (4s)');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, secondsLeft]);

  if (!isOpen) return null;

  const handlePlayEmergencyMurottal = () => {
    const anNurTrack = murottalTracks[0]; // Surah An-Nur
    playTrack(anNurTrack);
  };

  const steps = [
    {
      title: "1. Muraqabatullah: Allah Melihatmu!",
      icon: Flame,
      color: "from-amber-500 to-red-600",
      verse: "أَلَمْ يَعْلَم بِأَنَّ اللَّهَ يَرَىٰ",
      verseMeaning: "Tidakkah dia mengetahui bahwa sesungguhnya Allah melihat? (QS. Al-Alaq: 14)",
      action: "Tatap layarmu sekarang dan katakan dalam hati: 'Rabb-ku sedang memandangku. Aku tidak sudi mempermalukan diriku di hadapan-Nya.'"
    },
    {
      title: "2. Jauhi Ruangan & Taruh Handphone!",
      icon: AlertOctagon,
      color: "from-red-600 to-rose-700",
      action: "Letakkan HP sekarang di atas meja, BERDIRI, dan berjalanlah keluar dari ruangan/kamar tertutup ini. Buka pintu lebar-lebar atau hampiri keluarga."
    },
    {
      title: "3. Dinginkan dengan Air Wudhu!",
      icon: Droplets,
      color: "from-cyan-500 to-blue-600",
      action: "Nabi ﷺ bersabda: 'Sesungguhnya amarah dan syahwat itu dari syaitan, dan syaitan diciptakan dari api, maka padamkanlah dengan air wudhu.' Basuh wajah dan kepalamu dengan air dingin menyegarkan."
    },
    {
      title: "4. Shalat Sunnah 2 Rakaat atau Push-Up",
      icon: Sparkles,
      color: "from-emerald-500 to-teal-600",
      action: "Alihkan aliran darah dan dopaminmu ke aktivitas fisik: lakukan 20-30 push-up cepat, lalu hamparkan sajadah untuk bersujud kepada Allah."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-red-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/60">
        
        {/* Glow ambient background */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 animate-pulse">
            <AlertOctagon className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/60 border border-red-800/60 px-2.5 py-0.5 rounded-full">
                Darurat Syahwat
              </span>
              <span className="text-xs text-slate-400">
                Putus Gelombang Impuls
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
              Tahan! Gelombang Ini Akan Mereda
            </h2>
          </div>
        </div>

        {/* Emergency Murottal Player Trigger */}
        <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/60 border border-emerald-800/50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <Headphones className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">
                Murottal Penenang Jiwa: Surah An-Nur
              </h4>
              <p className="text-[10px] text-emerald-400">
                Lantunan Syaikh Mishary Rashid Alafasy
              </p>
            </div>
          </div>

          <button
            onClick={handlePlayEmergencyMurottal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow"
          >
            {isPlaying && currentTrack?.id === 'm-annur' ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-white" />
                <span>Jeda</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Putar Murottal</span>
              </>
            )}
          </button>
        </div>

        {/* 90-Second Countdown & Breathing Circle */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-5 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-around gap-4">
            
            {/* Visual Timer */}
            <div className="relative flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border-4 border-red-500/20 flex items-center justify-center bg-slate-900 shadow-inner">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {secondsLeft}s
                </span>
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-spin opacity-30" style={{ animationDuration: '6s' }} />
            </div>

            {/* Breathing Guidance */}
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <Wind className="w-4 h-4 animate-bounce" />
                Latihan Nafas & Tenangkan Otak (PFC)
              </div>
              <div className="text-sm sm:text-base font-bold text-white transition-all">
                {breathPhase}
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Ucapkan: <span className="text-emerald-300 font-semibold italic">"Astaghfirullahal 'Adzim wa atubu ilaih"</span> di setiap hembusan nafas.
              </p>
            </div>

            {/* Audio chime button */}
            <button
              onClick={() => soundFx.playCalmingChime()}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 hover:bg-slate-800 hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Bunyikan Lonceng Ketenangan"
            >
              <Volume2 className="w-4 h-4" />
              <span>Chime</span>
            </button>
          </div>
        </div>

        {/* Tactical Steps Selector */}
        <div className="space-y-3 mb-5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Langkah Penyelamatan Diri Seketika:</span>
            <span>Langkah {currentStep + 1} dari {steps.length}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 transition-all">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-slate-800 text-emerald-400 shrink-0">
                {React.createElement(steps[currentStep].icon, { className: "w-5 h-5" })}
              </div>
              <div className="flex-1">
                <h4 className="text-sm sm:text-base font-bold text-white mb-1">
                  {steps[currentStep].title}
                </h4>

                {steps[currentStep].verse && (
                  <div className="my-2 p-2.5 bg-slate-950 rounded-xl border border-emerald-900/40 text-center">
                    <p className="font-arabic text-lg sm:text-xl text-emerald-300 font-bold mb-1">
                      {steps[currentStep].verse}
                    </p>
                    <p className="text-xs text-slate-300 italic">
                      "{steps[currentStep].verseMeaning}"
                    </p>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {steps[currentStep].action}
                </p>
              </div>
            </div>
          </div>

          {/* Step dots navigation */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex gap-1.5">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentStep === idx ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-800 hover:bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                >
                  <span>Langkah Berikutnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    soundFx.playCelebrationTone();
                    onClose();
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Alhamdulillah, Aku Selamat!</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer Warning & Affirmation */}
        <div className="p-3 bg-red-950/40 border border-red-900/40 rounded-xl text-center">
          <p className="text-xs text-red-200">
            ⚠️ <strong>Ingatlah:</strong> Kenikmatan palsu 3 menit akan meninggalkan penyesalan berhari-hari, mengikis iman, dan memadamkan kehormatan dirimu. Bertahanlah karena Allah!
          </p>
        </div>

      </div>
    </div>
  );
}
