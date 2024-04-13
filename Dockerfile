FROM node:20-alpine as builder

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/

RUN npm ci && npm cache clean --force

add . /app

ARG db_host

RUN npm run build

FROM node:20-alpine

WORKDIR /app


COPY --from=builder /app/.output  /app/.output
COPY --from=builder /app/.nuxt  /app/.nuxt

ENV HOST 0.0.0.0 
ENV AUTH_ORIGIN http://localhost:3000/
ENV auth_secret J3kN9zR7oW6bT1fG8qL5sY2xM4dP0hA
EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]
