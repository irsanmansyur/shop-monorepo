
# ==============================
# ==== Node Dev Deps (Web) =====
# ==============================
FROM node:20-alpine AS dev-deps-web

WORKDIR /app/apps/web

COPY ./apps/web/package*.json ./

# RUN npm ci
RUN npm install


# ==============================
# ==== Node Prod Deps (Web) ====
# ==============================
FROM node:20-alpine AS prod-deps-web

WORKDIR /app/apps/web

COPY ./apps/web/package*.json ./

RUN npm install --omit=dev

# ==============================
# ==== Web Build Stage =========
# ==============================
FROM node:20-alpine AS build-web

WORKDIR /app

# Salin source dan deps dari dev stage
COPY ./apps/web ./apps/web
COPY ./packages/trpc ./packages/trpc
COPY --from=dev-deps-web /app/apps/web/node_modules ./apps/web/node_modules

# Build React Router App (Vite atau lainnya)
RUN cd apps/web && npm run build



EXPOSE 4000

CMD ["npm", "run", "start"]
