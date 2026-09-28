# Build the frontend assets. The Clerk publishable key is public and is embedded
# in the browser bundle by Vite; never pass secret keys as build arguments.
FROM node:24-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
ARG VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}
RUN npm run build

FROM node:24-alpine AS backend-build
WORKDIR /app/backend
ENV NODE_ENV=production
COPY backend/package.json backend/package-lock.json ./
RUN npm ci
COPY backend/tsconfig.json ./
COPY backend/src ./src
RUN npm run build && npm prune --omit=dev

# A single Render Web Service serves both the browser app and the API.
FROM node:24-alpine AS runtime
WORKDIR /app/backend
ENV NODE_ENV=production
COPY --from=backend-build /app/backend/package.json ./package.json
COPY --from=backend-build /app/backend/node_modules ./node_modules
COPY --from=backend-build /app/backend/dist ./dist
COPY --from=frontend-build /app/frontend/dist ./public
EXPOSE 4000
CMD ["npm", "start"]
