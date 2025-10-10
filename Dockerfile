# ---------- STAGE 1: Build ----------
ARG NODE_VERSION=22.14.0
FROM node:${NODE_VERSION}-slim AS builder

RUN apt-get update && apt-get install -y build-essential python3 pkg-config git && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# ---------- STAGE 2: Run ----------
FROM node:${NODE_VERSION}-slim

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max_old_space_size=4096"

WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "run", "start"]
