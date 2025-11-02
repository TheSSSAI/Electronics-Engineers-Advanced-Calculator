# Stage 1: Development - Install all dependencies, including devDependencies
FROM node:18-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Builder - Prune devDependencies and build the app
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY --from=development /usr/src/app/package*.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/dist ./dist

# Stage 3: Production - Create a small, clean production image
FROM node:18-alpine AS production
WORKDIR /usr/src/app

# Set NODE_ENV to production
ENV NODE_ENV production

# Copy production dependencies from the builder stage
COPY --from=builder /usr/src/app/package*.json ./
# Install only production dependencies
RUN npm ci --omit=dev

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]