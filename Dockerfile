# ---- Base Image ----
FROM oven/bun AS base
WORKDIR /app
COPY . .
RUN bun install
RUN bun x prisma generate

# ---- Build Frontend ----
FROM base AS frontend
WORKDIR /app/apps/web
RUN bun x vite build

# ---- Runner ----
FROM base AS runner
WORKDIR /app
COPY . .

EXPOSE 3000 4000

CMD ["bun", "start"]
