# ==============================================
# Stage 1: Builder Stage (renamed from 'development')
# ==============================================
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the app
RUN pnpm run build

# ==============================================
# Stage 2: Production Stage
# ==============================================
FROM node:22-alpine AS production

WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install production dependencies
RUN pnpm install --prod

# Copy built application from builder stage (fixed reference)
COPY --from=builder /usr/src/app/dist ./dist

# Copy Prisma schema from builder stage (fixed reference)
COPY --from=builder /usr/src/app/prisma ./prisma

# Generate Prisma Client in production stage
RUN npx prisma generate

EXPOSE 4000

CMD ["sh", "-c", "npx prisma db push --skip-generate && node dist/src/main.js"]