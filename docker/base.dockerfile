# yarn scripts docker build --only base

# Setup Buildx builder
# syntax=docker/dockerfile:1
FROM docker
COPY --from=docker/buildx-bin /buildx /usr/libexec/docker/cli-plugins/docker-buildx
RUN docker buildx version

FROM node:22.6.0-alpine as base

WORKDIR /app

COPY ./.yarn ./.yarn
ENV YARN_CACHE_FOLDER=/app/.yarn/cache

# Install node_modules for workspaces
COPY ./package.json ./yarn.lock ./.yarnrc.yml ./
COPY ./backend/package.json ./backend/package.json
COPY ./frontend/package.json ./frontend/package.json
COPY ./scripts/package.json ./scripts/package.json

ENV PATH /app/node_modules/.bin:$PATH

RUN yarn install --immutable

COPY . .

# Debug

# docker run --rm -it samicharity/base:latest /bin/sh          
