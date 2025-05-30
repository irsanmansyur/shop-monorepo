# Gunakan image node LTS slim untuk ukuran kecil dan stabil
FROM node:20-slim

# Set working directory di container
WORKDIR /app

# Install openssl (jika perlu, sesuai kebutuhan kamu)
RUN apt-get update && apt-get install -y openssl curl && rm -rf /var/lib/apt/lists/*

# Copy package.json dan package-lock.json dulu (cache layer npm install)
COPY package*json ./

COPY packages ./packages

# Bersihkan cache npm untuk menghindari error modul native Rollup
RUN npm cache clean --force

# Install dependencies root (monorepo deps, prisma client, dll)
RUN npm install

# Copy prisma schema dan generate prisma client
COPY prisma ./prisma
RUN npx prisma generate

# Copy seluruh source aplikasi frontend (apps/web)
COPY apps/web ./apps/web

# Set working directory ke apps/web
WORKDIR /app/apps/web

# Install dependencies khusus apps/web (jika ada package.json disini dan perlu install ulang)
RUN npm install

# Build aplikasi frontend (perintah build kamu: react-router build)
RUN npm run build

# Kembali ke root working dir (optional)
WORKDIR /app

# Ekspos port yang dipakai aplikasi
EXPOSE 3000 4000

# Perintah menjalankan aplikasi (sesuaikan dengan script di package.json)
CMD ["npm", "run", "nyala"]
