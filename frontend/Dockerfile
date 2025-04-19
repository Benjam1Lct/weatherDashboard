# frontend/Dockerfile
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Serveur statique
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Fichier de conf nginx optionnel
EXPOSE 80
