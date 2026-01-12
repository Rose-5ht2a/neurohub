# NeuroHub Frontend

Interface web pour le système de vigilance météorologique.

## Installation

```bash
npm install
```

## Démarrage

```bash
npm start
```

L'application sera disponible sur http://localhost:3000

## Build

```bash
npm run build
```

## Composants

### AlertBanner
Bannière d'alerte affichée en haut de page pour les alertes critiques (orange et rouge).

### AlertMap
Carte interactive affichant les zones géographiques avec leurs alertes via Leaflet.

### AlertLegend
Légende expliquant les différents niveaux de vigilance.

### AlertList
Liste de toutes les alertes actives avec leurs détails.

## Configuration

Créez un fichier `.env` pour configurer l'URL de l'API :

```
REACT_APP_API_URL=http://localhost:5000
```

## Technologies

- React 18
- Leaflet & React-Leaflet
- Axios
- CSS3

## Structure

```
src/
  components/
    AlertBanner.js/css
    AlertMap.js/css
    AlertLegend.js/css
    AlertList.js/css
  App.js/css
  index.js
```
