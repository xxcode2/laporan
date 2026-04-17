# Laporan

Aplikasi pencatatan keuangan harian untuk order Shopee dengan penyimpanan menggunakan PostgreSQL dan Prisma.

## Hosting di Vercel

1. Buat akun di https://vercel.com jika belum punya.
2. Klik "New Project" dan pilih repository `laporan`.
3. Pilih framework "Other" atau biarkan default.
4. Pada halaman pengaturan project, tambahkan environment variable berikut:
   - `PRISMA_DATABASE_URL`
   - isi dengan URL database PostgreSQL milikmu
5. Deploy.

## Struktur baru

- `index.html` tetap menjadi front-end utama.
- `api/orders.js` adalah serverless API Vercel untuk operasi CRUD.
- `prisma/schema.prisma` mendefinisikan model `Order`.
- `lib/prisma.js` membuat client Prisma untuk dipakai di API.

## Local development

1. Jalankan `npm install`
2. Buat file `.env` di root dengan `PRISMA_DATABASE_URL` sesuai database kamu
3. Jalankan `npx prisma generate`
4. Jalankan `npm run dev` untuk membuka aplikasi dan API lokal

> `npm run dev` sekarang menjalankan `server.js`, jadi `/api/orders` akan tersedia secara lokal.

## Fitur baru

- Filter status order (`Pending` / `Terjual`)
- Pencarian customer dan catatan order
- Export data hasil filter ke CSV

## Environment variable

- Gunakan `.env.example` sebagai referensi.
- Jangan commit nilai rahasia database ke repository.

## Catatan penting

- Data dari aplikasi sekarang disimpan ke database PostgreSQL lewat API.
- Aplikasi tidak lagi bergantung pada `database.json` atau `localStorage` untuk data utama.
- Jika kamu ingin mengelola migrasi database lebih lanjut, gunakan Prisma CLI.
