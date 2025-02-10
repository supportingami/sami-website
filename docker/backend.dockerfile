# syntax = docker/dockerfile:1.2
# yarn scripts docker build --only backend

# Sources
# https://docs.strapi.io/dev-docs/installation/docker

# Global args (available to FROM statement also when defined this way)
# https://github.com/docker/cli/issues/2762
ARG BASE_TAG=0.0.0
ARG ENV_NAME=development 

# Setup Buildx builder
FROM docker
COPY --from=docker/buildx-bin /buildx /usr/libexec/docker/cli-plugins/docker-buildx
RUN docker buildx version

# Use extra step just to copy base image files as cannot pass variable to `COPY --from` statement
FROM samicharity/base:${BASE_TAG} as builder
# Copy minimal files to allow backend workspace to be accessed using yarn
COPY ./.yarn ./.yarn
ENV YARN_CACHE_FOLDER=/app/.yarn/cache
COPY ./package.json ./yarn.lock ./.yarnrc.yml ./
COPY ./backend/package.json ./backend/package.json
RUN yarn workspaces focus --production backend 
# Mount .env as secret to not persist after build (passed with docker-compose) and build
# This is required as strapi inlines certain env config into build
# NOTE - mount must be included in every instruction that requires secret
# https://docs.render.com/docker-secrets
RUN --mount=type=secret,id=_env,dst=/backend/.env yarn workspace backend build




FROM node:22.6.0-alpine

RUN apk add --no-cache vips-dev \
    && rm -rf /var/cache/apk/* && rm -rf /tmp/*

# TODO - strapi build size reductions (possible partial node_modules trim)
# https://forum.strapi.io/t/reducing-strapi-docker-image-size/2971/8
# Notably monaco-editor 100+mb only used for import-export-entries plugin

# Could also examine using vercel node-file-trace or ncc compiler
# https://github.com/vercel/nft
# https://www.npmjs.com/package/@vercel/ncc

ENV NODE_ENV=${ENV_NAME}

WORKDIR /app
COPY --from=builder /app/backend .
ENV PATH /app/node_modules/.bin:$PATH
ENV HOST 0.0.0.0
EXPOSE 1337
VOLUME /app/data
CMD ["strapi","start"]


# Alt - via pm2 to run backend

# RUN yarn global add pm2 && yarn cache clean
# CMD ["pm2","start","strapi","--name","strapi","--attach","--","start"]

# debug cmd
# "/bin/ash -c 'while sleep 3600; do :; done'"