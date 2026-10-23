import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Volume2, 
  RotateCcw, 
  Check, 
  Copy, 
  Share2, 
  Search,
  BookMarked,
  Play,
  Pause,
  Headphones,
  Music,
  Loader2
} from 'lucide-react';
import { quranVerses, propheticHadiths, islamicDuas, dzikirList } from '../data/spiritualData';
import { murottalTracks } from '../data/murottalData';
import { useAudio } from '../context/AudioContext';
import { soundFx } from '../utils/audioHelper';

export default function SpiritualHub() {
  const [activeSubTab, setActiveSubTab] = useState('quran'); // 'quran', 'murottal', 'hadith', 'duas', 'dzikir'
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const { currentTrack, isPlaying, isLoading, playTrack } = useAudio();

  // Dzikir Counter State
  const [currentDzikirIndex, setCurrentDzikirIndex] = useState(0);
  const [dzikirCounter, setDzikirCounter] = useState(0);

  const activeDzikir = dzikirList[currentDzikirIndex];

  const handleDzikirClick = () => {
    soundFx.playTasbihClick();
    if (dzikirCounter + 1 >= activeDzikir.target) {
      soundFx.playCelebrationTone();
      setDzikirCounter(activeDzikir.target);
    } else {
      setDzikirCounter((prev) => prev + 1);
    }
  };

  const resetDzikirCounter = () => {
    setDzikirCounter(0);
  };

  const handleCopyText = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter Ayat
  const filteredQuran = quranVerses.filter(
    (item) =>
      item.surah.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Khazanah Ruhani & Penawar Hati</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Al-Qur'an & As-Sunnah
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Kalamullah adalah obat penawar (Syifa') bagi penyakit syahwat dan kegelapan kalbu.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveSubTab('quran')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeSubTab === 'quran'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ayat Al-Qur'an
          </button>
          <button
            onClick={() => setActiveSubTab('murottal')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeSubTab === 'murottal'
                ? 'bg-emerald-600 text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Headphones className="w-3.5 h-3.5 text-emerald-300" />
            <span>Murottal Sakinah</span>
          </button>
          <button
            onClick={() => setActiveSubTab('hadith')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeSubTab === 'hadith'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Hadits Nabawi
          </button>
          <button
            onClick={() => setActiveSubTab('duas')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeSubTab === 'duas'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Doa Perlindungan
          </button>
          <button
            onClick={() => setActiveSubTab('dzikir')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeSubTab === 'dzikir'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Tasbih Dzikir Digital
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: AL-QUR'AN */}
      {activeSubTab === 'quran' && (
        <div className="space-y-6">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Cari ayat atau tema (misal: pandangan, taubat)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredQuran.map((verse) => (
              <div 
                key={verse.id}
                className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 hover:border-emerald-800/60 transition-all shadow-lg"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800/70 text-emerald-400 text-xs font-bold">
                      {verse.surah}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Tema: {verse.category}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyText(verse.id, `${verse.arabic}\n\n${verse.translation}\n(${verse.surah})`)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    title="Salin Ayat"
                  >
                    {copiedId === verse.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Ayat Arab */}
                <div className="my-6 text-right">
                  <p className="font-arabic text-2xl sm:text-3xl text-emerald-200 font-bold leading-loose">
                    {verse.arabic}
                  </p>
                </div>

                {/* Terjemahan */}
                <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 mb-4">
                  <p className="text-sm text-slate-200 leading-relaxed italic">
                    "{verse.translation}"
                  </p>
                </div>

                {/* Tadabbur Faidah */}
                <div className="flex items-start gap-3 text-xs text-slate-400 bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-900/30">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-300 font-semibold">Tadabbur Faidah: </strong>
                    <span>{verse.tafsir}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB: MUROTTAL SAKINAH (AUDIO STREAMING) */}
      {activeSubTab === 'murottal' && (
        <div className="space-y-6">
          <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/60 border border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Audio Murottal Penyejuk Nafsu & Was-Was
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Lantunan tilawah Al-Qur'an terbukti merangsang gelombang Alfa di otak, meredakan ketegangan sistem limbik, dan mengusir bisikan syaitan.
                </p>
              </div>
            </div>

            <span className="text-[11px] text-emerald-400 font-medium px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800/60 shrink-0">
              Qari: Syaikh Mishary Rashid Alafasy
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {murottalTracks.map((track) => {
              const isThisTrackPlaying = currentTrack?.id === track.id && isPlaying;
              const isThisTrackLoading = currentTrack?.id === track.id && isLoading;

              return (
                <div
                  key={track.id}
                  className={`rounded-3xl bg-slate-900/90 border p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-lg ${
                    currentTrack?.id === track.id 
                      ? 'border-emerald-500 bg-emerald-950/20' 
                      : 'border-slate-800 hover:border-emerald-800/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                        {track.tag}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Surah ke-{track.surahNumber}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-1">
                      {track.surahName}
                    </h4>
                    <p className="text-xs text-emerald-400/90 font-medium mb-3">
                      {track.meaning}
                    </p>

                    <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 mb-4 text-xs text-slate-300">
                      <strong className="text-white block mb-0.5">Fokus:</strong>
                      <span>{track.focusVerses}</span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {track.wisdom}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      {track.reciter}
                    </span>

                    <button
                      onClick={() => playTrack(track)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow ${
                        isThisTrackPlaying
                          ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/40'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40'
                      }`}
                    >
                      {isThisTrackLoading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Memuat...</span>
                        </>
                      ) : isThisTrackPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-white" />
                          <span>Jeda Tilawah</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Dengarkan Murottal</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: HADITS SHAHIH */}
      {activeSubTab === 'hadith' && (
        <div className="grid grid-cols-1 gap-6">
          {propheticHadiths.map((hadith) => (
            <div 
              key={hadith.id}
              className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 hover:border-emerald-800/60 transition-all shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold">
                  {hadith.narrator}
                </span>
                <button
                  onClick={() => handleCopyText(hadith.id, `${hadith.matan}\n\n${hadith.translation}\n(${hadith.narrator})`)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  {copiedId === hadith.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="my-5 text-right">
                <p className="font-arabic text-xl sm:text-2xl text-amber-200 font-bold leading-loose">
                  {hadith.matan}
                </p>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 mb-4">
                <p className="text-sm text-slate-200 leading-relaxed italic">
                  "{hadith.translation}"
                </p>
              </div>

              <div className="text-xs text-slate-400 bg-amber-950/20 p-3.5 rounded-xl border border-amber-900/30">
                <strong className="text-amber-300 font-semibold">Hikmah Nabawiyyah: </strong>
                <span>{hadith.wisdom}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 4: DOA PERLINDUNGAN */}
      {activeSubTab === 'duas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {islamicDuas.map((dua) => (
            <div 
              key={dua.id}
              className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-800/60 transition-all shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-white">
                    {dua.title}
                  </h3>
                  <button
                    onClick={() => handleCopyText(dua.id, `${dua.arabic}\n\n${dua.meaning}\n(${dua.source})`)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedId === dua.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="my-4 text-right">
                  <p className="font-arabic text-xl text-emerald-300 font-bold leading-loose">
                    {dua.arabic}
                  </p>
                </div>

                <p className="text-xs text-emerald-400/90 font-mono mb-2 italic">
                  "{dua.transliteration}"
                </p>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {dua.meaning}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-medium">
                Sumber: {dua.source}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 5: TASBIH DZIKIR DIGITAL */}
      {activeSubTab === 'dzikir' && (
        <div className="max-w-2xl mx-auto rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-900/50 p-6 sm:p-10 shadow-2xl text-center">
          
          <div className="flex items-center justify-center gap-2 mb-6">
            {dzikirList.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentDzikirIndex(idx);
                  setDzikirCounter(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  currentDzikirIndex === idx
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Penyejuk Hati & Pelebur Syahwat
          </span>

          <div className="my-6">
            <p className="font-arabic text-3xl sm:text-4xl text-emerald-200 font-bold leading-relaxed mb-2">
              {activeDzikir.arabic}
            </p>
            <p className="text-sm font-semibold text-emerald-400 italic">
              "{activeDzikir.transliteration}"
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Keutamaan: {activeDzikir.benefit}
            </p>
          </div>

          {/* Interactive Tap Area (Giant Button) */}
          <div className="my-8 flex justify-center">
            <button
              onClick={handleDzikirClick}
              className="relative w-44 h-44 rounded-full bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-950 p-1 shadow-2xl shadow-emerald-950/60 active:scale-95 transition-transform duration-100 flex items-center justify-center group"
            >
              <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center p-4 border border-emerald-500/40 group-hover:border-emerald-400">
                <span className="text-5xl font-black text-white font-mono tracking-tight">
                  {dzikirCounter}
                </span>
                <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">
                  / {activeDzikir.target}
                </span>
                <span className="text-[10px] text-emerald-400 font-medium mt-1">
                  Sentuh Untuk Dzikir
                </span>
              </div>
            </button>
          </div>

          {/* Progress Bar & Reset */}
          <div className="max-w-xs mx-auto space-y-3">
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-200"
                style={{ width: `${Math.min(100, (dzikirCounter / activeDzikir.target) * 100)}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs">
              <button
                onClick={() => soundFx.playCalmingChime()}
                className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nada Sakinah</span>
              </button>
              <button
                onClick={resetDzikirCounter}
                className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Hitungan</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
