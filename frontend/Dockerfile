# Steg 1: BUILD-fasen (Bygger appen med Vite)
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build 

# Steg 2: PRODUCTION-fasen (Serverar appen med Nginx)
FROM nginx:alpine as production

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

