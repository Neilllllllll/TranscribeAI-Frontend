# Stage 1: Build de l'app React
FROM node:18 AS build

WORKDIR /app

# Déclarer les arguments
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_API_KEY

# Les transformer en variables d'env pour le processus de build
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
ENV REACT_APP_API_KEY=$REACT_APP_API_KEY

COPY package.json package-lock.json ./

RUN npm install

COPY . .

WORKDIR /app

RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80