# ---- Base Image ----
FROM oven/bun AS base
WORKDIR /app
COPY . .
RUN bun install
RUN bun x prisma generate


WORKDIR /app/apps/web
RUN bun run build


WORKDIR /app


EXPOSE 3000 4000

CMD ["bun", "nyala"]
