# ==============================================
# Stage 1: Builder Stage
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

# Set DATABASE_URL as an ENV variable (not just ARG)
ENV DATABASE_URL="postgresql://dummy:dummy@dummy:5432/dummy?schema=public"

# Generate Prisma Client - now with DATABASE_URL set
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

# Copy built application from builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Copy Prisma schema from builder stage
COPY --from=builder /usr/src/app/prisma ./prisma

# Copy the generated Prisma client
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 4000

CMD ["sh", "-c", "npx prisma db push --skip-generate && node dist/src/main.js"]