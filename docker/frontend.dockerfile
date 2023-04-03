# docker build --target frontend --tag sami-website-frontend -f docker\Dockerfile .

FROM sami/base as builder
COPY frontend .
RUN yarn workspace frontend build
# RUN yarn build



FROM node:18-alpine as frontend
WORKDIR /app
COPY --from=builder /app/frontend/.next ./
# TODO - copy env and get nextjs package json script and trim
# https://nextjs.org/docs/deployment
# https://github.dev/vercel/next.js/tree/canary/examples/with-docker-multi-env
# https://nextjs.org/docs/advanced-features/output-file-tracing

# # TODO - allow staging build (how to pass env to yarn build script?)
# RUN yarn build

CMD ["/bin/ash"]

# Debug build process
# docker build --progress=plain --no-cache .