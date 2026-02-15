# ==============================================
# Stage 2: Production Stage
# ==============================================
FROM node:22-alpine AS production

WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install production dependencies + prisma CLI
RUN pnpm install --prod && pnpm add prisma

# Copy built application from development stage
COPY --from=development /usr/src/app/dist ./dist

# Copy Prisma schema (needed for db push at runtime)
COPY --from=development /usr/src/app/prisma ./prisma

# Generate Prisma Client in production stage
# This uses the schema we just copied
RUN npx prisma generate

EXPOSE 4000

# At startup: push schema changes then start the app
CMD ["sh", "-c", "npx prisma db push --skip-generate && node dist/src/main.js"]