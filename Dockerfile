# Build Stage 1
FROM node:16-alpine AS builder
WORKDIR /usr/src/app
COPY . .
RUN npm ci && npm run build && npm prune --production

# Build Stage 2
FROM node:16-alpine
WORKDIR /home/site/wwwroot
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
CMD [ "node", "./dist/index" ]
