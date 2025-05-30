# ---- Base Image ----
FROM oven/bun AS base
WORKDIR /app
COPY . .
RUN bun install
RUN bun x prisma generate

# ---- Build Frontend ----
FROM base AS frontend
WORKDIR /app/apps/web
RUN bun run build  --no-cache

# ---- Runner ----
FROM base AS runner
WORKDIR /app
COPY . .

COPY --from=frontend /app/apps/web/build ./apps/web/build


EXPOSE 3000 4000

CMD ["bun", "nyala"]
