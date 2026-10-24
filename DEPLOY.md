# Panduan Publikasi & Deployment Platform Iffah (عِفَّة)

Website Iffah sudah dikonfigurasi secara lengkap untuk langsung online ke internet secara gratis, aman dengan HTTPS/SSL, dan bisa diinstal sebagai aplikasi HP (PWA).

Repository GitHub Anda: **`https://github.com/khalilsaladdin/iffah`**

---

## ⚡ Langkah 0: Sinkronkan Kode Terbaru via GitHub Desktop (3 Detik)

1. Buka aplikasi **GitHub Desktop** di komputer Anda.
2. Anda akan melihat tombol biru di kanan atas: **"Push origin"** (ada commit terbaru yang siap dikirim).
3. Klik tombol **"Push origin"**. Semua kode terbaru Iffah langsung terkirim ke GitHub Anda!

---

## 🚀 Pilihan 1: Deploy ke Vercel (SANGAT DIREKOMENDASIKAN - Paling Stabil & Cepat)

Vercel adalah platform hosting cloud modern yang memberikan performa tercepat, SSL gratis, dan domain otomatis:

1. Buka **[https://vercel.com](https://vercel.com)** di browser.
2. Klik **"Sign Up"** atau **"Log In"** ➔ Pilih **"Continue with GitHub"**.
3. Di Dashboard Vercel, klik tombol **"Add New..."** ➔ **"Project"**.
4. Di daftar repository, Anda akan melihat **`iffah`** (atau cari `iffah`). Klik tombol **"Import"**.
5. Vercel secara otomatis mengenali framework **Vite**. Anda **tidak perlu mengubah setting apapun**.
6. Klik tombol biru **"Deploy"**.
7. Tunggu sekitar 20-30 detik.
8. 🎉 **Selesai!** Vercel akan menampilkan kembang api dan memberikan tautan resmi Anda (contoh: `https://iffah-eight.vercel.app` atau `https://iffah.vercel.app`).
   - Setiap kali Anda klik *Push* di GitHub Desktop di kemudian hari, Vercel akan otomatis meng-update website dalam hitungan detik!

---

## 🌐 Pilihan 2: Mengaktifkan GitHub Pages (100% di Dalam GitHub)

Kami telah memasang file otomatisasi **GitHub Actions** (`.github/workflows/deploy.yml`) di repository Anda.

1. Buka repository Anda di browser: **[https://github.com/khalilsaladdin/iffah](https://github.com/khalilsaladdin/iffah)**.
2. Klik tab **Settings** (di menu atas repository).
3. Di bilah menu sebelah kiri, klik **Pages**.
4. Pada bagian **"Build and deployment"** ➔ **Source**:
   - Ubah dari *Deploy from a branch* menjadi **`GitHub Actions`**.
5. Selesai! GitHub akan otomatis menjalankan build dan menerbitkan website Anda di:
   👉 **`https://khalilsaladdin.github.io/iffah/`**

---

## 📦 Pilihan 3: Netlify Drop (Instan 10 Detik Tanpa Login)

Jika Anda ingin langsung mendapatkan link saat ini juga tanpa login:

1. Buka: **[https://app.netlify.com/drop](https://app.netlify.com/drop)**
2. Buka folder explorer di komputer:
   `C:\Users\62877\.gemini\antigravity\scratch\iffah\dist`
3. Drag (tarik) folder **`dist`** tersebut dan lepaskan (*drop*) ke kotak di website Netlify Drop.
4. Dalam 5 detik, website langsung aktif dengan link publik Netlify!

---

## 📱 Cara Membagikan & Menginstal ke HP Jamaah/Teman:
Setelah link (Vercel / GitHub Pages / Netlify) didapatkan:
1. Kirim link tersebut lewat WhatsApp / Telegram.
2. Saat orang lain membukanya di browser HP (Chrome / Safari):
   - Di Android: Muncul banner *"Install Iffah"* atau tombol *"Tambah ke Layar Utama"*.
   - Di iPhone: Ketuk tombol Share (ikon panah ke atas) ➔ pilih *"Add to Home Screen"*.
3. Aplikasi akan terpasang di HP layaknya aplikasi native dari App Store / Play Store, lengkap dengan audio murottal latar belakang dan proteksi privasi!
