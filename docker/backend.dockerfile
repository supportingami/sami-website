# docker build --target frontend --tag sami/backend -f docker\Dockerfile .
# docker run -it --rm --name sami-backend -p 1337:1337 sami/backend

# Setup Buildx builder
# syntax=docker/dockerfile:1
FROM docker
COPY --from=docker/buildx-bin /buildx /usr/libexec/docker/cli-plugins/docker-buildx
RUN docker buildx version

FROM sami/base as builder
COPY backend ./backend
RUN yarn workspace backend build



# https://docs.strapi.io/dev-docs/installation/docker

FROM node:16-alpine

RUN apk add vips-dev
RUN rm -rf /var/cache/apk/*

# TODO - ideally log current env
ARG NODE_ENV=production 
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY --from=builder /app/backend .
# ENV PATH /opt/node_modules/.bin:$PATH
ENV HOST 0.0.0.0
EXPOSE 1337
CMD ["./node_modules/.bin/strapi","start"]