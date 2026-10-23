import React, { useState } from 'react';
import { 
  Flame, 
  Award, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  BookOpen, 
  Users, 
  AlertTriangle,
  Calendar,
  CheckCircle,
  Plus,
  Moon,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audioHelper';

export default function DashboardView({ 
  streakData, 
  onResetStreak, 
  onAddDay, 
  setActiveTab, 
  onOpenPanic,
  onOpenNightShield,
  isDangerTime 
}) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetReason, setResetReason] = useState('');

  const days = streakData.days || 0;

  // Tentukan Maqam berdasarkan jumlah hari
  const getMaqamInfo = (d) => {
    if (d < 8) {
      return {
        level: "Tingkat 1",
        title: "Maqam Mujahid Awal",
        desc: "Fase krusial detoksifikasi dopamin. Tubuh dan pikiran sedang melawan sisa-sisa ketergantungan lama.",
        badgeColor: "from-amber-600 to-amber-700",
        nextTarget: 8,
        percent: Math.min(100, Math.round((d / 8) * 100))
      };
    } else if (d < 31) {
      return {
        level: "Tingkat 2",
        title: "Maqam Mutathohhir (Pembersihan Jiwa)",
        desc: "Prefrontal Cortex mulai menguat kembali. Konsentrasi meningkat dan rasa malu fitrah mulai pulih.",
        badgeColor: "from-teal-600 to-emerald-700",
        nextTarget: 31,
        percent: Math.min(100, Math.round(((d - 7) / 23) * 100))
      };
    } else if (d < 91) {
      return {
        level: "Tingkat 3",
        title: "Maqam Shabir (Keteguhan Hati)",
        desc: "Jalur saraf baru (neuroplastisitas) terbentuk kokoh. Kamu mulai merasakan manisnya kesucian pandangan.",
        badgeColor: "from-blue-600 to-indigo-700",
        nextTarget: 91,
        percent: Math.min(100, Math.round(((d - 30) / 60) * 100))
      };
    } else {
      return {
        level: "Tingkat 4",
        title: "Maqam 'Afif Mubarok (Puncak Kesucian)",
        desc: "MasyaAllah! Kamu telah memutus rantai adiksi dan menjadi teladan 'iffah sejati.",
        badgeColor: "from-emerald-500 to-emerald-700",
        nextTarget: 365,
        percent: 100
      };
    }
  };

  const maqam = getMaqamInfo(days);

  const handleCelebrate = () => {
    soundFx.playCelebrationTone();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    onAddDay();
  };

  const handleConfirmReset = () => {
    onResetStreak(resetReason || 'Terpeleset dan bertekad bangkit kembali');
    setShowResetConfirm(false);
    setResetReason('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Danger Hours Real-time Alert Banner */}
      {isDangerTime && (
        <div className="rounded-3xl bg-gradient-to-r from-indigo-950/90 via-purple-950/70 to-slate-950 border-2 border-indigo-500/80 p-5 sm:p-6 shadow-2xl shadow-indigo-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 text-indigo-300 flex items-center justify-center shrink-0">
              <Moon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-900/60 px-2.5 py-0.5 rounded-full border border-indigo-700">
                  Zona Jam Rawan Aktif (22.00 - 04.30)
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                Akal Logis Mulai Lelah. Jangan Bawa HP ke Kasur!
              </h3>
              <p className="text-xs text-indigo-200/80 mt-0.5">
                Ambil wudhu, jalankan 5 sunnah sebelum tidur, dan letakkan ponsel di meja luar.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenNightShield}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-950/60 transition-all hover:scale-105 shrink-0"
          >
            <Lock className="w-4 h-4" />
            <span>Benteng Malam & Adab Tidur</span>
          </button>
        </div>
      )}

      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/60 to-slate-900 border border-emerald-900/40 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-700/40 text-emerald-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Hijrah & Penjaga Kehormatan Diri</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Selamat Datang di <span className="text-emerald-400">Iffah</span>. Kamu Tidak Berjuang Sendirian.
          </h1>
          <p className="mt-2.5 text-slate-300 text-sm sm:text-base leading-relaxed">
            Allah tidak pernah menutup pintu taubat bagi hamba yang sungguh-sungguh ingin kembali suci. Di sini, kita saling menguatkan dengan Kalam Ilahi, As-Sunnah, dan sains pemulihan otak.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('spiritual')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-900/40 transition-all hover:scale-105"
            >
              <BookOpen className="w-4 h-4" />
              <span>Buka Materi Al-Qur'an & Sunnah</span>
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-all"
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Kunjungi Halaqah Dukungan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Streak Counter & Maqam Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Streak Counter Card (2 Cols on LG) */}
        <div className="lg:col-span-2 rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl">
          
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Clean Days Streak (Hari Menjaga 'Iffah)</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Dihitung sejak awal niat ikrar hijrah
              </p>
            </div>

            <button
              onClick={handleCelebrate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-800/70 text-emerald-300 text-xs font-semibold hover:bg-emerald-900 hover:text-white transition-all shadow"
              title="Catat 1 Hari Bersih Lagi!"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+1 Hari Bersih</span>
            </button>
          </div>

          {/* Big Number Display */}
          <div className="flex flex-col sm:flex-row items-center gap-6 my-4">
            <div className="relative flex items-center justify-center">
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900 border-2 border-emerald-700/60 shadow-2xl flex flex-col items-center justify-center text-center p-4">
                <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 font-mono tracking-tight">
                  {days}
                </span>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mt-1">
                  Hari Bersih
                </span>
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 text-xs font-medium text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mulai: {streakData.startDate ? new Date(streakData.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Hari Ini'}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Setiap detik adalah pahala mujahadah.
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Menundukkan pandangan dari yang diharamkan Allah bernilai ibadah yang sangat besar, melahirkan manisnya iman dalam hati.
              </p>
            </div>
          </div>

          {/* Progress to Next Milestone */}
          <div className="pt-4 border-t border-slate-800/80 mt-2 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Target Berikutnya: <strong className="text-white">{maqam.nextTarget} Hari</strong></span>
              <span className="text-emerald-400 font-semibold">{maqam.percent}% Menuju Maqam Selanjutnya</span>
            </div>
            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 rounded-full transition-all duration-700" 
                style={{ width: `${maqam.percent}%` }}
              />
            </div>
          </div>

          {/* Bottom Action: Reset Empathy Trigger */}
          <div className="mt-4 pt-4 border-t border-slate-800/50 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Terpeleset/Kambuh? Jangan putus asa dari rahmat Allah.
            </span>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="text-xs text-rose-400 hover:text-rose-300 underline font-medium transition-colors"
            >
              Evaluasi & Reset Streak
            </button>
          </div>

        </div>

        {/* Maqam & Status Badge Card */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400 mb-3">
              <Award className="w-4 h-4" />
              <span>Status Maqam Tazkiyah</span>
            </div>

            <div className={`p-4 rounded-2xl bg-gradient-to-r ${maqam.badgeColor} text-white shadow-lg mb-4`}>
              <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
                {maqam.level}
              </span>
              <h3 className="text-lg font-black tracking-tight mt-0.5">
                {maqam.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {maqam.desc}
            </p>

            <div className="space-y-2.5 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>PFC Otak dalam proses regenerasi</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sensitivitas reseptor dopamin membaik</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Kepekaan hati & khusyuk mulai terasa</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setActiveTab('vault')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Lihat Ikrar & Benteng 'Iffah</span>
            </button>
          </div>
        </div>

      </div>

      {/* Featured Ayat & Sunnah Highlight */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/40 border border-emerald-800/30 p-6 sm:p-8 text-center relative overflow-hidden">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 inline-block">
          Mutiara Kalamullah Hari Ini
        </span>
        <h2 className="font-arabic text-2xl sm:text-3xl text-emerald-300 font-bold leading-loose my-3">
          قُل لِّلْمُؤْمِنِينَ يَغُضُّوا مِنْ أَبْصَارِهِمْ وَيَحْفَظُوا فُرُوجَهُمْ ۚ ذَٰلِكَ أَزْكَىٰ لَهُمْ
        </h2>
        <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto italic">
          "Katakanlah kepada orang laki-laki yang beriman: Hendaklah mereka menahan pandangannya, dan memelihara kemaluannya; yang demikian itu adalah lebih suci bagi mereka..."
        </p>
        <span className="text-xs text-emerald-500 font-medium block mt-2">
          (QS. An-Nur: 30)
        </span>
      </div>

      {/* 4 Action Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Emergency Shield */}
        <div 
          onClick={onOpenPanic}
          className="group cursor-pointer rounded-3xl bg-gradient-to-b from-red-950/40 to-slate-900 border border-red-900/40 hover:border-red-600/70 p-6 transition-all duration-200 hover:-translate-y-1 shadow-lg"
        >
          <div className="w-11 h-11 rounded-2xl bg-red-600/20 text-red-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white group-hover:text-red-300 transition-colors">
            SOS Syahwat
          </h4>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            De-eskalasi 90 detik, latihan nafas, wudhu dan murottal darurat saat hasrat memuncak.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-red-400">
            <span>Buka Pelindung</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Danger Hours (Jam Rawan) */}
        <div 
          onClick={onOpenNightShield}
          className="group cursor-pointer rounded-3xl bg-gradient-to-b from-indigo-950/40 to-slate-900 border border-indigo-900/40 hover:border-indigo-500/70 p-6 transition-all duration-200 hover:-translate-y-1 shadow-lg"
        >
          <div className="w-11 h-11 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Moon className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
            Benteng Jam Rawan
          </h4>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            Checklist 5 sunnah sebelum tidur, aturan jauhkan HP dari kasur, dan mode istirahat suci.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-indigo-400">
            <span>Masuk Benteng Malam</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Articles & Science */}
        <div 
          onClick={() => setActiveTab('articles')}
          className="group cursor-pointer rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-700/60 p-6 transition-all duration-200 hover:-translate-y-1 shadow-lg"
        >
          <div className="w-11 h-11 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
            Sains & Tazkiyah
          </h4>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            Pahami neurosains dopamin, pemulihan Prefrontal Cortex, dan metode Takhalli ulama salaf.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <span>Baca Wawasan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 4: Safe Peer Support */}
        <div 
          onClick={() => setActiveTab('community')}
          className="group cursor-pointer rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-teal-700/60 p-6 transition-all duration-200 hover:-translate-y-1 shadow-lg"
        >
          <div className="w-11 h-11 rounded-2xl bg-teal-600/20 text-teal-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
            Halaqah Iffah
          </h4>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            Berbagi perjuangan tanpa membuka aib (anonim islami), saling mendoakan, dan merayakan kemenangan.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-teal-400">
            <span>Masuk Halaqah</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* Relapse Dialog Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-rose-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Bangkit Kembali & Sholat Taubat
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Jangan biarkan syaitan membisikkan bahwa kamu gagal total. Hari-hari bersihmu sebelumnya tetap berharga bagi pemulihan sarafmu. Sekarang, bersihkan diri, ambil wudhu, dan lakukan shalat taubat 2 rakaat.
            </p>

            <div className="mb-5">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Apa pemicu utamanya? (Untuk bahan evaluasimu)
              </label>
              <input 
                type="text"
                placeholder="Contoh: Larut malam sendirian memegang HP, lelah kerja..."
                value={resetReason}
                onChange={(e) => setResetReason(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700 transition-colors"
              >
                Batal (Saya Belum Relapse)
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500 transition-colors"
              >
                Reset & Niatkan Ulang Taubat Nasuha
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
