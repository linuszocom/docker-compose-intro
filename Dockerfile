# Steg 1: "Builder-fasen"
FROM node:18-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .
RUN npm test

RUN npm run build


# Steg 2: "Produktions-fasen"
FROM node:18-alpine as production

COPY package.json package-lock.json ./

RUN npm install --only=production

COPY --from=builder /app/build ./build

ENV NODE_ENV production
EXPOSE 3000
CMD ["node", "server.js"]