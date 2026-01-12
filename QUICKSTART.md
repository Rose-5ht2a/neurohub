# Quick Start Guide - NeuroHub Météo

## Installation rapide

### Prérequis
- Node.js v14 ou supérieur
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone https://github.com/Rose-5ht2a/neurohub.git
cd neurohub
```

2. **Installer et démarrer le backend**
```bash
cd backend
npm install
npm start
```
Le serveur démarre sur http://localhost:5000

3. **Dans un nouveau terminal, installer et démarrer le frontend**
```bash
cd frontend
npm install
npm start
```
L'application s'ouvre automatiquement sur http://localhost:3000

## Utilisation

### Navigation
- **Accueil** : Vue d'ensemble des conditions météo actuelles
- **Carte** : Visualisation interactive des régions et vigilances
- **Vigilance** : Gestion des alertes météorologiques

### Gestion des alertes
1. Aller sur la page "Vigilance"
2. Cliquer sur "+ Ajouter une alerte"
3. Remplir le formulaire avec les informations de l'alerte
4. Cliquer sur "Créer l'alerte"

Pour supprimer une alerte, cliquer sur l'icône 🗑️ sur la carte de l'alerte.

## Structure des données

### Villes incluses
- Paris (Île-de-France)
- Marseille (Provence-Alpes-Côte d'Azur)
- Lyon (Auvergne-Rhône-Alpes)
- Toulouse (Occitanie)
- Bordeaux (Nouvelle-Aquitaine)

### Niveaux de vigilance
- 🟢 **Vert** : Pas de vigilance particulière
- 🟡 **Jaune** : Soyez attentifs
- 🟠 **Orange** : Soyez très vigilants
- 🔴 **Rouge** : Vigilance absolue

## API Endpoints

### Weather
- `GET /api/weather` - Toutes les villes
- `GET /api/weather/:cityId` - Une ville spécifique

### Vigilance
- `GET /api/vigilance/alerts` - Toutes les alertes
- `GET /api/vigilance/regions` - Toutes les régions
- `POST /api/vigilance/alerts` - Créer une alerte
- `PUT /api/vigilance/alerts/:id` - Modifier une alerte
- `DELETE /api/vigilance/alerts/:id` - Supprimer une alerte

## Personnalisation

### Modifier les données météo
Éditez `backend/data/weather-data.json`

### Ajouter une ville
Ajoutez une nouvelle entrée dans `weather-data.json` :
```json
{
  "id": "nice",
  "name": "Nice",
  "region": "Provence-Alpes-Côte d'Azur",
  "coordinates": { "lat": 43.7102, "lon": 7.2620 },
  "current": { ... },
  "forecast": [ ... ]
}
```

### Modifier les alertes
Éditez `backend/data/vigilance-data.json` ou utilisez l'interface web

## Dépannage

### Le backend ne démarre pas
- Vérifiez que le port 5000 n'est pas déjà utilisé
- Vérifiez que Node.js est installé : `node --version`

### Le frontend ne se connecte pas au backend
- Vérifiez que le backend est bien démarré sur le port 5000
- Vérifiez l'URL de l'API dans `frontend/src/services/api.js`

### La carte ne s'affiche pas
- Vérifiez votre connexion internet (pour les tuiles OpenStreetMap)
- Les markers et cercles devraient être visibles même sans tuiles

## Support

Pour toute question ou problème, créez une issue sur GitHub.
