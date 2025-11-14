# Multi-stage build for production deployment
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY ["Admin Dashboard with Tabs/package.json", "Admin Dashboard with Tabs/package-lock.json*", "Admin Dashboard with Tabs/"]

# Install dependencies
RUN npm ci
RUN cd "Admin Dashboard with Tabs" && npm ci && cd ..

# Copy source code
COPY . .

# Build both Vite apps
RUN npm run build
RUN cd "Admin Dashboard with Tabs" && npm run build && cd ..

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy server dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy server code, public directory, and data files
COPY server.js ./
COPY public ./public
COPY src/data ./src/data

# Copy built Vite apps (output dir is 'build' not 'dist')
COPY --from=builder /app/build ./public/portal
COPY --from=builder ["/app/Admin Dashboard with Tabs/build", "./public/admin"]

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "server.js"]
