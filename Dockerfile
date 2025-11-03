# ===== Stage 1: Build =====
FROM node:22-bullseye AS builder
WORKDIR /app

# Copy only package files first (for better caching)
COPY package*.json ./

# Install dependencies (including dev)
RUN npm ci

# Copy the rest of your app
COPY . .

# Set Node memory limit (4GB is a good middle ground)
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build Next.js app
RUN npm run build


# ===== Stage 2: Production =====
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only what’s needed from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

EXPOSE 3000
CMD ["npm", "start"]
