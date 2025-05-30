# ---- Base Image ----
FROM node:20-slim AS base

# Set working directory
WORKDIR /app

# Install bun (manual)
RUN apt-get update && apt-get install -y curl ca-certificates openssl \
	&& curl -fsSL https://bun.sh/install | bash \
	&& ln -s /root/.bun/bin/bun /usr/local/bin/bun \
	&& apt-get remove --purge -y curl \
	&& rm -rf /var/lib/apt/lists/*

# Copy only necessary files first for better layer caching
COPY bun.lockb package.json tsconfig.json ./
COPY prisma ./prisma

# Install dependencies and generate prisma
RUN bun install && bun x prisma generate

# Copy all remaining source files
COPY . .

# Build web app (assumed located in apps/web)
RUN bun run --cwd ./apps/web build

# Expose ports (3000 for web, 4000 optional)
EXPOSE 3000 4000

# Start the app
CMD ["bun", "nyala"]
