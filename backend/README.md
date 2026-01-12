# NeuroHub Backend API

API REST pour le système de vigilance météorologique.

## Installation

```bash
npm install
```

## Démarrage

```bash
# Production
npm start

# Développement (avec auto-reload)
npm run dev
```

Le serveur démarre sur le port 5000 par défaut.

## Endpoints API

### GET /health
Vérification de l'état du serveur

### GET /alerts
Récupère toutes les alertes

### GET /alerts/:id
Récupère une alerte spécifique

### POST /alerts
Crée ou met à jour une alerte

**Body:**
```json
{
  "region": "string",
  "level": "vert|jaune|orange|rouge",
  "type": "string",
  "description": "string",
  "coordinates": { "lat": number, "lng": number }
}
```

### PUT /alerts/:id
Met à jour une alerte existante

### DELETE /alerts/:id
Supprime une alerte

## Structure des Données

Une alerte contient :
- `id`: Identifiant unique
- `region`: Nom de la région
- `level`: Niveau de vigilance (vert, jaune, orange, rouge)
- `type`: Type de phénomène
- `description`: Description détaillée
- `coordinates`: Coordonnées géographiques { lat, lng }
- `timestamp`: Date/heure de création/modification

## Stockage

Les alertes sont stockées en mémoire. Pour une utilisation en production, il est recommandé d'ajouter une base de données (MongoDB, PostgreSQL, etc.).
