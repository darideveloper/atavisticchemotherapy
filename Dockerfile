# syntax=docker/dockerfile:1.7

# === Stage 1: Build ===
FROM node:lts-alpine AS build
RUN corepack enable && corepack prepare pnpm@10.18.3 --activate
WORKDIR /app

# Build-time environment variables — Pattern B (default): SITE_URL is a
# server-only Docker build arg so production canonicals resolve per
# environment. Pass --build-arg SITE_URL=https://quimioterapia-atavistica.org
ARG SITE_URL
ENV SITE_URL=$SITE_URL

# The contact form config is client-safe and is inlined by Astro at build time.
ARG PUBLIC_CONTACT_FORM_ENDPOINT
ARG PUBLIC_CONTACT_FORM_USER
ARG PUBLIC_CONTACT_FORM_API_KEY
ENV PUBLIC_CONTACT_FORM_ENDPOINT=$PUBLIC_CONTACT_FORM_ENDPOINT
ENV PUBLIC_CONTACT_FORM_USER=$PUBLIC_CONTACT_FORM_USER
ENV PUBLIC_CONTACT_FORM_API_KEY=$PUBLIC_CONTACT_FORM_API_KEY

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
