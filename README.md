# NeuroHub - Weather Visualization Application

Une application web simple pour visualiser des données météorologiques dans un monde virtuel.

## Structure du Projet

```
neurohub/
├── backend/          # API Node.js/Express.js
│   ├── server.js     # Serveur principal avec endpoints API
│   └── package.json  # Dépendances backend
├── frontend/         # Application React.js
│   ├── src/
│   │   ├── components/  # Composants React
│   │   ├── App.js       # Composant principal
│   │   └── index.js     # Point d'entrée
│   └── package.json     # Dépendances frontend
└── README.md
```

## Fonctionnalités

### Backend (Node.js/Express.js)
- API RESTful pour les données météorologiques
- Endpoints pour récupérer les données de toutes les villes ou d'une ville spécifique
- Données météo pour 5 villes : Paris, Tokyo, New York, Londres, Sydney
- CORS activé pour l'intégration frontend

### Frontend (React.js)
- Dashboard météo moderne et responsive
- Affichage des conditions météorologiques actuelles
- Cartes avec dégradés pour chaque ville
- Fonctionnalité de rafraîchissement
- Gestion des états de chargement et d'erreur

## Installation et Démarrage

### Prérequis
- Node.js (v14 ou supérieur)
- npm

### Backend

```bash
cd backend
npm install
npm start
```

Le serveur démarrera sur http://localhost:3001

### Frontend

```bash
cd frontend
npm install
npm start
```

L'application démarrera sur http://localhost:3000

## API Endpoints

- `GET /api/health` - Vérification de l'état du serveur
- `GET /api/weather` - Récupérer toutes les données météo
- `GET /api/weather/:city` - Récupérer les données météo d'une ville spécifique

Villes disponibles: `paris`, `tokyo`, `new-york`, `london`, `sydney`

## Technologies Utilisées

- **Frontend**: React.js, CSS3
- **Backend**: Node.js, Express.js
- **Communication**: REST API, CORS

## Développement

Le projet est structuré pour faciliter le développement et la maintenance:
- Séparation claire entre frontend et backend
- Composants React modulaires et réutilisables
- API simple et extensible

## Licence

ISC
