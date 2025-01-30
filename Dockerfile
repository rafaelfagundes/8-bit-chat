# Build stage
FROM oven/bun:latest as builder

WORKDIR /app

# Copy package files
COPY package.json .
COPY bun.lock .

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN bun run build

# Production stage
FROM oven/bun:latest as runner

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json .
COPY --from=builder /app/bun.lock .
COPY --from=builder /app/next.config.ts .

# Install production dependencies
RUN bun install --frozen-lockfile --production

# Expose port
EXPOSE 3000

# Start the application
CMD ["bun", "next", "start"]