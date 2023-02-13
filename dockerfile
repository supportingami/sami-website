# Adapte from
# https://github.dev/vercel/next.js/tree/canary/examples/with-docker-multi-env

FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# TODO - handle install with better caching

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock .yarnrc.yml ./
COPY ./.yarn ./.yarn
# NOTE - can't make an immutable as depends on monorepo child package.jsons
# TODO - consider generate-package-json plugin from nx (applies during build process)
RUN yarn install


# TODO - likely link from root context

# # 2. Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY ./frontend .

# COPY .env.development .env.development
# COPY .env.local .env.local

RUN yarn build

# # 3. Production image, copy all the files and run next
# FROM node:16-alpine AS runner
# WORKDIR /app

# ENV NODE_ENV=production

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001

# COPY --from=builder /app/public ./public

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


# USER nextjs

# EXPOSE 3000

# ENV PORT 3000

# CMD ["node", "server.js"]
