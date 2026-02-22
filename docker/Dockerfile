# Stage 1: Build de l'app React
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# On supprime la config par défaut
RUN rm /etc/nginx/conf.d/default.conf

# On copie notre config personnalisée
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

COPY --from=build /app/public/env.template.js /usr/share/nginx/html/env.template.js
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]