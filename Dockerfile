# syntax=docker/dockerfile:1

# -----------------------------------------------------------------------------
# Stage 1: Install dependencies (cached when package*.json doesn't change)
# -----------------------------------------------------------------------------
FROM oven/bun:1-alpine AS deps
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# -----------------------------------------------------------------------------
# Stage 2: Build the application
# -----------------------------------------------------------------------------
FROM oven/bun:1-alpine AS builder
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build-time env vars (hardcoded for Dokploy)
ENV NEXT_PUBLIC_API_ENVIRONMENT=https://blabling-pocketbase-qa.duckdns.org/

# Build the app
RUN bun run build

# -----------------------------------------------------------------------------
# Stage 3: Production runner - minimal image
# -----------------------------------------------------------------------------
FROM oven/bun:1-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 bungroup
RUN adduser --system --uid 1001 -G bungroup nextjs

# Copy standalone output and static files
COPY --from=builder --chown=nextjs:bungroup /app/.next/standalone ./
COPY --from=builder --chown=nextjs:bungroup /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:bungroup /app/public ./public

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Use standalone server.js with Bun runtime
CMD ["bun", "server.js"]
