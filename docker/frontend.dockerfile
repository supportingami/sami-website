# docker build --target frontend --tag sami-website-frontend -f docker\Dockerfile .

# Setup Buildx builder
# syntax=docker/dockerfile:1
FROM docker
COPY --from=docker/buildx-bin /buildx /usr/libexec/docker/cli-plugins/docker-buildx
RUN docker buildx version

FROM sami/base as builder
COPY ./frontend ./frontend
RUN yarn workspace frontend build
# RUN yarn build



FROM node:18-alpine as frontend
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/frontend/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/static ./.next/static

# TODO - copy env and get nextjs package json script and trim
# https://nextjs.org/docs/deployment
# https://github.dev/vercel/next.js/tree/canary/examples/with-docker-multi-env
# https://nextjs.org/docs/advanced-features/output-file-tracing

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]

# Debug build process
# docker build --progress=plain --no-cache .