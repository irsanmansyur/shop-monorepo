# ==== Bun Base untuk API ====
FROM oven/bun:1.2 AS bun-base

WORKDIR /app

# Install OpenSSL untuk Prisma CLI
RUN apt-get update -y && apt-get install -y openssl

COPY . .

RUN bun install
RUN bunx prisma generate

# ==== Node Dev Dependencies for Web ====
FROM node:20-alpine AS development-dependencies-env

WORKDIR /app

COPY ./apps/web/package*json ./apps/web/

RUN cd apps/web && npm ci

# ==== Node Production Dependencies for Web ====
FROM node:20-alpine AS production-dependencies-env

WORKDIR /app

COPY ./apps/web/package*json ./apps/web/

RUN cd apps/web && npm ci --omit=dev

# ==== Build Web Frontend ====
FROM node:20-alpine AS build-env

WORKDIR /app

COPY ./apps/web ./apps/web
COPY --from=development-dependencies-env /app/apps/web/node_modules ./apps/web/node_modules

RUN cd apps/web && npm run build

# ==== Final Runner ====
FROM oven/bun:1.2 AS runner

WORKDIR /app

# Copy backend files
COPY . .

# Install OpenSSL + Prisma generate ulang (safety)
RUN apt-get update -y && apt-get install -y openssl \
	&& bunx prisma generate

# Copy build frontend dari stage Node ke lokasi yang bisa diserve (jika diperlukan)
COPY --from=build-env /app/apps/web/build ./apps/web/build

# Expose ports (sesuaikan jika Hono dan frontend serve di port berbeda)
EXPOSE 3000 4000

# Jalankan backend Hono
CMD ["bun", "run", "./apps/api/src/index.ts"]
