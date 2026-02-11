# ==============================================
# Stage 1: Development/Build Stage
# ==============================================
FROM node:20-alpine AS development

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
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install ONLY production dependencies
RUN pnpm install --prod

# Copy built application from development stage
COPY --from=development /usr/src/app/dist ./dist

# Copy Prisma schema and generate client in production
COPY --from=development /usr/src/app/prisma ./prisma

# Set dummy DATABASE_URL for prisma generate
ENV DATABASE_URL="postgresql://dummy:dummy@dummy:5432/dummy?schema=public"

# Generate Prisma Client in production
RUN npx prisma generate

EXPOSE 4000

CMD ["node", "dist/src/main.js"]