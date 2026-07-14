# Panduan Deploy ke Vercel + Railway

## Gambaran Umum

- **Frontend** (tampilan website) → **Vercel** (gratis)
- **Backend/API** (server data) → **Railway** (gratis hingga $5/bulan usage)
- **Database** → **Neon.tech** (PostgreSQL gratis)
- **Domain** → `asrapatrian.my.id`

---

## Langkah 1 — Upload kode ke GitHub

1. Buka [github.com](https://github.com) → Login → klik **"New repository"**
2. Nama repo: `portofolio-asra` → klik **"Create repository"**
3. Di Replit, klik ikon **Git** di sidebar kiri
4. Pilih **"Connect to GitHub"** → pilih repo yang baru dibuat
5. Klik **"Push"** → semua kode terupload ke GitHub

---

## Langkah 2 — Buat Database di Neon.tech

1. Buka [neon.tech](https://neon.tech) → daftar gratis
2. Klik **"New Project"** → beri nama `portofolio-asra`
3. Setelah dibuat, salin **Connection String** yang ada (bentuknya: `postgresql://user:pass@host/db`)
4. Simpan connection string ini — akan dipakai di langkah selanjutnya

---

## Langkah 3 — Deploy API ke Railway

1. Buka [railway.app](https://railway.app) → login dengan GitHub
2. Klik **"New Project"** → **"Deploy from GitHub repo"**
3. Pilih repo `portofolio-asra`
4. Railway akan detect otomatis menggunakan `railway.toml`
5. Setelah deploy, buka tab **"Variables"** dan tambahkan:
   - `DATABASE_URL` = connection string dari Neon.tech (langkah 2)
   - `PORT` = `8080`
   - `SESSION_SECRET` = buat kata sandi acak panjang (minimal 32 karakter)
   - `ADMIN_PASSWORD` = `asra2024`
   - `NODE_ENV` = `production`
6. Klik **"Redeploy"** setelah menambahkan variabel
7. Salin URL Railway Anda (bentuknya: `https://xxx.railway.app`) → simpan untuk langkah 4

> **Penting**: Jalankan migrasi database sekali:
> Di Railway, buka tab **"Shell"** dan jalankan:
> `pnpm --filter @workspace/db run push`

---

## Langkah 4 — Update URL API di vercel.json

Buka file `artifacts/portfolio/vercel.json` dan ganti `GANTI_DENGAN_URL_RAILWAY_ANDA` dengan URL Railway dari langkah 3.

Contoh:
```json
"destination": "https://portofolio-asra-production.up.railway.app/api/$1"
```

Commit & push perubahan ini ke GitHub.

---

## Langkah 5 — Deploy Frontend ke Vercel

1. Buka [vercel.com](https://vercel.com) → login dengan GitHub
2. Klik **"Add New Project"** → pilih repo `portofolio-asra`
3. Pada pengaturan:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `artifacts/portfolio`
   - **Build Command**: `cd ../.. && pnpm install && npx vite build --config vite.config.vercel.ts`
   - **Output Directory**: `dist/public`
4. Klik **"Deploy"**
5. Tunggu sampai selesai (sekitar 2-3 menit)

---

## Langkah 6 — Pasang Domain `asrapatrian.my.id`

1. Di Vercel, buka project Anda → tab **"Settings"** → **"Domains"**
2. Tambahkan `asrapatrian.my.id`
3. Vercel akan memberi instruksi DNS — salin nilai **CNAME** yang diberikan
4. Login ke panel domain Anda (tempat beli domain)
5. Tambahkan record DNS:
   - Type: `CNAME`
   - Name: `@` (atau `asrapatrian`)
   - Value: nilai dari Vercel
6. Tunggu 5-30 menit → domain aktif dengan HTTPS otomatis!

---

## Ringkasan Variabel yang Dibutuhkan

| Variabel | Keterangan | Diisi di |
|----------|-----------|---------|
| `DATABASE_URL` | Connection string Neon.tech | Railway |
| `PORT` | `8080` | Railway |
| `SESSION_SECRET` | Kata sandi sesi random | Railway |
| `ADMIN_PASSWORD` | `asra2024` | Railway |
| `NODE_ENV` | `production` | Railway |
