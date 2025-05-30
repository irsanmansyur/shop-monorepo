# ---- Base Image ----
FROM oven/bun:1.1 AS base
WORKDIR /app
COPY . .

# ---- Install dependencies for both apps ----
RUN bun install

RUN bun x prisma generate


# ---- Build Frontend ----
FROM base AS frontend
WORKDIR /app/apps/web
RUN bun x vite build

# ---- Production Server ----
FROM base AS runner
WORKDIR /app

# Copy built frontend
COPY --from=frontend /app/apps/web/dist /app/apps/web/dist

# Expose port: Bun (API) will serve API and static frontend
EXPOSE 3000

# Default CMD: run Bun server (e.g. serving API and static frontend)
CMD ["bun", "apps/api/index.ts"]
