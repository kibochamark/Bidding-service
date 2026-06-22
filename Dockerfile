# ==============================================
# Stage 1: Builder Stage
# ==============================================
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

RUN npm install -g pnpm@9

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

ENV DATABASE_URL="postgresql://dummy:dummy@dummy:5432/dummy?schema=public"

RUN npx prisma generate

RUN pnpm run build

# ==============================================
# Stage 2: Production Stage
# ==============================================
FROM node:22-alpine AS production

WORKDIR /usr/src/app

# Copy package metadata
COPY package.json pnpm-lock.yaml ./

# Copy production-ready node_modules
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copy built application
COPY --from=builder /usr/src/app/dist ./dist

# Copy Prisma files
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/prisma.config.ts ./prisma.config.ts

# Copy generated Prisma client
COPY --from=builder /usr/src/app/generated ./generated

EXPOSE 4000

CMD ["node", "dist/src/main.js"]