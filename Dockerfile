# Utiliser l'image officielle de Node.js pour le build
FROM node:16-alpine AS build

WORKDIR /app

# Copier le package.json et installer les dépendances
COPY package.json ./
RUN npm install

# Copier tous les fichiers source et construire l'application React
COPY . ./
RUN npm run build

# Utiliser une image Nginx pour servir l'application
FROM nginx:stable-alpine

# Copier les fichiers de build dans le répertoire public de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Vérifier que le fichier index.html existe dans le conteneur
RUN ls -l /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
