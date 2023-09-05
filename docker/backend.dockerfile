# yarn scripts docker build -e docker --only backend

# Setup Buildx builder
# syntax=docker/dockerfile:1
FROM docker
COPY --from=docker/buildx-bin /buildx /usr/libexec/docker/cli-plugins/docker-buildx
RUN docker buildx version

FROM sami/base as builder
COPY backend ./backend
# Backend should already be built, so just copy over


# https://docs.strapi.io/dev-docs/installation/docker

FROM node:18-alpine

RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
RUN rm -rf /var/cache/apk/*

# Add pm2 to run backend
RUN yarn global add pm2 && yarn cache clean

ARG ENV_NAME=development 
ENV NODE_ENV=${ENV_NAME}
WORKDIR /app
COPY --from=builder /app/backend .
ENV PATH /app/node_modules/.bin:$PATH
ENV HOST 0.0.0.0
EXPOSE 1337
CMD ["pm2","start", "yarn", "--name","backend","--","start","--attach"]

# debug cmd
# "/bin/ash -c 'while sleep 3600; do :; done'"