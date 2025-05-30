# ---- Base Image ----
FROM node:20-slim

# Set working directory
WORKDIR /app

# Install OS deps for Prisma and others
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy only what is needed for install
COPY package.json ./
COPY prisma ./prisma

# Install dependencies and generate Prisma client
RUN npm install
RUN npx prisma generate

# Copy rest of the app
COPY . .

# Build frontend (if any)
RUN npm run --workspace=apps/web build

# Expose ports (adjust as needed)
EXPOSE 3000 4000

# Start app (custom script like `nyala` must exist in package.json)
CMD ["npm", "run", "nyala"]
