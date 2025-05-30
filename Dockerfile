# ==============================
# ==== Base Bun for API ========
# ==============================
FROM oven/bun:1.2 AS bun-base

WORKDIR /app

# Install OpenSSL (required by Prisma)
RUN apt-get update -y && apt-get install -y openssl

COPY . .

# Install backend deps & generate Prisma client
RUN bun install
RUN bunx prisma generate

# ==============================
# ==== Node Dev Deps (Web) =====
# ==============================
FROM node:20-alpine AS dev-deps-web

WORKDIR /app/apps/web

COPY ./apps/web/package*.json ./

RUN npm ci

# ==============================
# ==== Node Prod Deps (Web) ====
# ==============================
FROM node:20-alpine AS prod-deps-web

WORKDIR /app/apps/web

COPY ./apps/web/package*.json ./

RUN npm ci --omit=dev

# ==============================
# ==== Web Build Stage =========
# ==============================
FROM node:20-alpine AS build-web

WORKDIR /app

# Salin source dan deps dari dev stage
COPY ./apps/web ./apps/web
COPY --from=dev-deps-web /app/apps/web/node_modules ./apps/web/node_modules

# Build React Router App (Vite atau lainnya)
RUN cd apps/web && npm run build

# ==============================
# ==== Final Bun Runner ========
# ==============================
FROM oven/bun:1.2 AS runner

WORKDIR /app

# Reinstall Prisma Client + OpenSSL
RUN apt-get update -y && apt-get install -y openssl

# Copy backend code
COPY . .

# Generate ulang Prisma (untuk jaga-jaga)
RUN bunx prisma generate

# Copy web build hasil build dari stage sebelumnya
COPY --from=build-web /app/apps/web/build ./apps/web/build

# Expose API dan Web ports (ubah sesuai kebutuhan)
EXPOSE 3000 4000

# Jalankan Hono API
CMD ["bun", "run", "./apps/api/src/index.ts"]
