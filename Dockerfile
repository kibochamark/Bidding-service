# ==============================================
# Stage 1: Development/Build Stage
# ==============================================
FROM node:22-alpine AS development

WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy source code
COPY . .

# Set dummy DATABASE_URL for prisma generate only
ENV DATABASE_URL="postgresql://dummy:dummy@dummy:5432/dummy?schema=public"

# Generate Prisma Client (doesn't need real DB)
RUN npx prisma generate

# Build the app
RUN pnpm run build

EXPOSE 4000

CMD ["pnpm", "run", "start:dev"]

# ==============================================
# Stage 2: Production Stage
# ==============================================
FROM node:22-alpine AS production

WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install production dependencies + prisma CLI (needed for db push at runtime)
RUN pnpm install --prod && pnpm add prisma

# Copy built application from development stage
COPY --from=development /usr/src/app/dist ./dist

# Copy Prisma schema (needed for db push at runtime)
COPY --from=development /usr/src/app/prisma ./prisma

# Copy the already-generated Prisma Client from dev stage
COPY --from=development /usr/src/app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 4000

# At startup: push schema changes then start the app
CMD ["sh", "-c", "npx prisma db push --skip-generate && node dist/src/main.js"]