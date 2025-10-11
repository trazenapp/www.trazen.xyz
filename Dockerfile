# ---------- STAGE 1: Build ----------
ARG NODE_VERSION=22.14.0
FROM node:${NODE_VERSION}-slim AS builder

# Install required build dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  python3 \
  pkg-config \
  git \
  && rm -rf /var/lib/apt/lists/*

# Prevent Node.js OOM crashes during build
ENV NODE_OPTIONS="--max_old_space_size=4096"

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source files
COPY . .

# Build Next.js (with increased memory)
RUN npm run build

# ---------- STAGE 2: Run ----------
FROM node:${NODE_VERSION}-slim

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max_old_space_size=2048"

WORKDIR /app

# Copy only what’s needed for runtime
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "run", "start"]
