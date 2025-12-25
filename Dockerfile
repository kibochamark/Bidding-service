# ==============================================
# Stage 1: Development/Build Stage
# Purpose: Install dependencies and build the app
# ==============================================
FROM node:20-alpine as development

# Set working directory inside container
WORKDIR /usr/src/app

# Install pnpm (Alpine doesn't have it by default)
RUN npm install -g pnpm

# Copy package files first (for Docker layer caching)
# If these don't change, Docker reuses this layer = faster builds!
COPY package.json pnpm-lock.yaml ./

# Install ALL dependencies (including devDependencies for building)
RUN pnpm install

# Copy all source code
COPY . .

# Set dummy DATABASE_URL for prisma generate
# Real DATABASE_URL will be provided at runtime by docker-compose/kubernetes
ENV DATABASE_URL="postgresql://dummy:dummy@dummy:5432/dummy?schema=public"

# Generate Prisma Client (creates TypeScript types from schema)
RUN npx prisma generate

# Build the NestJS app (TypeScript → JavaScript in /dist folder)
RUN pnpm run build

# ==============================================
# Stage 2: Production Stage
# Purpose: Create minimal image with only what's needed to run
# ==============================================
FROM node:20-alpine as production

# Set working directory
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install ONLY production dependencies (smaller image, more secure)
RUN pnpm install --prod

# Copy Prisma schema (needed at runtime to connect to database)
COPY prisma ./prisma

# Set dummy DATABASE_URL for prisma generate
# Real DATABASE_URL will be provided at runtime by docker-compose/kubernetes
ENV DATABASE_URL="postgresql://dummy:dummy@dummy:5432/dummy?schema=public"

# Generate Prisma Client for production
RUN npx prisma generate

# Copy compiled JavaScript code from development stage
# We DON'T copy source .ts files - don't need them in production!
COPY --from=development /usr/src/app/dist ./dist

# Expose port 3000 (tells Docker which port the app uses)
EXPOSE 3000

# Start the application
# NestJS builds to dist/src/main.js (not dist/main.js)
CMD ["node", "dist/src/main"]