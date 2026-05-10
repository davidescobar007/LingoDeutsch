# syntax=docker/dockerfile:1

# -----------------------------------------------------------------------------
# Stage 1: Install dependencies (cached when package*.json doesn't change)
# -----------------------------------------------------------------------------
FROM node:24-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit --no-fund --maxsockets 5

# -----------------------------------------------------------------------------
# Stage 2: Build the application
# -----------------------------------------------------------------------------
FROM node:24-alpine AS builder
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build-time env vars (hardcoded for Dokploy)
ENV NEXT_PUBLIC_API_ENVIRONMENT=https://blabling-pocketbase-qa.duckdns.org/

# Build the app
RUN npm run build

# -----------------------------------------------------------------------------
# Stage 3: Production runner - minimal image
# -----------------------------------------------------------------------------
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output and static files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Use standalone server.js (lighter than next start)
CMD ["node", "server.js"]
