# NeuroHub - Météo France

Un site web de prévisions météorologiques similaire à Météo France, avec système de vigilance météorologique, carte interactive et données en temps réel.

## 🌤️ Fonctionnalités

### 1. Page d'accueil
- Affichage des conditions météo actuelles (température, état du ciel, humidité, etc.)
- Prévisions sur 5 jours
- Bannière d'alerte pour les niveaux de vigilance météo

### 2. Système de vigilance météorologique
- 4 niveaux d'alerte : Vert, Jaune, Orange, Rouge
- Carte interactive indiquant les alertes par région
- Informations détaillées sur les phénomènes météo

### 3. Carte interactive
- Visualisation des données météo par région (Leaflet.js)
- Coloration selon le niveau de vigilance
- Interaction au clic pour voir les détails locaux

### 4. API Backend
- Endpoints pour données météo actuelles et prévisions
- Gestion complète du système d'alertes (CRUD)
- Intégration avec OpenWeatherMap pour données en temps réel

## 🛠️ Stack Technique

### Frontend
- **React.js** - Interface utilisateur
- **Leaflet.js** - Carte interactive
- **Axios** - Requêtes HTTP
- **CSS3** - Styles et animations

### Backend
- **Node.js** avec **Express.js** - Serveur API
- **MongoDB** avec **Mongoose** - Base de données
- **Axios** - Intégration API externe
- **CORS** - Gestion des origines croisées

### API Externe
- **OpenWeatherMap** - Données météo en temps réel

## 📦 Installation

### Prérequis
- Node.js (v14 ou supérieur)
- MongoDB (optionnel - le système fonctionne avec des données simulées)
- Clé API OpenWeatherMap (gratuite sur [openweathermap.org](https://openweathermap.org/api))

### Backend

```bash
cd backend

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Éditer .env et ajouter votre clé API OpenWeatherMap
# OPENWEATHER_API_KEY=votre_clé_api

# Démarrer le serveur en mode développement
npm run dev

# Ou en mode production
npm start
```

Le serveur démarre sur http://localhost:5000

### Frontend

```bash
cd frontend

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Démarrer l'application React
npm start
```

L'application démarre sur http://localhost:3000

## 🚀 Utilisation

1. **Démarrer le backend** :
   ```bash
   cd backend && npm run dev
   ```

2. **Démarrer le frontend** :
   ```bash
   cd frontend && npm start
   ```

3. **Accéder à l'application** : Ouvrez http://localhost:3000 dans votre navigateur

## 📡 API Endpoints

### Météo

- `GET /api/weather/current/:city` - Météo actuelle pour une ville
- `GET /api/weather/forecast/:city` - Prévisions sur 5 jours
- `GET /api/weather/coordinates?lat=X&lon=Y` - Météo par coordonnées

### Alertes

- `GET /api/alerts` - Liste toutes les alertes actives
- `GET /api/alerts/region/:region` - Alerte pour une région spécifique
- `GET /api/alerts/level/:level` - Alertes par niveau (green, yellow, orange, red)
- `POST /api/alerts` - Créer une nouvelle alerte
- `PUT /api/alerts/:id` - Mettre à jour une alerte
- `DELETE /api/alerts/:id` - Supprimer une alerte

### Santé

- `GET /api/health` - Vérifier l'état du serveur

## 🎨 Captures d'écran

L'interface comprend :
- En-tête avec recherche de ville
- Bannière d'alerte colorée selon le niveau de vigilance
- Carte météo actuelle avec température et détails
- Prévisions sur 5 jours en grille
- Carte interactive avec marqueurs colorés par niveau d'alerte
- Légende des niveaux de vigilance

## 🔧 Configuration

### Variables d'environnement Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/meteo-france
OPENWEATHER_API_KEY=votre_clé_api_openweathermap
```

### Variables d'environnement Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📝 Structure du Projet

```
neurohub/
├── backend/
│   ├── models/
│   │   └── Alert.js
│   ├── routes/
│   │   ├── weather.js
│   │   └── alerts.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AlertBanner.js
│   │   │   ├── WeatherCard.js
│   │   │   ├── ForecastCard.js
│   │   │   ├── WeatherMap.js
│   │   │   └── Header.js
│   │   ├── pages/
│   │   │   └── Home.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🌍 Niveaux de Vigilance

- **🟢 Vert** : Pas de vigilance particulière
- **🟡 Jaune** : Soyez attentif
- **🟠 Orange** : Soyez très vigilant
- **🔴 Rouge** : Vigilance absolue

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

ISC

## 👥 Auteur

NeuroHub Team

## 🙏 Remerciements

- OpenWeatherMap pour les données météo
- OpenStreetMap pour les tuiles cartographiques
- Leaflet.js pour la bibliothèque de cartes
