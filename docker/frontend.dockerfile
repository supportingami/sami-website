# syntax = docker/dockerfile:1.2
# yarn build --only frontend

# Global args (available to FROM statement also when defined this way)
# https://github.com/docker/cli/issues/2762
ARG BASE_TAG=0.0.0

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
COPY ./frontend/package.json ./frontend/package.json
RUN yarn workspaces focus frontend
# TODO - prune node_modules if not required at runtime
# (although running dev server so still need things like @next/bundle-analyzer)
# Could also examine using vercel node-file-trace or ncc compiler
# https://github.com/vercel/nft
# https://www.npmjs.com/package/@vercel/ncc

# Run app
FROM node:20.7.0-alpine as frontend
WORKDIR /app
# RUN yarn global add pm2 && yarn cache clean

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001

ENV PATH /app/node_modules/.bin:$PATH
COPY --from=builder /app/frontend .
# NOTE
# It is possible to build the application to serve production, however
# this would require both the backend server to be running (and accessible)
# from the docker build container (possibly via `host.docker.internal`), and
# frontend code would need to be configured to still update on each reload
# https://nextjs.org/docs/app/building-your-application/caching#opting-out-1

# TODO - copy env and get nextjs package json script and trim
# https://nextjs.org/docs/deployment
# https://github.dev/vercel/next.js/tree/canary/examples/with-docker-multi-env
# https://nextjs.org/docs/advanced-features/output-file-tracing

# TODO - user and permissions
# USER nextjs
ENV PORT 3000
ENV HOST 0.0.0.0

EXPOSE 3000

CMD ["next","dev"]


# Dev server
# https://github.com/yarnpkg/yarn/issues/6124
# CMD ["pm2","start","next","--name","next","--attach","--","dev"]

# # Debug build process
# # docker build --progress=plain --no-cache .

# debug cmd
# "/bin/ash -c 'while sleep 3600; do :; done'"


# Installing libvips-dev for sharp Compatibility
# RUN apk update && apk add build-base gcc autoconf automake zlib-dev libpng-dev vips-dev && rm -rf /var/cache/apk/* > /dev/null 2>&1
