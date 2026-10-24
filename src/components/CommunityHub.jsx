import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, 
  Heart, 
  ShieldCheck, 
  Send, 
  Plus, 
  AlertCircle,
  CheckCircle2,
  Cloud,
  RefreshCw,
  Settings2
} from 'lucide-react';
import { communityRules } from '../data/communityData';
import { soundFx } from '../utils/audioHelper';
import { 
  fetchAllPosts, 
  publishPost, 
  togglePostAmin, 
  togglePostSupport, 
  subscribeToRealtimePosts,
  getLocalPosts
} from '../services/communityService';
import { isSupabaseConfigured } from '../services/supabaseClient';
import CloudConfigModal from './CloudConfigModal';

export default function CommunityHub({ onAddUserPost }) {
  // Load posts with local fallback so REFRESH NEVER LOSES DATA
  const [posts, setPosts] = useState(() => getLocalPosts());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCloudModalOpen, setIsCloudModalOpen] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('Mohon Doa (Urgent)');
  const [errorMsg, setErrorMsg] = useState('');
  const [successPost, setSuccessPost] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCloudActive, setIsCloudActive] = useState(() => isSupabaseConfigured());

  // Alias Acak Islami (tersimpan permanen di device ini)
  const [alias, setAlias] = useState(() => {
    try {
      const savedAlias = localStorage.getItem('iffah_user_alias');
      if (savedAlias) return savedAlias;
    } catch {
      // ignore
    }
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const generated = `Mujahid Iffah #${randomSuffix}`;
    try {
      localStorage.setItem('iffah_user_alias', generated);
    } catch {
      // ignore
    }
    return generated;
  });

  const handleAliasChange = (val) => {
    setAlias(val);
    try {
      localStorage.setItem('iffah_user_alias', val);
    } catch {
      // ignore
    }
  };

  // Muat data postingan dari Cloud / LocalStorage
  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchAllPosts();
      setPosts(res.posts);
      setIsCloudActive(res.isCloud);
    } catch (e) {
      console.warn('Gagal memuat postingan:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    fetchAllPosts().then((res) => {
      if (isMounted) {
        setPosts(res.posts);
        setIsCloudActive(res.isCloud);
      }
    }).catch((e) => {
      console.warn('Gagal memuat postingan:', e);
    });

    // Berlangganan event real-time bila Supabase terhubung
    const unsubscribe = subscribeToRealtimePosts((incomingPost, eventType) => {
      if (!isMounted) return;
      setPosts((prev) => {
        if (eventType === 'INSERT') {
          // Cegah duplikasi ID
          if (prev.some((p) => p.id === incomingPost.id)) return prev;
          soundFx.playTasbihClick();
          return [incomingPost, ...prev];
        }
        if (eventType === 'UPDATE') {
          return prev.map((p) => (p.id === incomingPost.id ? { ...p, ...incomingPost } : p));
        }
        return prev;
      });
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // Trigger words filter (menjaga agar tidak ada detail maksiat atau link berbahaya)
  const forbiddenKeywords = ['bokep', 'porno', 'link', 'video panas', 'situs', 'http://', 'https://', 'bugil', 'telanjang', 'xxx'];

  const handleAamiin = async (postId) => {
    soundFx.playTasbihClick();
    const target = posts.find((p) => p.id === postId);
    if (!target) return;

    // Optimistic UI update
    const nextHasAmin = !target.hasAmin;
    const nextCount = Math.max(0, nextHasAmin ? target.aminCount + 1 : target.aminCount - 1);

    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, hasAmin: nextHasAmin, aminCount: nextCount } : p))
    );

    // Sync ke service & Cloud
    await togglePostAmin(postId, target.hasAmin, target.aminCount);
  };

  const handleSupport = async (postId) => {
    soundFx.playTasbihClick();
    const target = posts.find((p) => p.id === postId);
    if (!target) return;

    const nextHasSupported = !target.hasSupported;
    const nextCount = Math.max(0, nextHasSupported ? target.supportCount + 1 : target.supportCount - 1);

    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, hasSupported: nextHasSupported, supportCount: nextCount } : p))
    );

    // Sync ke service & Cloud
    await togglePostSupport(postId, target.hasSupported, target.supportCount);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!newContent.trim()) {
      setErrorMsg('Tuliskan pesan atau doa yang ingin kamu bagikan.');
      return;
    }

    // Cek pemicu kata terlarang
    const lower = newContent.toLowerCase();
    const hasForbidden = forbiddenKeywords.some((word) => lower.includes(word));
    if (hasForbidden) {
      setErrorMsg('Pesan mengandung kata yang dapat memicu (trigger) atau melanggar aturan Satrul Aib. Harap gunakan bahasa yang santun dan umum tanpa detail eksplisit.');
      return;
    }

    const newPostObj = {
      id: `custom-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      authorAlias: alias,
      timeAgo: 'Baru saja',
      badge: 'Pejuang Iffah',
      badgeColor: 'emerald',
      category: newCategory,
      content: newContent,
      aminCount: 1,
      supportCount: 1,
      hasAmin: true,
      hasSupported: true,
      createdAt: new Date().toISOString()
    };

    // 1. Simpan di state dan localStorage seketika (tidak akan hilang saat refresh)
    setPosts((prev) => [newPostObj, ...prev]);
    if (onAddUserPost) onAddUserPost(newPostObj);

    // 2. Kirim ke Cloud Database (jika aktif)
    await publishPost(newPostObj);

    setNewContent('');
    soundFx.playCelebrationTone();
    setSuccessPost(true);
    setTimeout(() => {
      setSuccessPost(false);
      setIsModalOpen(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Header & CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
            <Users className="w-4 h-4" />
            <span>Usrah Online & Saling Mendoakan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Halaqah Iffah (Safe Peer Support)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tempat aman bertukar doa, semangat hijrah, dan merayakan kemenangan dengan prinsip <strong className="text-emerald-400 font-semibold">Satrul &lsquo;Aurat wal Ma&lsquo;ashi</strong> (Menutup aib diri).
          </p>

          {/* Status Sync Pill (Cloud vs Local) */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsCloudModalOpen(true)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                isCloudActive
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/60 hover:bg-emerald-900/60'
                  : 'bg-amber-950/80 text-amber-300 border-amber-600/60 hover:bg-amber-900/60'
              }`}
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>
                {isCloudActive
                  ? 'Cloud Database Aktif (Tersinkron Antar-Device)'
                  : 'Mode Penyimpanan Lokal (Aman dari Refresh)'}
              </span>
              <Settings2 className="w-3 h-3 ml-1 opacity-70" />
            </button>

            <button
              onClick={loadPosts}
              disabled={isLoading}
              title="Refresh Postingan"
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors text-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-teal-400' : ''}`} />
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-teal-950/50 transition-all hover:scale-105 active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Doa / Berbagi</span>
        </button>
      </div>

      {/* Community Rules Banner */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 sm:p-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Aturan Kehormatan Halaqah (Zero-Trigger Safe Space)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-400">
          {communityRules.map((r, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <strong className="text-slate-200 block mb-0.5">{r.title}</strong>
              <span>{r.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div 
            key={post.id}
            className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-7 hover:border-slate-700 transition-all shadow-md backdrop-blur-sm"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center font-bold text-white text-sm shadow">
                  {post.authorAlias.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      {post.authorAlias}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-semibold">
                      {post.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {post.timeAgo}
                  </span>
                </div>
              </div>

              <span className="text-[11px] px-2.5 py-1 rounded-xl bg-slate-800 text-teal-300 font-medium">
                {post.category}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed my-4 whitespace-pre-line">
              {post.content}
            </p>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-800/70">
              <button
                onClick={() => handleAamiin(post.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  post.hasAmin
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>🤲 Aamiin ({post.aminCount})</span>
              </button>

              <button
                onClick={() => handleSupport(post.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  post.hasSupported
                    ? 'bg-teal-600 text-white shadow'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${post.hasSupported ? 'fill-white' : ''}`} />
                <span>Kuatkan Saudaraku ({post.supportCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tulis Pesan */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <h3 className="text-xl font-bold text-white mb-2">
              Tulis di Halaqah Iffah
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Identitasmu aman (menggunakan alias pelindung). Jangan sebut nama asli atau membuka aib secara vulgar.
            </p>

            {errorMsg && (
              <div className="p-3 mb-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successPost && (
              <div className="p-3 mb-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Alhamdulillah, tulisanmu berhasil disimpan dan dibagikan!</span>
              </div>
            )}

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Nama Alias Pelindung (Anonim):
                </label>
                <input
                  type="text"
                  value={alias}
                  onChange={(e) => handleAliasChange(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Kategori Postingan:
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500"
                >
                  <option value="Mohon Doa (Urgent)">🤲 Mohon Doa (Sedang Berjuang Melawan Urge)</option>
                  <option value="Berbagi Kemenangan">🏆 Berbagi Kemenangan (Milestone Hari Bersih)</option>
                  <option value="Tips Istiqomah">💡 Tips Praktis Memutus Kebiasaan</option>
                  <option value="Muhasabah Hati">🌿 Muhasabah &amp; Tadabbur Rasa Malu</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Isi Pesan:
                </label>
                <textarea
                  rows={4}
                  placeholder="Tuliskan curahan hatimu atau doa yang ingin diamini bersama saudaramu..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim ke Halaqah</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Pengaturan Cloud Supabase */}
      <CloudConfigModal
        isOpen={isCloudModalOpen}
        onClose={() => setIsCloudModalOpen(false)}
        onConfigSaved={() => {
          setIsCloudActive(isSupabaseConfigured());
          loadPosts();
        }}
      />

    </div>
  );
}
