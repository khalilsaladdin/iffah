-- =========================================================================
-- SQL Schema untuk Platform Iffah (عِفَّة) di Supabase (PostgreSQL)
-- Cara Pakai:
-- 1. Buka dashboard proyek Supabase Anda (https://supabase.com/dashboard)
-- 2. Pilih menu "SQL Editor" di bilah kiri.
-- 3. Tempelkan seluruh isi skrip ini lalu klik tombol "Run" (atau Ctrl+Enter).
-- =========================================================================

-- 1. Buat Tabel Postingan Komunitas Halaqah Iffah
CREATE TABLE IF NOT EXISTS public.community_posts (
  id TEXT PRIMARY KEY,
  author_alias TEXT NOT NULL DEFAULT 'Pejuang Iffah',
  badge TEXT DEFAULT 'Pejuang Iffah',
  badge_color TEXT DEFAULT 'emerald',
  category TEXT NOT NULL DEFAULT 'Halaqah Curhat & Nasihat',
  content TEXT NOT NULL,
  amin_count INTEGER NOT NULL DEFAULT 0,
  support_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Indeks untuk optimasi query berdasarkan waktu terbaru
CREATE INDEX IF NOT EXISTS idx_community_posts_created_at 
ON public.community_posts (created_at DESC);

-- 3. Aktifkan Row Level Security (RLS) & Kebijakan Akses Publik Anonim (Satrul Aib)
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

-- Izinkan siapa saja membaca postingan komunitas
CREATE POLICY "Public Read Community Posts" 
ON public.community_posts 
FOR SELECT 
USING (true);

-- Izinkan siapa saja mengirim postingan anonim (tanpa butuh akun login)
CREATE POLICY "Public Insert Community Posts" 
ON public.community_posts 
FOR INSERT 
WITH CHECK (true);

-- Izinkan siapa saja mengupdate jumlah Aamiin dan Dukungan
CREATE POLICY "Public Update Post Interactions" 
ON public.community_posts 
FOR UPDATE 
USING (true);

-- 4. Aktifkan Realtime agar postingan baru seketika muncul di HP/perangkat lain tanpa reload
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_posts;

-- 5. Masukkan data awal pembuka (Curated Initial Posts)
INSERT INTO public.community_posts (id, author_alias, badge, badge_color, category, content, amin_count, support_count, created_at)
VALUES 
(
  'seed-1', 
  'Hamba Allah #412', 
  'Hari ke-14 Bersih', 
  'amber', 
  'Mohon Doa (Urgent)', 
  'Assalamu''alaikum saudaraku. Malam ini dorongan syahwat terasa sangat kuat karena beban kerja dan kelelahan (HALT). Saya mohon doa dari antum semua agar Allah kuatkan pandangan mata dan hati saya untuk tetap istiqomah di atas fitrah kesucian.', 
  38, 
  24, 
  NOW() - INTERVAL '25 minutes'
),
(
  'seed-2', 
  'Pencari Ampunan #89', 
  'Hari ke-33 Bersih', 
  'emerald', 
  'Kemenangan & Kesaksian', 
  'Alhamdulillah, segala puji bagi Allah! Hari ini genap 30 hari saya tidak menyentuh pornografi sama sekali. Otak rasanya jauh lebih jernih, sholat mulai terasa nikmat, dan rasa bersalah yang dulu menghantui perlahan sirna. Bagi antum yang sedang berjuang di hari ke-1 atau ke-3, jangan pernah putus asa dari rahmat Allah. Kalian pasti bisa!', 
  142, 
  95, 
  NOW() - INTERVAL '2 hours'
),
(
  'seed-3', 
  'Mujahid Subuh #77', 
  'Pejuang Istiqomah', 
  'teal', 
  'Tips & Taktik Bertahan', 
  'Trik paling ampuh saat jam rawan (22:00 - 02:00): Jangan bawa HP ke dekat tempat tidur. Cas HP di ruang tamu atau meja yang jauh dari jangkauan tangan. Begitu ada trigger kilat, langsung ambil air wudhu dingin. Rasa ingin bermaksiat seketika padam.', 
  89, 
  62, 
  NOW() - INTERVAL '5 hours'
)
ON CONFLICT (id) DO NOTHING;
