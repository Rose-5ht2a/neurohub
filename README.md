# NeuroHub - Système de Vigilance Météorologique

Un système complet d'alertes météorologiques pour un monde virtuel, permettant d'alerter les utilisateurs en cas de phénomènes dangereux.

## 🌟 Fonctionnalités

- **Bannière d'alerte** : Affichage visible sur toutes les pages en cas d'alerte critique
- **Carte interactive** : Visualisation des zones affectées avec différents niveaux de vigilance
- **Niveaux de vigilance** : Vert, Jaune, Orange, Rouge
- **Liste des alertes** : Historique et détails de toutes les alertes actives
- **API REST** : Backend pour gérer les alertes

## 🏗️ Architecture

Le projet est divisé en deux parties :

- **Backend** : API REST avec Node.js et Express.js
- **Frontend** : Application React.js avec Leaflet pour la cartographie

## 📋 Prérequis

- Node.js 14+ et npm
- Un navigateur moderne

## 🚀 Installation et Démarrage

### Backend

```bash
cd backend
npm install
npm start
```

Le serveur démarre sur `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm start
```

L'application démarre sur `http://localhost:3000`

## 📡 API Endpoints

### GET /alerts
Récupère toutes les alertes actives

**Réponse :**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "region": "Nord",
      "level": "orange",
      "type": "Vents violents",
      "description": "Vents violents attendus...",
      "coordinates": { "lat": 50.6292, "lng": 3.0573 },
      "timestamp": "2026-01-12T20:00:00.000Z"
    }
  ],
  "count": 1
}
```

### POST /alerts
Crée ou met à jour une alerte

**Corps de la requête :**
```json
{
  "region": "Centre",
  "level": "rouge",
  "type": "Inondations",
  "description": "Fortes pluies causant des inondations",
  "coordinates": { "lat": 47.0, "lng": 2.0 }
}
```

### PUT /alerts/:id
Met à jour une alerte existante

### DELETE /alerts/:id
Supprime une alerte

## 🎨 Technologies Utilisées

### Backend
- **Express.js** : Framework web
- **CORS** : Gestion des requêtes cross-origin
- **Body-parser** : Parsing des requêtes JSON

### Frontend
- **React.js** : Framework UI
- **Leaflet / React-Leaflet** : Cartographie interactive
- **Axios** : Client HTTP pour les appels API
- **CSS3** : Styling responsive

## 🔧 Configuration

### Variables d'environnement

**Backend** (`backend/.env`) :
```
PORT=5000
```

**Frontend** (`.env`) :
```
REACT_APP_API_URL=http://localhost:5000
```

## 📊 Niveaux de Vigilance

| Couleur | Niveau | Description |
|---------|--------|-------------|
| 🟢 Vert | Pas de vigilance | Aucun phénomène dangereux |
| 🟡 Jaune | Soyez attentif | Phénomènes habituels |
| 🟠 Orange | Soyez très vigilant | Phénomènes dangereux |
| 🔴 Rouge | Vigilance absolue | Phénomènes très dangereux |

## 🎯 Exemples d'Alertes

- Vents violents
- Inondations
- Fortes chaleurs
- Tempêtes de neige
- Orages violents
- Avalanches

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📝 Licence

ISC

## 👨‍💻 Auteur

NeuroHub Team