import React, { useState, useEffect } from 'react';
import { 
  BookMarked, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  Trash2, 
  Sparkles
} from 'lucide-react';
import { soundFx } from '../utils/audioHelper';

export default function JournalHub() {
  const [entries, setEntries] = useState(() => {
    try {
      const saved = localStorage.getItem('iffah_journal_entries');
      return saved ? JSON.parse(saved) : [
        {
          id: 'initial-1',
          date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
          mood: 'Tangguh',
          triggers: ['Lelah', 'Sendirian'],
          counterAction: 'Langsung ambil wudhu air dingin dan baca Al-Matsurat sore.',
          reflection: 'Alhamdulillah berhasil melewati jam-jam kritis setelah pulang kerja. Rasa tenang menyelimuti hati.'
        }
      ];
    } catch {
      return [];
    }
  });

  const [isAdding, setIsAdding] = useState(false);
  const [mood, setMood] = useState('Tenang');
  const [selectedTriggers, setSelectedTriggers] = useState([]);
  const [counterAction, setCounterAction] = useState('');
  const [reflection, setReflection] = useState('');

  const triggerOptions = [
    'Lapar (Hungry)', 
    'Marah / Kesal (Angry)', 
    'Sendirian (Lonely)', 
    'Lelah / Begadang (Tired)', 
    'Stres Beban Kerja', 
    'Bosan / Bengong', 
    'Media Sosial / FYP'
  ];

  const moodOptions = ['Sangat Lemah', 'Waspada', 'Tenang', 'Tangguh & Khusyuk'];

  useEffect(() => {
    try {
      localStorage.setItem('iffah_journal_entries', JSON.stringify(entries));
    } catch {
      // Local storage fallback
    }
  }, [entries]);

  const toggleTrigger = (trig) => {
    if (selectedTriggers.includes(trig)) {
      setSelectedTriggers(selectedTriggers.filter((t) => t !== trig));
    } else {
      setSelectedTriggers([...selectedTriggers, trig]);
    }
  };

  const handleSaveEntry = (e) => {
    e.preventDefault();
    if (!reflection.trim()) return;

    const newEntry = {
      id: `entry-${Date.now()}`,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      mood,
      triggers: selectedTriggers.length > 0 ? selectedTriggers : ['Tidak ada pemicu signifikan'],
      counterAction: counterAction.trim() || 'Tetap berdzikir dan menjaga pandangan',
      reflection: reflection.trim()
    };

    soundFx.playCelebrationTone();
    setEntries([newEntry, ...entries]);
    setIsAdding(false);
    setSelectedTriggers([]);
    setCounterAction('');
    setReflection('');
  };

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <BookMarked className="w-4 h-4" />
            <span>Muhasabah & Evaluasi Pribadi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Jurnal Muhasabah & Trigger Tracker
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            100% Tersimpan di perangkatmu sendiri (Private & Aman). Catat kemenangan kecil dan kenali pola pemicumu.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-900/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Tutup Form' : 'Catat Muhasabah Hari Ini'}</span>
        </button>
      </div>

      {/* Form Tambah Catatan */}
      {isAdding && (
        <form 
          onSubmit={handleSaveEntry}
          className="rounded-3xl bg-slate-900 border border-emerald-800/60 p-6 sm:p-8 space-y-5 animate-in slide-in-from-top-4 duration-300 shadow-xl"
        >
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Refleksi Jiwa Hari Ini</span>
          </h3>

          {/* Kondisi Hati / Mood */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Kondisi Keimanan & Ketahanan Hati:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {moodOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setMood(opt)}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                    mood === opt
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Trigger Checkboxes (HALT) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Pemicu / Godaan yang Sempat Muncul Hari Ini (Pilih yang relevan):
            </label>
            <div className="flex flex-wrap gap-2">
              {triggerOptions.map((trig) => {
                const isSelected = selectedTriggers.includes(trig);
                return (
                  <button
                    type="button"
                    key={trig}
                    onClick={() => toggleTrigger(trig)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-amber-950 border-amber-600 text-amber-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {trig}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tindakan Pencegahan yang Berhasil */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Apa tindakan yang berhasil menyelamatkanmu dari godaan tersebut?
            </label>
            <input 
              type="text"
              placeholder="Contoh: Langsung taruh HP di meja luar, ambil wudhu, tilawah 1 lembar..."
              value={counterAction}
              onChange={(e) => setCounterAction(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Catatan Muhasabah / Doa */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Refleksi Diri & Doa Syukur:
            </label>
            <textarea
              rows="3"
              placeholder="Tuliskan pelajaran apa yang kamu petik hari ini dan rasa syukur atas pertolongan Allah..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs font-medium hover:text-white"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition-all"
            >
              Simpan Muhasabah
            </button>
          </div>
        </form>
      )}

      {/* List of Entries */}
      <div className="space-y-4">
        {entries.length === 0 ? (
          <div className="p-10 rounded-3xl bg-slate-900/60 border border-slate-800 text-center">
            <BookMarked className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <h4 className="text-base font-bold text-white mb-1">
              Belum Ada Catatan Muhasabah
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              Jadikan muhasabah sebagai kebiasaan sebelum tidur. Kenali musuhmu dan rayakan kemenangan kecilmu.
            </p>
            <button
              onClick={() => setIsAdding(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
            >
              Mulai Catat Pertama
            </button>
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 hover:border-slate-700 transition-all shadow-md relative group"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-300 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{entry.date}</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 text-xs font-bold">
                    Kondisi: {entry.mood}
                  </span>
                </div>

                <button
                  onClick={() => handleDeleteEntry(entry.id)}
                  className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-all p-1.5 rounded-lg hover:bg-slate-800"
                  title="Hapus Catatan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Triggers Tag */}
              {entry.triggers && entry.triggers.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  <span className="text-[11px] text-slate-500 font-medium mr-1">
                    Pemicu:
                  </span>
                  {entry.triggers.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-lg bg-amber-950/60 text-amber-300 border border-amber-900/40 text-[10px] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Counter Action */}
              {entry.counterAction && (
                <div className="mb-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-emerald-300 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  <div>
                    <strong className="text-white">Langkah Penyelamat: </strong>
                    <span>{entry.counterAction}</span>
                  </div>
                </div>
              )}

              {/* Reflection */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                {entry.reflection}
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
