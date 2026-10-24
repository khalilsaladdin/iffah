import { getSupabase } from './supabaseClient';
import { initialCommunityPosts } from '../data/communityData';

const LOCAL_STORAGE_KEY = 'iffah_community_posts';
const LOCAL_INTERACTION_KEY = 'iffah_post_interactions';

// Helper: ambil interaksi user (apakah user sudah klik Amin / Support pada post tertentu)
export function getStoredInteractions() {
  try {
    const raw = localStorage.getItem(LOCAL_INTERACTION_KEY);
    return raw ? JSON.parse(raw) : { amins: {}, supports: {} };
  } catch {
    return { amins: {}, supports: {} };
  }
}

export function saveInteraction(type, postId, hasInteracted) {
  try {
    const current = getStoredInteractions();
    if (type === 'amin') {
      current.amins[postId] = hasInteracted;
    } else if (type === 'support') {
      current.supports[postId] = hasInteracted;
    }
    localStorage.setItem(LOCAL_INTERACTION_KEY, JSON.stringify(current));
  } catch (e) {
    console.warn('Gagal menyimpan interaksi:', e);
  }
}

// Helper: ambil postingan lokal
export function getLocalPosts() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Gagal membaca local community posts:', e);
  }
  return initialCommunityPosts;
}

export function saveLocalPosts(posts) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
  } catch (e) {
    console.warn('Gagal menyimpan local community posts:', e);
  }
}

// Format baris Supabase menjadi format Postingan Frontend
function mapSupabaseToPost(row, interactions) {
  return {
    id: row.id,
    authorAlias: row.author_alias || 'Pejuang Iffah',
    timeAgo: formatTimeAgo(row.created_at),
    badge: row.badge || 'Pejuang Iffah',
    badgeColor: row.badge_color || 'emerald',
    category: row.category || 'Halaqah Umum',
    content: row.content,
    aminCount: Number(row.amin_count) || 0,
    supportCount: Number(row.support_count) || 0,
    hasAmin: Boolean(interactions.amins?.[row.id]),
    hasSupported: Boolean(interactions.supports?.[row.id]),
    createdAt: row.created_at
  };
}

function formatTimeAgo(dateStr) {
  if (!dateStr) return 'Baru saja';
  try {
    const past = new Date(dateStr).getTime();
    const now = Date.now();
    const diffSec = Math.floor((now - past) / 1000);
    if (diffSec < 60) return 'Baru saja';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} menit yang lalu`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour} jam yang lalu`;
    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay} hari yang lalu`;
  } catch {
    return 'Baru saja';
  }
}

// 1. Fetch Posts: Coba dari Cloud Database (Supabase), fallback ke LocalStorage
export async function fetchAllPosts() {
  const interactions = getStoredInteractions();
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (!error && Array.isArray(data) && data.length > 0) {
        const cloudPosts = data.map((row) => mapSupabaseToPost(row, interactions));
        // Sinkronkan ke cache lokal
        saveLocalPosts(cloudPosts);
        return { posts: cloudPosts, isCloud: true };
      }
    } catch (err) {
      console.warn('Gagal menarik postingan dari Supabase, beralih ke cache lokal:', err);
    }
  }

  // Fallback lokal
  const local = getLocalPosts();
  const mappedLocal = local.map((p) => ({
    ...p,
    hasAmin: Boolean(interactions.amins?.[p.id]),
    hasSupported: Boolean(interactions.supports?.[p.id])
  }));
  return { posts: mappedLocal, isCloud: false };
}

// 2. Publish New Post
export async function publishPost(newPost) {
  // Simpan seketika di localStorage agar TIDAK PERNAH HILANG saat refresh
  const currentLocal = getLocalPosts();
  const updatedLocal = [newPost, ...currentLocal.filter((p) => p.id !== newPost.id)];
  saveLocalPosts(updatedLocal);
  saveInteraction('amin', newPost.id, true);
  saveInteraction('support', newPost.id, true);

  // Jika Supabase aktif, kirim ke Cloud Database agar muncul di device lain
  const supabase = getSupabase();
  if (supabase) {
    try {
      const row = {
        id: String(newPost.id),
        author_alias: newPost.authorAlias,
        badge: newPost.badge,
        badge_color: newPost.badgeColor,
        category: newPost.category,
        content: newPost.content,
        amin_count: newPost.aminCount || 1,
        support_count: newPost.supportCount || 1,
        created_at: new Date().toISOString()
      };

      const { error } = await supabase.from('community_posts').insert([row]);
      if (error) {
        console.warn('Gagal menyimpan postingan ke Supabase:', error.message);
      }
    } catch (err) {
      console.warn('Error jaringan saat kirim ke Supabase:', err);
    }
  }

  return newPost;
}

// 3. Toggle Amin Count
export async function togglePostAmin(postId, currentHasAmin, currentCount) {
  const nextHasAmin = !currentHasAmin;
  const nextCount = Math.max(0, nextHasAmin ? currentCount + 1 : currentCount - 1);

  // Simpan interaksi lokal
  saveInteraction('amin', postId, nextHasAmin);

  // Perbarui cache lokal
  const local = getLocalPosts();
  const updated = local.map((p) => {
    if (p.id === postId) {
      return { ...p, aminCount: nextCount, hasAmin: nextHasAmin };
    }
    return p;
  });
  saveLocalPosts(updated);

  // Jika Supabase aktif, update count di cloud
  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase
        .from('community_posts')
        .update({ amin_count: nextCount })
        .eq('id', postId);
    } catch (e) {
      console.warn('Gagal update amin di cloud:', e);
    }
  }

  return { hasAmin: nextHasAmin, aminCount: nextCount };
}

// 4. Toggle Support Count
export async function togglePostSupport(postId, currentHasSupport, currentCount) {
  const nextHasSupport = !currentHasSupport;
  const nextCount = Math.max(0, nextHasSupport ? currentCount + 1 : currentCount - 1);

  // Simpan interaksi lokal
  saveInteraction('support', postId, nextHasSupport);

  // Perbarui cache lokal
  const local = getLocalPosts();
  const updated = local.map((p) => {
    if (p.id === postId) {
      return { ...p, supportCount: nextCount, hasSupported: nextHasSupport };
    }
    return p;
  });
  saveLocalPosts(updated);

  // Jika Supabase aktif, update count di cloud
  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase
        .from('community_posts')
        .update({ support_count: nextCount })
        .eq('id', postId);
    } catch (e) {
      console.warn('Gagal update support di cloud:', e);
    }
  }

  return { hasSupported: nextHasSupport, supportCount: nextCount };
}

// 5. Setup Realtime Listener
export function subscribeToRealtimePosts(onNewOrUpdatedPost) {
  const supabase = getSupabase();
  if (!supabase) return () => {};

  try {
    const channel = supabase
      .channel('realtime_community_posts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'community_posts' },
        (payload) => {
          if (payload.new) {
            const interactions = getStoredInteractions();
            const mapped = mapSupabaseToPost(payload.new, interactions);
            onNewOrUpdatedPost(mapped, payload.eventType);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (e) {
    console.warn('Gagal mengaktifkan realtime listener:', e);
    return () => {};
  }
}
