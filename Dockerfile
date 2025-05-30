FROM oven/bun AS runner

WORKDIR /app

# Reinstall Prisma Client + OpenSSL
RUN apt-get update -y && apt-get install -y openssl

# Copy backend code
COPY . .

RUN bun install
# Generate ulang Prisma (untuk jaga-jaga)
RUN bunx prisma generate


# Expose API dan Web ports (ubah sesuai kebutuhan)
EXPOSE 3000
CMD ["bun", "run", "./apps/api/src/index.ts"]
