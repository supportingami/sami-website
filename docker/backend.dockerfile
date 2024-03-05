# yarn scripts docker build --only backend

# Global args (available to FROM statement also when defined this way)
# https://github.com/docker/cli/issues/2762
ARG BASE_TAG=0.0.0
ARG ENV_NAME=development 

# Setup Buildx builder
# syntax=docker/dockerfile:1
FROM docker
COPY --from=docker/buildx-bin /buildx /usr/libexec/docker/cli-plugins/docker-buildx
RUN docker buildx version

# Use extra step just to copy base image files as cannot pass variable to `COPY --from` statement
FROM samicharity/base:${BASE_TAG} as builder
WORKDIR /app
# TODO - prune node_modules if not required at runtime
COPY . .

# Backend should already be built, so just copy over
# https://docs.strapi.io/dev-docs/installation/docker

FROM node:20-alpine

RUN apk add --no-cache vips-dev \
    && rm -rf /var/cache/apk/* && rm -rf /tmp/*


ENV NODE_ENV=${ENV_NAME}

WORKDIR /app
COPY --from=builder /app/backend/ ./
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