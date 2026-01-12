# Guide de Déploiement - NeuroHub

Ce guide explique comment déployer l'application NeuroHub en développement et en production.

## Table des Matières
1. [Développement Local](#développement-local)
2. [Déploiement en Production](#déploiement-en-production)
3. [Variables d'Environnement](#variables-denvironnement)
4. [Recommandations](#recommandations)

---

## Développement Local

### Prérequis
- Node.js 14 ou supérieur
- npm 6 ou supérieur
- Git

### Installation

1. **Cloner le repository**
```bash
git clone https://github.com/Rose-5ht2a/neurohub.git
cd neurohub
```

2. **Installer le backend**
```bash
cd backend
npm install
cp .env.example .env
# Modifier .env si nécessaire
```

3. **Installer le frontend**
```bash
cd ../frontend
npm install
cp .env.example .env
# Modifier .env si nécessaire
```

### Démarrage en Développement

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# ou pour le mode développement avec auto-reload:
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

L'application sera accessible sur:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## Déploiement en Production

### Backend

#### Option 1: Serveur Node.js

1. **Build et préparation**
```bash
cd backend
npm install --production
```

2. **Utiliser PM2 pour la gestion de processus**
```bash
npm install -g pm2
pm2 start server.js --name neurohub-api
pm2 save
pm2 startup
```

3. **Configuration Nginx (reverse proxy)**
```nginx
server {
    listen 80;
    server_name api.neurohub.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Option 2: Docker

1. **Créer un Dockerfile pour le backend**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

2. **Build et run**
```bash
docker build -t neurohub-backend .
docker run -d -p 5000:5000 --name neurohub-api neurohub-backend
```

### Frontend

#### Option 1: Build statique avec Nginx

1. **Build l'application**
```bash
cd frontend
npm run build
```

2. **Configuration Nginx**
```nginx
server {
    listen 80;
    server_name neurohub.com;
    root /var/www/neurohub/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Configuration pour les fichiers statiques
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

3. **Déployer les fichiers**
```bash
sudo mkdir -p /var/www/neurohub
sudo cp -r build/* /var/www/neurohub/
sudo chown -R www-data:www-data /var/www/neurohub
```

#### Option 2: Services d'hébergement

**Vercel (Recommandé pour React)**
```bash
npm install -g vercel
cd frontend
vercel --prod
```

**Netlify**
```bash
npm install -g netlify-cli
cd frontend
npm run build
netlify deploy --prod --dir=build
```

#### Option 3: Docker

1. **Créer un Dockerfile pour le frontend**
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **Build et run**
```bash
docker build -t neurohub-frontend .
docker run -d -p 80:80 --name neurohub-web neurohub-frontend
```

---

## Variables d'Environnement

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
```

### Frontend (.env.production)
```env
REACT_APP_API_URL=https://api.neurohub.com
```

---

## Recommandations

### Sécurité

1. **HTTPS**: Utilisez toujours HTTPS en production (Let's Encrypt gratuit)
```bash
sudo certbot --nginx -d neurohub.com -d api.neurohub.com
```

2. **CORS**: Limitez les origines autorisées dans le backend
```javascript
app.use(cors({
  origin: ['https://neurohub.com'],
  credentials: true
}));
```

3. **Rate Limiting**: Ajoutez un rate limiter
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite par IP
});
app.use('/alerts', limiter);
```

### Base de Données

Pour la production, remplacez le stockage en mémoire par une vraie base de données:

**MongoDB:**
```bash
npm install mongoose
```

**PostgreSQL:**
```bash
npm install pg
```

### Monitoring

1. **PM2 Monitoring**
```bash
pm2 monitor
```

2. **Logs**
```bash
pm2 logs neurohub-api
```

### Sauvegarde

Mettez en place une stratégie de sauvegarde pour votre base de données.

### Performance

1. **Compression**: Ajoutez la compression gzip
```bash
npm install compression
```

```javascript
const compression = require('compression');
app.use(compression());
```

2. **Caching**: Utilisez Redis pour le cache
```bash
npm install redis
```

---

## Docker Compose

Pour déployer l'ensemble du stack:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
    restart: always

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: always
```

```bash
docker-compose up -d
```

---

## Mise à Jour

1. **Pull les dernières modifications**
```bash
git pull origin main
```

2. **Backend**
```bash
cd backend
npm install
pm2 restart neurohub-api
```

3. **Frontend**
```bash
cd frontend
npm install
npm run build
# Copier les nouveaux fichiers build
```

---

## Support

Pour toute question ou problème, ouvrez une issue sur GitHub.
