# Déploiement sur Vercel

Ce guide explique comment déployer l'application NeuroHub Météo sur Vercel (plateforme de déploiement gratuite).

## Prérequis

- Un compte Vercel (gratuit) : [vercel.com](https://vercel.com)
- Un compte GitHub (le code doit être sur GitHub)
- Vercel CLI installé (optionnel) : `npm install -g vercel`

## Méthode 1 : Déploiement via l'interface web Vercel (Recommandé)

### Étape 1 : Déployer le Backend

1. **Connectez-vous à Vercel** : [vercel.com/login](https://vercel.com/login)

2. **Créer un nouveau projet** :
   - Cliquez sur "Add New..." → "Project"
   - Importez votre repository GitHub `Rose-5ht2a/neurohub`
   - Sélectionnez le repository

3. **Configurer le Backend** :
   - **Project Name** : `neurohub-backend` (ou un nom de votre choix)
   - **Framework Preset** : Other
   - **Root Directory** : `backend`
   - **Build Command** : Laissez vide
   - **Output Directory** : Laissez vide
   - **Install Command** : `npm install`
   
4. **Variables d'environnement** : Aucune nécessaire pour l'instant

5. **Déployer** : Cliquez sur "Deploy"

6. **Notez l'URL** : Une fois déployé, notez l'URL (ex: `https://neurohub-backend.vercel.app`)

### Étape 2 : Déployer le Frontend

1. **Créer un nouveau projet** dans Vercel :
   - Cliquez sur "Add New..." → "Project"
   - Sélectionnez le même repository `Rose-5ht2a/neurohub`

2. **Configurer le Frontend** :
   - **Project Name** : `neurohub-frontend` (ou un nom de votre choix)
   - **Framework Preset** : Create React App
   - **Root Directory** : `frontend`
   - **Build Command** : `npm run build`
   - **Output Directory** : `build`
   - **Install Command** : `npm install`

3. **Ajouter une variable d'environnement** :
   - Cliquez sur "Environment Variables"
   - Ajoutez :
     - **Name** : `REACT_APP_API_URL`
     - **Value** : `https://neurohub-backend.vercel.app/api` (l'URL de votre backend notée à l'étape 1)

4. **Déployer** : Cliquez sur "Deploy"

5. **Accéder à votre site** : Une fois déployé, votre site sera accessible (ex: `https://neurohub-frontend.vercel.app`)

## Méthode 2 : Déploiement via CLI

### Installation de Vercel CLI

```bash
npm install -g vercel
```

### Déployer le Backend

```bash
cd backend
vercel

# Suivez les instructions :
# - Connectez-vous à votre compte Vercel
# - Link to existing project? No
# - What's your project's name? neurohub-backend
# - In which directory is your code located? ./
# - Want to override the settings? No
```

Une fois déployé, notez l'URL du backend.

### Déployer le Frontend

```bash
cd ../frontend

# Créer un fichier .env.production avec l'URL du backend
echo "REACT_APP_API_URL=https://votre-backend-url.vercel.app/api" > .env.production

# Déployer
vercel

# Suivez les instructions :
# - Link to existing project? No
# - What's your project's name? neurohub-frontend
# - In which directory is your code located? ./
# - Want to override the settings? No
```

## Configuration Post-Déploiement

### Mettre à jour l'URL du Backend

Si vous avez oublié de configurer `REACT_APP_API_URL` :

1. Allez dans votre projet frontend sur Vercel
2. Cliquez sur "Settings" → "Environment Variables"
3. Ajoutez : `REACT_APP_API_URL` avec la valeur de l'URL de votre backend
4. Redéployez le frontend (onglet "Deployments" → "..." → "Redeploy")

### Configuration du CORS (si nécessaire)

Le backend est déjà configuré avec CORS. Si vous rencontrez des problèmes :

1. Modifiez `backend/src/server.js` pour ajouter l'URL de votre frontend :

```javascript
const cors = require('cors');
app.use(cors({
  origin: 'https://votre-frontend-url.vercel.app'
}));
```

## Domaine Personnalisé (Optionnel)

1. Dans Vercel, allez dans "Settings" → "Domains"
2. Ajoutez votre domaine personnalisé
3. Suivez les instructions pour configurer les DNS

## Limitations de Vercel (Plan Gratuit)

- **Fonctions Serverless** : Le backend fonctionnera comme une fonction serverless
- **Timeout** : 10 secondes maximum par requête
- **Bande passante** : 100 GB/mois
- **Builds** : 100 heures/mois

**Note importante** : Les données JSON ne sont PAS persistantes sur Vercel avec des fonctions serverless. Les modifications d'alertes seront perdues après chaque redéploiement ou redémarrage. Pour une persistance réelle, il faudrait utiliser une base de données (MongoDB, PostgreSQL, etc.).

## Alternative : Déploiement avec Base de Données

Pour une solution production avec persistance des données, considérez :

1. **Backend** : Deployer sur Vercel avec une base de données MongoDB Atlas (gratuit)
2. **Frontend** : Deployer sur Vercel

Voir le fichier `VERCEL-DATABASE.md` pour plus de détails (à créer si nécessaire).

## Dépannage

### Le frontend ne se connecte pas au backend

- Vérifiez que `REACT_APP_API_URL` est bien configurée
- Vérifiez que l'URL du backend est correcte (avec `/api` à la fin)
- Redéployez le frontend après avoir modifié les variables d'environnement

### Erreurs CORS

- Vérifiez que le backend accepte les requêtes depuis votre domaine frontend
- Consultez les logs Vercel pour voir les erreurs exactes

### Données perdues après redéploiement

- C'est normal avec le système de fichiers serverless
- Implémentez une base de données pour la persistance

## Support

Pour plus d'informations sur Vercel :
- Documentation : [vercel.com/docs](https://vercel.com/docs)
- Guide React : [vercel.com/guides/deploying-react-with-vercel](https://vercel.com/guides/deploying-react-with-vercel)
