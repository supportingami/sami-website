# docker build --file docker/base.dockerfile --tag sami/base .

# Setup Buildx builder
# syntax=docker/dockerfile:1
FROM docker
COPY --from=docker/buildx-bin /buildx /usr/libexec/docker/cli-plugins/docker-buildx
RUN docker buildx version

FROM node:18-alpine as base
# Installing libvips-dev for sharp Compatibility

# RUN apk update && apk add build-base gcc autoconf automake zlib-dev libpng-dev vips-dev && rm -rf /var/cache/apk/* > /dev/null 2>&1

WORKDIR /app

COPY ./.yarn ./.yarn
ENV YARN_CACHE_FOLDER=/app/.yarn/cache

# Install node_modules for workspaces
COPY ./package.json ./yarn.lock ./.yarnrc.yml ./
COPY ./backend/package.json ./backend/package.json
COPY ./frontend/package.json ./frontend/package.json
COPY ./scripts/package.json ./scripts/package.json

ENV PATH /app/node_modules/.bin:$PATH

RUN yarn install

COPY . .



