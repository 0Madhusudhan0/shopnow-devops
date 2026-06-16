# ==========================================
# Stage 1: Build the React Application
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package configurations first to leverage caching
COPY frontend/package*.json ./

# Install dependencies (frozen/clean install is skipped as we copy only package.json)
RUN npm install
# RUN npm install && chmod -R 755 node_modules/.bin

# Copy the rest of the source code
COPY frontend/ ./

# Build the production assets
RUN npm run build

# ==========================================
# Stage 2: Serve using Production Nginx
# ==========================================
FROM nginx:1.25-alpine

# Copy custom nginx configuration for routing
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from Stage 1 to Nginx serve path
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
