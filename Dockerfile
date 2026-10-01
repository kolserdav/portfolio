FROM node:lts-alpine3.23 AS builder

WORKDIR /app

COPY . .

RUN npm i
RUN  npm run build

FROM node:lts-alpine3.23 AS runtime

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.env ./

CMD ["npm", "run", "start"]

