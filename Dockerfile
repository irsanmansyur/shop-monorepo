FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm install

COPY prisma ./prisma
COPY . .

RUN npx prisma generate

RUN npm run --workspace=apps/web build

EXPOSE 3000 4000

CMD ["npm", "run", "nyala"]
