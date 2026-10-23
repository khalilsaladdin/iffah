import React, { useState, useEffect } from 'react';
import { Download, Smartphone, X, CheckCircle2, Share, PlusSquare } from 'lucide-react';
import { soundFx } from '../utils/audioHelper';

export default function InstallPwaModal({ isForceOpen, onCloseForce }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  
  // Deteksi mode standalone secara lazy saat inisialisasi
  const [isInstalled, setIsInstalled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  });

  const [isIOS] = useState(() => {
    if (typeof window === 'undefined') return false;
    return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInstalled) return;

    // Tangkap event instalasi browser (Chrome, Edge, Android)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Tampilkan banner setelah 2.5 detik agar tidak mengganggu kesan pertama
      const dismissed = sessionStorage.getItem('iffah_install_dismissed');
      if (!dismissed) {
        setTimeout(() => setIsVisible(true), 2500);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    soundFx.playCelebrationTone();
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('iffah_install_dismissed', 'true');
    if (onCloseForce) onCloseForce();
  };

  // Jangan tampilkan jika sudah terinstall dan tidak dipaksa buka dari menu
  if (isInstalled && !isForceOpen) return null;
  if (!isVisible && !isForceOpen) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-40 animate-in slide-in-from-bottom-5 duration-300">
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/80 border-2 border-emerald-500/50 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-emerald-950/80 backdrop-blur-xl">
        
        {/* Tombol Tutup */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 shadow-lg">
            <Smartphone className="w-6 h-6 animate-pulse" />
          </div>

          <div className="flex-1 pr-6">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800/60">
                Aplikasi Mandiri
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-extrabold text-white leading-tight">
              Pasang Iffah di Ponsel Anda
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Akses cepat saat godaan datang tiba-tiba, tanpa harus mengetik alamat browser.
            </p>
          </div>
        </div>

        {/* Action Button sesuai perangkat */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          {isIOS ? (
            <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <span>Cara Pasang di iPhone/iPad:</span>
              </div>
              <p className="flex items-center gap-2 text-[11px]">
                <span>1. Ketuk ikon <strong>Bagikan (Share)</strong></span>
                <Share className="w-3.5 h-3.5 text-emerald-400 inline" />
                <span>di Safari</span>
              </p>
              <p className="flex items-center gap-2 text-[11px]">
                <span>2. Gulir ke bawah lalu pilih</span>
                <span className="text-white font-semibold flex items-center gap-1">
                  <PlusSquare className="w-3.5 h-3.5 text-emerald-400 inline" />
                  "Tambahkan ke Layar Utama"
                </span>
              </p>
            </div>
          ) : deferredPrompt ? (
            <button
              onClick={handleInstallClick}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Pasang Sekarang (Gratis & Ringan)</span>
            </button>
          ) : (
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Mendukung mode offline & PWA</span>
              </span>
              <button
                onClick={handleDismiss}
                className="text-xs text-slate-400 hover:text-white underline"
              >
                Tutup
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
