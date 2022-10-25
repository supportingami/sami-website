# Setup Buildx builder
# syntax=docker/dockerfile:1
FROM docker
COPY --from=docker/buildx-bin /buildx /usr/libexec/docker/cli-plugins/docker-buildx
RUN docker buildx version

FROM node:16-alpine as build
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add build-base gcc autoconf automake zlib-dev libpng-dev vips-dev && rm -rf /var/cache/apk/* > /dev/null 2>&1
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./package.json ./
# ./yarn.lock ./
ENV PATH /opt/node_modules/.bin:$PATH
# Install - use ignore-engines to ignore node 16 incompatibility from strapi-connector-bookshelf@3.6.10
RUN yarn config set network-timeout 600000 -g && yarn install --ignore-engines
WORKDIR /opt/app
COPY ./ .
RUN yarn build


FROM node:16-alpine
RUN apk add vips-dev
RUN rm -rf /var/cache/apk/*
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/app
COPY --from=build /opt/node_modules ./node_modules
ENV PATH /opt/node_modules/.bin:$PATH
COPY --from=build /opt/app ./
EXPOSE 1337
CMD ["yarn", "start:prod"]