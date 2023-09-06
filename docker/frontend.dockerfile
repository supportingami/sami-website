# docker build --target frontend --tag sami-website-frontend -f docker\Dockerfile .

# Global args (available to FROM statement also when defined this way)
# https://github.com/docker/cli/issues/2762
ARG BASE_TAG=0.0.0

# Setup Buildx builder
FROM docker
COPY --from=docker/buildx-bin /buildx /usr/libexec/docker/cli-plugins/docker-buildx
RUN docker buildx version

# Use extra step just to copy base image files as cannot pass variable to `COPY --from` statement
FROM sami/base:${BASE_TAG} as builder
WORKDIR /app
# TODO - prune node_modules if not required at runtime
COPY . .

# Run app
FROM node:18-alpine as frontend
WORKDIR /app
RUN yarn global add pm2 && yarn cache clean

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001

ENV PATH /app/node_modules/.bin:$PATH
COPY --from=builder /app/frontend/ ./

# TODO - copy env and get nextjs package json script and trim
# https://nextjs.org/docs/deployment
# https://github.dev/vercel/next.js/tree/canary/examples/with-docker-multi-env
# https://nextjs.org/docs/advanced-features/output-file-tracing

# TODO - user and permissions
# USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOST 0.0.0.0

# Dev server
# https://github.com/yarnpkg/yarn/issues/6124
CMD ["pm2","start","next","--name","next","--attach","--","dev"]

# # Debug build process
# # docker build --progress=plain --no-cache .

# debug cmd
# "/bin/ash -c 'while sleep 3600; do :; done'"


# Installing libvips-dev for sharp Compatibility
# RUN apk update && apk add build-base gcc autoconf automake zlib-dev libpng-dev vips-dev && rm -rf /var/cache/apk/* > /dev/null 2>&1
