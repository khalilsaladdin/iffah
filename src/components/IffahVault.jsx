import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  Calculator, 
  Award, 
  CheckCircle2, 
  Clock,
  BookOpen,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { whyHatePornography, whyLoveIffah, iffahPledgeText } from '../data/hatePornLoveIffahData';
import { soundFx } from '../utils/audioHelper';

export default function IffahVault() {
  const [activeTab, setActiveTab] = useState('hate_love'); // 'hate_love', 'calculator', 'pledge'
  
  // State Kalkulator Kerusakan
  const [hoursPerWeek, setHoursPerWeek] = useState(5);
  const [yearsAddicted, setYearsAddicted] = useState(3);

  // Perhitungan Kalkulator
  const totalHoursWasted = hoursPerWeek * 52 * yearsAddicted;
  const totalDaysWasted = Math.round((totalHoursWasted / 24) * 10) / 10;
  const potentialBooksRead = Math.round(totalHoursWasted / 6); // 1 buku = 6 jam
  const potentialJuzMemorized = Math.round(totalHoursWasted / 20); // 1 juz = 20 jam

  // State Ikrar
  const [pledgeName, setPledgeName] = useState('');
  const [isPledged, setIsPledged] = useState(false);
  const [pledgeDate, setPledgeDate] = useState('');

  const handleSignPledge = (e) => {
    e.preventDefault();
    if (!pledgeName.trim()) return;

    soundFx.playCelebrationTone();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
    setPledgeDate(new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }));
    setIsPledged(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Senjata Mental & Penguat Jiwa</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Benteng 'Iffah: Benci Maksiat, Cintai Kesucian
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tumbuhkan rasa jijik pada industri kotor dan nyalakan api cinta pada kemuliaan fitrah sucimu.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('hate_love')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'hate_love'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Fakta Benci vs Cinta
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'calculator'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Kalkulator Waktu Terbuang
          </button>
          <button
            onClick={() => setActiveTab('pledge')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'pledge'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ikrar Janji Suci 'Iffah
          </button>
        </div>
      </div>

      {/* TAB 1: FAKTA BENCI VS CINTA */}
      {activeTab === 'hate_love' && (
        <div className="space-y-8">
          
          {/* SISI 1: MENGAPA HARUS MEMBENCI PORNOGRAFI */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-bold">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-red-400">
                  Mengapa Kamu Harus Membenci Pornografi?
                </h3>
                <p className="text-xs text-slate-400">
                  Jangan terkecoh oleh tipu daya syaitan. Ketahui wajah aslinya yang menjijikkan.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {whyHatePornography.map((item) => (
                <div 
                  key={item.id}
                  className="rounded-3xl bg-slate-900/90 border border-red-950/80 p-6 flex flex-col justify-between hover:border-red-800/70 transition-all shadow-md"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 block mb-1">
                      {item.tagline}
                    </span>
                    <h4 className="text-base font-bold text-white mb-3">
                      {item.title}
                    </h4>

                    <ul className="space-y-2 mb-4 text-xs text-slate-300">
                      {item.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-red-400 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-red-950/30 rounded-xl border border-red-900/30 text-[11px] text-red-200/80 italic">
                    "{item.hadithQuote}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SISI 2: MENGAPA HARUS MENCINTAI KESUCIAN ('IFFAH) */}
          <div className="pt-6 border-t border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-emerald-400">
                  Mengapa Kamu Harus Mencintai Kesucian Diri ('Iffah)?
                </h3>
                <p className="text-xs text-slate-400">
                  Kesucian diri adalah mahkota tertinggi kemuliaan seorang mukmin di dunia dan akhirat.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whyLoveIffah.map((item) => (
                <div 
                  key={item.id}
                  className="rounded-3xl bg-slate-900/90 border border-emerald-950/80 p-6 hover:border-emerald-800/70 transition-all shadow-md"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-base font-bold text-white">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: KALKULATOR WAKTU TERBUANG (REALITY CHECK) */}
      {activeTab === 'calculator' && (
        <div className="max-w-3xl mx-auto rounded-3xl bg-slate-900/95 border border-slate-800 p-6 sm:p-10 shadow-2xl">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 mb-3">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Kalkulator Kerusakan (Reality Check)
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
              Menyadari betapa mahalnya modal usia yang dirampok oleh layar maksiat. Mari hentikan kebocoran berkah ini sekarang!
            </p>
          </div>

          {/* Sliders Input */}
          <div className="space-y-6 mb-8 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>Rata-rata waktu menonton per minggu:</span>
                <span className="text-amber-400 font-bold">{hoursPerWeek} Jam / Minggu</span>
              </div>
              <input 
                type="range"
                min="1"
                max="30"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <span className="text-[10px] text-slate-500 block mt-1">
                (Termasuk waktu mencari video, browsing pemicu, melamun, dan rasa lemas sesudahnya)
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>Berapa tahun sudah terikat kebiasaan ini?</span>
                <span className="text-amber-400 font-bold">{yearsAddicted} Tahun</span>
              </div>
              <input 
                type="range"
                min="1"
                max="20"
                value={yearsAddicted}
                onChange={(e) => setYearsAddicted(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>

          {/* Results Display */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-900/40 text-center">
              <Clock className="w-5 h-5 text-red-400 mx-auto mb-1.5" />
              <span className="text-2xl sm:text-3xl font-black text-white font-mono block">
                {totalHoursWasted.toLocaleString()} Jam
              </span>
              <span className="text-[11px] text-red-300 font-medium">
                Waktu Emas Dirampok (≈ {totalDaysWasted} Hari Penuh 24 Jam)
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-900/40 text-center">
              <BookOpen className="w-5 h-5 text-emerald-400 mx-auto mb-1.5" />
              <span className="text-2xl sm:text-3xl font-black text-white font-mono block">
                {potentialBooksRead} Buku
              </span>
              <span className="text-[11px] text-emerald-300 font-medium">
                Buku Bermanfaat yang Bisa Selesai Dibaca
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-900/40 text-center">
              <Sparkles className="w-5 h-5 text-teal-400 mx-auto mb-1.5" />
              <span className="text-2xl sm:text-3xl font-black text-white font-mono block">
                {potentialJuzMemorized} Juz
              </span>
              <span className="text-[11px] text-teal-300 font-medium">
                Potensi Hafalan Al-Qur'an Jika Waktu Dialihkan
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center">
            <p className="text-xs text-slate-300 leading-relaxed">
              💡 <strong>Masa lalu telah berlalu, masa depan ada di tanganmu.</strong> Jadikan angka ini sebagai cambuk untuk tidak membiarkan syaitan mencuri satu detik pun lagi dari sisa usiamu.
            </p>
          </div>

        </div>
      )}

      {/* TAB 3: IKRAR JANJI SUCI 'IFFAH */}
      {activeTab === 'pledge' && (
        <div className="max-w-2xl mx-auto rounded-3xl bg-gradient-to-b from-slate-900 via-emerald-950/30 to-slate-900 border-2 border-emerald-700/50 p-6 sm:p-10 shadow-2xl">
          
          <div className="text-center mb-6">
            <span className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 inline-flex items-center justify-center mb-3">
              <HeartHandshake className="w-6 h-6" />
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Piagam Ikrar Kesucian Diri (Iffah Pledge)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Akad komitmen personal antara kamu dan Allah Ta'ala untuk menjaga kesucian pandangan dan kemaluan.
            </p>
          </div>

          {/* Teks Ikrar */}
          <div className="p-6 rounded-2xl bg-slate-950/90 border border-emerald-900/40 text-slate-200 text-xs sm:text-sm leading-relaxed mb-6 whitespace-pre-line font-serif italic text-center">
            {iffahPledgeText}
          </div>

          {!isPledged ? (
            <form onSubmit={handleSignPledge} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 text-center">
                  Ketik Nama Lengkap atau Nama Hijrahmu:
                </label>
                <input 
                  type="text"
                  placeholder="Contoh: Abdullah bin Hamba Allah"
                  value={pledgeName}
                  onChange={(e) => setPledgeName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm text-center focus:outline-none focus:border-emerald-500 font-bold"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 transition-all hover:scale-[1.02]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Bismillah, Aku Bersumpah Menjaga 'Iffah!</span>
              </button>
            </form>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/60 text-center animate-in zoom-in duration-300">
              <Award className="w-12 h-12 text-emerald-400 mx-auto mb-2 animate-bounce" />
              <h4 className="text-lg font-bold text-white mb-1">
                MasyaAllah, Ikrar Resmi Tercatat!
              </h4>
              <p className="text-xs text-emerald-200 mb-3">
                Atas nama: <strong>{pledgeName}</strong> pada tanggal {pledgeDate}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                Pegang teguh sumpah ini. Jika suatu hari godaan datang menerjang, ingatlah nama Allah yang telah kamu sebut dalam ikrar ini.
              </p>

              <button
                onClick={() => setIsPledged(false)}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs transition-colors"
              >
                Ubah Nama / Ikrar Baru
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
