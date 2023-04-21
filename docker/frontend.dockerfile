# docker build --target frontend --tag sami-website-frontend -f docker\Dockerfile .

# Setup Buildx builder
FROM docker
COPY --from=docker/buildx-bin /buildx /usr/libexec/docker/cli-plugins/docker-buildx
RUN docker buildx version

# Build frontend
FROM sami/base as builder
COPY ./frontend ./frontend
RUN yarn workspace frontend build:standalone




# Run app
FROM node:18-alpine as frontend
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

ENV PATH /app/node_modules/.bin:$PATH

COPY --from=builder /app/frontend/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/standalone/frontend ./
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/static ./.next/static

# TODO - copy env and get nextjs package json script and trim
# https://nextjs.org/docs/deployment
# https://github.dev/vercel/next.js/tree/canary/examples/with-docker-multi-env
# https://nextjs.org/docs/advanced-features/output-file-tracing

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOST 0.0.0.0

CMD ["node", "server.js"]

# # Debug build process
# # docker build --progress=plain --no-cache .

# debug cmd
# "/bin/ash -c 'while sleep 3600; do :; done'"