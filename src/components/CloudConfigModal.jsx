import React, { useState } from 'react';
import { 
  Cloud, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Copy, 
  Database, 
  ShieldCheck, 
  RefreshCw 
} from 'lucide-react';
import { 
  getStoredSupabaseConfig, 
  saveSupabaseConfig, 
  isSupabaseConfigured 
} from '../services/supabaseClient';
import { soundFx } from '../utils/audioHelper';

export default function CloudConfigModal({ isOpen, onClose, onConfigSaved }) {
  const currentConfig = getStoredSupabaseConfig();
  const [url, setUrl] = useState(currentConfig.url || '');
  const [key, setKey] = useState(currentConfig.key || '');
  const [statusMessage, setStatusMessage] = useState(null);
  const [copiedSql, setCopiedSql] = useState(false);

  if (!isOpen) return null;

  const isConnected = isSupabaseConfigured();

  const handleSave = (e) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!url.trim() || !key.trim()) {
      setStatusMessage({ type: 'error', text: 'Harap isi Project URL dan Anon Key.' });
      return;
    }

    if (!url.startsWith('https://')) {
      setStatusMessage({ type: 'error', text: 'Project URL harus diawali dengan https://' });
      return;
    }

    const success = saveSupabaseConfig(url, key);
    if (success) {
      soundFx.playCelebrationTone();
      setStatusMessage({ 
        type: 'success', 
        text: 'Alhamdulillah! Pengaturan Cloud Database berhasil disimpan. Semua device sekarang dapat saling bertukar data.' 
      });
      if (onConfigSaved) onConfigSaved();
      setTimeout(() => {
        onClose();
      }, 1200);
    } else {
      setStatusMessage({ type: 'error', text: 'Gagal menyimpan konfigurasi ke penyimpanan browser.' });
    }
  };

  const handleResetToLocal = () => {
    saveSupabaseConfig('', '');
    setUrl('');
    setKey('');
    soundFx.playTasbihClick();
    setStatusMessage({ 
      type: 'info', 
      text: 'Mode Cloud dinonaktifkan. Data kembali menggunakan penyimpanan lokal aman (Satrul Aib).' 
    });
    if (onConfigSaved) onConfigSaved();
  };

  const handleCopySqlHint = () => {
    navigator.clipboard?.writeText(
      `File SQL lengkap telah kami siapkan di dalam proyek: supabase_schema.sql. Cukup buka di editor dan salin ke Supabase SQL Editor.`
    );
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
        
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/80 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-950/60">
            <Cloud className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Koneksi Cloud Realtime
              </h2>
              {isConnected ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Aktif
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold">
                  Mode Lokal
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Hubungkan database Supabase agar postingan muncul di semua HP & device orang lain.
            </p>
          </div>
        </div>

        {/* Penjelasan Singkat */}
        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 mb-6 text-xs sm:text-sm text-slate-300 space-y-2">
          <div className="flex items-start gap-2.5 text-emerald-300 font-semibold">
            <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" />
            <span>Bagaimana Sinkronisasi Bekerja?</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs">
            - <strong>Saat ini (Penyimpanan Lokal):</strong> Apapun yang Anda ketik disimpan secara permanen di browser ini dan <strong>tidak akan hilang saat di-refresh</strong>.
          </p>
          <p className="text-slate-400 leading-relaxed text-xs">
            - <strong>Dengan Supabase Cloud:</strong> Postingan doa, curhat, dan klik &ldquo;Aamiin&rdquo; akan tersinkronisasi <strong>ke seluruh HP/komputer pengguna lain secara real-time</strong>.
          </p>
        </div>

        {/* Status Message Alert */}
        {statusMessage && (
          <div className={`p-3.5 rounded-2xl mb-5 flex items-start gap-2.5 text-xs sm:text-sm ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-200' 
              : statusMessage.type === 'error'
              ? 'bg-rose-950/80 border border-rose-500/50 text-rose-200'
              : 'bg-amber-950/80 border border-amber-500/50 text-amber-200'
          }`}>
            {statusMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
            {statusMessage.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
            {statusMessage.type === 'info' && <RefreshCw className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
            <span className="leading-snug">{statusMessage.text}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Supabase Project URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://abcdefghijklm.supabase.co"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:outline-none text-white text-sm placeholder:text-slate-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Supabase Public Anon Key
            </label>
            <textarea
              rows={2}
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:outline-none text-white text-xs font-mono placeholder:text-slate-500 resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-sm shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Database className="w-4 h-4" />
              <span>Simpan & Sambungkan Cloud</span>
            </button>

            {isConnected && (
              <button
                type="button"
                onClick={handleResetToLocal}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
              >
                Gunakan Mode Lokal
              </button>
            )}
          </div>
        </form>

        {/* 3 Langkah Cepat Buat Database Supabase Gratis */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Panduan 2 Menit Membuat Database Supabase (Gratis):
          </h3>
          <ol className="text-xs text-slate-400 space-y-2 list-decimal list-inside leading-relaxed">
            <li>
              Buka <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-emerald-400 underline inline-flex items-center gap-1 font-medium">supabase.com <ExternalLink className="w-3 h-3" /></a> lalu klik <strong>&ldquo;Start your project&rdquo;</strong> (Login gratis dengan GitHub).
            </li>
            <li>
              Buka menu <strong>SQL Editor</strong> di dashboard Supabase, tempel kode dari file <code className="text-emerald-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">supabase_schema.sql</code> lalu klik <strong>Run</strong>.
            </li>
            <li>
              Masuk ke <strong>Project Settings ➔ API</strong>, lalu salin <strong>Project URL</strong> dan <strong>anon / public key</strong> ke form di atas!
            </li>
          </ol>

          <button
            onClick={handleCopySqlHint}
            className="mt-3.5 inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/60 transition-colors"
          >
            <Copy className="w-3.5 h-3.5 text-emerald-400" />
            <span>{copiedSql ? 'Petunjuk tersalin!' : 'Info Skema SQL'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
