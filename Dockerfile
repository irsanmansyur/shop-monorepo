# ---- Base: install deps, prisma, etc. ----
FROM oven/bun:1.2 AS base

WORKDIR /app

# Salin semua file
COPY . .

# Install OpenSSL agar Prisma CLI bisa jalan
RUN apt-get update -y && apt-get install -y openssl

# Install dependencies
RUN bun install

# Generate Prisma client
RUN bunx prisma generate


# ---- Build Frontend (Vite) ----
FROM base AS frontend

WORKDIR /app/apps/web

RUN bunx vite build

# ---- Final Runner ----
FROM oven/bun:1.2 AS runner

WORKDIR /app

# Copy semua file dari base
COPY . .

# Copy hasil build frontend dari tahap frontend
COPY --from=frontend /app/apps/web/build ./apps/web/build

# Jalankan Prisma generate lagi untuk jaga-jaga
RUN apt-get update -y && apt-get install -y openssl \
	&& bunx prisma generate

# Expose port backend dan frontend jika perlu
EXPOSE 3000 4000

# Jalankan Hono backend (misal dari apps/api/src/index.ts)
CMD ["bun", "run", "./apps/api/src/index.ts"]
