# docker build --target frontend --tag sami/backend -f docker\Dockerfile .
# docker run -it --rm --name sami-backend -p 1337:1337 sami/backend

# Setup Buildx builder
# syntax=docker/dockerfile:1
FROM docker
COPY --from=docker/buildx-bin /buildx /usr/libexec/docker/cli-plugins/docker-buildx
RUN docker buildx version

FROM sami/base as builder
COPY backend ./backend

ARG ENV_NAME=production 
ENV NODE_ENV=${ENV_NAME}
RUN yarn workspace backend build



# https://docs.strapi.io/dev-docs/installation/docker

FROM node:18-alpine

RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
RUN rm -rf /var/cache/apk/*

ARG ENV_NAME=production 
ENV NODE_ENV=${ENV_NAME}
WORKDIR /app
COPY --from=builder /app/backend .
ENV PATH /app/node_modules/.bin:$PATH
ENV HOST 0.0.0.0
EXPOSE 1337
CMD ["strapi","start"]

# debug cmd
# "/bin/ash -c 'while sleep 3600; do :; done'"