# NeuroHub Météo - Site Météo Autonome

Un site météo complet et autonome, similaire à Météo France, avec toutes les données météorologiques simulées en interne (sans dépendance à une API externe).

## 🌟 Fonctionnalités

### 1. Page d'accueil
- Conditions météo actuelles pour plusieurs villes/régions françaises
- Prévisions sur 5 jours pour chaque ville
- Bannière d'alerte météo avec niveaux de vigilance (Vert, Jaune, Orange, Rouge)

### 2. Système de vigilance météorologique
- Gestion des niveaux de vigilance météo (Vert, Jaune, Orange, Rouge)
- Affichage des alertes par région avec détails complets
- Interface pour ajouter, modifier ou supprimer manuellement les alertes météo

### 3. Carte interactive
- Visualisation des régions françaises avec températures et alertes
- Code couleur par niveau de vigilance
- Intégration avec Leaflet.js pour une expérience interactive
- Popup d'informations détaillées pour chaque ville

### 4. Pages de région/ville
- Conditions météo détaillées : température, ressenti, humidité, vent, pluie, pression, etc.
- Prévisions détaillées sur 5 jours
- Historique et informations géographiques

### 5. Backend local
- Serveur Express.js pour servir les données simulées
- API RESTful complète avec endpoints pour météo et vigilance
- Stockage des données dans des fichiers JSON
- Possibilité de modifier les alertes en temps réel

### 6. Frontend moderne
- Application React.js avec routing
- Interface utilisateur moderne et responsive
- Intégration complète des données backend
- Design élégant avec dégradés et animations

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (v14 ou supérieur)
- npm ou yarn

### Installation

1. **Cloner le repository**
```bash
git clone https://github.com/Rose-5ht2a/neurohub.git
cd neurohub
```

2. **Installer les dépendances du backend**
```bash
cd backend
npm install
```

3. **Installer les dépendances du frontend**
```bash
cd ../frontend
npm install
```

### Démarrage

1. **Démarrer le serveur backend** (dans le dossier `backend`)
```bash
npm start
# Le serveur démarre sur http://localhost:5000
```

2. **Démarrer l'application frontend** (dans le dossier `frontend`, dans un nouveau terminal)
```bash
npm start
# L'application démarre sur http://localhost:3000
```

L'application devrait s'ouvrir automatiquement dans votre navigateur à l'adresse `http://localhost:3000`.

## 📁 Structure du Projet

```
neurohub/
├── backend/
│   ├── data/
│   │   ├── weather-data.json      # Données météo simulées
│   │   └── vigilance-data.json    # Données de vigilance
│   ├── src/
│   │   └── server.js              # Serveur Express
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/            # Composants réutilisables
│   │   │   ├── Header.js
│   │   │   ├── WeatherCard.js
│   │   │   ├── AlertBanner.js
│   │   │   └── AlertForm.js
│   │   ├── pages/                 # Pages principales
│   │   │   ├── HomePage.js
│   │   │   ├── CityPage.js
│   │   │   ├── VigilancePage.js
│   │   │   └── MapPage.js
│   │   ├── services/              # Services API
│   │   │   └── api.js
│   │   ├── styles/                # Fichiers CSS
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Météo
- `GET /api/weather` - Récupérer toutes les données météo
- `GET /api/weather/:cityId` - Récupérer les données d'une ville spécifique

### Vigilance
- `GET /api/vigilance/alerts` - Récupérer toutes les alertes
- `GET /api/vigilance/alerts/:region` - Récupérer les alertes d'une région
- `GET /api/vigilance/regions` - Récupérer l'état de vigilance de toutes les régions
- `GET /api/vigilance/regions/:regionId` - Récupérer l'état d'une région spécifique
- `POST /api/vigilance/alerts` - Créer une nouvelle alerte
- `PUT /api/vigilance/alerts/:id` - Modifier une alerte existante
- `DELETE /api/vigilance/alerts/:id` - Supprimer une alerte
- `PUT /api/vigilance/regions/:regionId` - Modifier le niveau de vigilance d'une région

## 🎨 Technologies Utilisées

### Backend
- **Express.js** - Framework web Node.js
- **CORS** - Gestion des requêtes cross-origin
- **Node.js** - Environnement d'exécution JavaScript

### Frontend
- **React.js** - Bibliothèque UI
- **React Router** - Gestion du routing
- **Leaflet.js** - Bibliothèque de cartographie interactive
- **React-Leaflet** - Intégration React pour Leaflet
- **Axios** - Client HTTP pour les requêtes API
- **CSS3** - Styles modernes avec animations

## 📝 Villes Incluses

Le site inclut les données météo pour les villes suivantes :
- Paris (Île-de-France)
- Marseille (Provence-Alpes-Côte d'Azur)
- Lyon (Auvergne-Rhône-Alpes)
- Toulouse (Occitanie)
- Bordeaux (Nouvelle-Aquitaine)

## 🗺️ Régions Couvertes

Toutes les régions métropolitaines françaises sont incluses dans le système de vigilance :
- Île-de-France
- Provence-Alpes-Côte d'Azur
- Auvergne-Rhône-Alpes
- Occitanie
- Nouvelle-Aquitaine
- Grand Est
- Hauts-de-France
- Normandie
- Bretagne
- Pays de la Loire
- Centre-Val de Loire
- Bourgogne-Franche-Comté
- Corse

## 🔧 Personnalisation

### Modifier les données météo
Éditez le fichier `backend/data/weather-data.json` pour modifier les conditions météo des villes.

### Ajouter/Modifier des alertes
Utilisez l'interface web (page Vigilance) ou éditez directement `backend/data/vigilance-data.json`.

### Ajouter de nouvelles villes
Ajoutez de nouvelles entrées dans `weather-data.json` en suivant le format existant.

## 📄 Licence

MIT

## 👥 Auteur

NeuroHub Team