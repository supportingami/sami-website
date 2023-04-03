# docker build --target frontend --tag sami-website-frontend -f docker\Dockerfile .

FROM sami/base as builder
COPY backend ./backend
RUN yarn workspace backend build


FROM node:16-alpine

# TODO - is this required?
RUN apk add vips-dev
RUN rm -rf /var/cache/apk/*

# TODO - ideally log current env
ARG NODE_ENV=production 
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY --from=builder /app/backend ./app/backend
# ENV PATH /opt/node_modules/.bin:$PATH
EXPOSE 1337
CMD ["yarn", "workspace","backend","start:prod"]