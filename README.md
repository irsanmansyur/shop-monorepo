# Shop Monorepo - Dokumentasi Docker & Deployment

Repositori ini berisi aplikasi monorepo untuk Shop, terdiri dari API backend (Bun + Hono + Prisma) dan frontend web (React Router, Vite). Proyek ini sudah terintegrasi dengan Docker untuk memudahkan proses development dan deployment.

---

## Struktur Penting

- `Dockerfile` : Untuk build dan menjalankan service API (backend).
- `DockerfileWeb` : Untuk build dan menjalankan service Web (frontend).
- `docker-compose.yml` : Untuk mengatur dan menjalankan kedua service secara bersamaan.
- `.env` : Berisi environment variable penting untuk API dan Web.

---

## Cara Menjalankan dengan Docker Compose

1. **Pastikan Docker & Docker Compose sudah terinstall di sistem kamu.**

2. **Siapkan file `.env` di root project**

	Contoh isi:
	```bash
	DATABASE_URL=postgres://postgres:sdfsdfdessdf@172.72.0.8:5432/shop-test
	BETTER_AUTH_SECRET=changeme
	VITE_API=http://localhost:3000
	CORS_ORIGIN=https://shop.chank.my.id,http://localhost:5173
	```

3. **Jalankan perintah berikut di root project:**

	```sh
	docker-compose up --build
	```

	Ini akan:
   - Build dan menjalankan service API di port 3000 (container: `shop_api`)
   - Build dan menjalankan service Web di port 4000 (container: `shop_web`)


4. **Akses aplikasi:**
   - API: `http://localhost:3000`
   - Web: `http://localhost:4000`

---

## Penjelasan File

### Dockerfile (API)
- Menggunakan image `oven/bun`.
- Install dependency, generate Prisma Client, dan expose port 3000.
- Jalankan API dengan perintah: `bun run ./apps/api/src/index.ts`

### DockerfileWeb (Web)
- Multi-stage build:
  - Install dependency (dev & prod).
  - Build aplikasi web (Vite).
  - Jalankan web server di port 4000 dengan `npm run start`.

### docker-compose.yml
- Mendefinisikan dua service: `api` dan `web`.
- Mengatur environment variable, network, dan build context untuk masing-masing service.
- Menggunakan dua external network: `npm_overlay_net` dan `wg-easy-net`.

---

## Catatan

- Pastikan network eksternal (`npm_overlay_net` dan `wg-easy-net`) sudah dibuat di Docker host.
- Untuk development lokal, kamu bisa mengubah environment variable di `.env` sesuai kebutuhan.
- Jika ingin mengakses API dari web, pastikan variabel `VITE_API` di `.env` dan environment Docker sudah sesuai.

---

## Troubleshooting

- Jika ada masalah koneksi database, cek kembali `DATABASE_URL` di `.env`.
- Jika port sudah digunakan, pastikan tidak ada aplikasi lain yang berjalan di port 3000 atau 4000.

---

## Kontribusi

Silakan buat issue atau pull request jika ingin berkontribusi atau menemukan bug.

---

**Selamat ngoding! 🚀**
