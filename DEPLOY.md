# Panduan Deployment Platform Iffah (عِفَّة) ke Hosting Publik

Semua file konfigurasi (`vercel.json`, `netlify.toml`, `public/_redirects`) dan bundle produksi (`dist/`) sudah siap 100%. Pilih salah satu cara termudah berikut:

---

## Cara 1: Drag & Drop ke Netlify (Paling Cepat — 10 Detik)
Tanpa install apapun dan tanpa terminal!

1. Buka browser dan kunjungi: **[https://app.netlify.com/drop](https://app.netlify.com/drop)**
2. Buka Windows File Explorer dan arahkan ke folder:
   `C:\Users\62877\.gemini\antigravity\scratch\iffah\dist`
3. Tarik (*drag & drop*) folder **`dist`** tersebut ke dalam area kotak di website Netlify Drop.
4. Selesai! Website Anda langsung online dan mendapatkan link publik (misal: `https://iffah-suaka.netlify.app`).
5. Anda bisa login gratis di Netlify untuk mengubah nama subdomainnya secara bebas.

---

## Cara 2: Deploy Menggunakan Vercel CLI (Via Terminal)
Vercel CLI sudah terpasang.

1. Buka PowerShell / Terminal di folder proyek:
   ```powershell
   cd C:\Users\62877\.gemini\antigravity\scratch\iffah
   npx vercel
   ```
2. Ikuti panduan di layar:
   - Tekan `y` untuk login (akan membuka browser untuk verifikasi akun Vercel/GitHub gratis).
   - Pilih *Set up and deploy?* ➔ Ketik `y`.
   - Pilih scope / nama project ➔ Tekan `Enter` (default: `iffah`).
   - *In which directory is your code located?* ➔ Tekan `Enter` (`./`).
   - *Want to modify settings?* ➔ Ketik `N`.
3. Dalam hitungan detik, Vercel akan memberikan link website yang aktif (misal: `https://iffah.vercel.app`).
4. Untuk update produksi di masa mendatang, cukup jalankan:
   ```powershell
   npx vercel --prod
   ```

---

## Cara 3: Menghubungkan GitHub ke Vercel (Rekomendasi Terbaik Jangka Panjang)
Otomatis memperbarui website setiap kali ada perubahan kode.

1. Buat repository baru di **[GitHub.com](https://github.com/new)** dengan nama `iffah`.
2. Upload kode proyek ini ke GitHub.
3. Buka **[Vercel.com](https://vercel.com)** ➔ Klik **"Add New Project"** ➔ Pilih repository `iffah`.
4. Vercel akan mendeteksi `Vite` secara otomatis. Klik **"Deploy"**.
5. Selesai!

---

## Cara Memasang Custom Domain (Contoh: `iffah.id` atau `iffah.app`)
Setelah website aktif di Vercel atau Netlify:
1. Masuk ke dashboard proyek di Vercel/Netlify.
2. Buka menu **Settings ➔ Domains**.
3. Masukkan nama domain yang Anda beli (misal: `iffah.id`).
4. Vercel/Netlify akan memberikan **DNS Record** (A Record atau CNAME).
5. Masukkan record tersebut ke panel tempat Anda membeli domain (misal: Niagahoster, Domainesia, Rumahweb, Namecheap, Cloudflare).
6. SSL / HTTPS (gembok hijau aman) akan aktif otomatis dalam beberapa menit.
