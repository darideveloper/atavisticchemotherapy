# syntax=docker/dockerfile:1.7

# === Stage 1: Build ===
FROM node:lts-alpine AS build
RUN corepack enable && corepack prepare pnpm@10.18.3 --activate
WORKDIR /app

# Build-time environment variables — Pattern B (default): SITE_URL is a
# server-only Docker build arg so production canonicals resolve per
# environment. Pass --build-arg SITE_URL=https://atavisticchemotherapy.com
ARG SITE_URL
ENV SITE_URL=$SITE_URL

# No backend contract — no PUBLIC_* build args.

# Install dependencies (cached layer — only invalidates on lockfile change)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build the static site
COPY . .
RUN pnpm build:i18n

# === Stage 2: Serve ===
FROM nginx:alpine AS serve
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80