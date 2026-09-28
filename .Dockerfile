# Build the Vite frontend as a standalone container target:
# docker build --target frontend -f .Dockerfile -t learnwithai-frontend .
FROM node:24-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
ARG VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}
RUN npm run build

FROM nginx:alpine AS frontend
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html
EXPOSE 80

# Default target: Express API. Supply CLERK_SECRET_KEY and MONGODB_URI at runtime.
FROM node:24-alpine AS backend
WORKDIR /app/backend
ENV NODE_ENV=production
COPY backend/package.json backend/package-lock.json ./
RUN npm ci
COPY backend/tsconfig.json ./
COPY backend/src ./src
RUN npm run build && npm prune --omit=dev
EXPOSE 4000
CMD ["npm", "start"]
