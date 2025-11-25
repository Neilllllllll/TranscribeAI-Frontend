# Front-end Transcribe AI avec Create React App

Ce projet a été initialisé avec [Create React App](https://github.com/facebook/create-react-app).

### Prérequis 

| Outil   | Version minimale | Vérification    | Installation                                            |
| ------- | ---------------- | --------------- | ------------------------------------------------------- |
| **npm** | `>= 10.9.3`      | `npm --version` | [Télécharger Node.js (inclut npm)](https://nodejs.org/) |


## Récupération du projet en local

#### Créer un dossier pour accueillir le projet

### ``` mkdir Frontend-TranscribeAI```
### ``` cd Frontend-TranscribeAI```

#### Cloner le dépôt Git

### `git clone https://github.com/Neilllllllll/Frontend-TranscribeAI.git`

#### Se déplacer dans le dossier du projet

### `cd Frontend-TranscribeAI`

#### Installer les dépendances

### `npm install`

Le projet est maintenant installé et prêt à être lancé sur votre machine.

## Scripts disponibles

Dans le répertoire du projet, vous pouvez exécuter :

### `npm start`

Lance l’application en mode développement.  
Ouvrez [http://localhost:3000](http://localhost:3000) pour l’afficher dans votre navigateur.

La page se rechargera automatiquement lorsque vous effectuerez des modifications.  
Vous pouvez également voir des erreurs de lint dans la console.

### `npm test`

Lance le test runner en mode surveillance interactive.  
Consultez la section sur [l’exécution des tests](https://facebook.github.io/create-react-app/docs/running-tests) pour plus d’informations.

### `npm run build`

Construit l’application pour la production dans le dossier `build`.  
Le bundling de React est correctement optimisé pour la production et la build est préparée pour offrir les meilleures performances.

Les fichiers générés sont minifiés et leurs noms incluent des hash.  
Votre application est prête à être déployée !

Consultez la section sur le [déploiement]() pour plus d’informations.

## Structure du projet (l'essentiel)

Frontend-TranscribeAI/
├── src/
│   ├── components/
│   │   |── Timer/
│   │   |   ├── Timer.js
│   │   |   └── Timer.styles.js
│   │   └── Transcriber/
│   │       ├── Transcriber.js
│   │       └── Transcriber.styles.js
│   ├── pages/
│   │   |── NotFound
│   │   └── Home
│   ├── utils/
│   │   └── format.js
│   ├── App.js
│   ├── Theme.js
│   └── index.css
│
├── .env
├── package.json
└── README.md

### Description des dossiers

| Dossier / Fichier | Rôle                                                  |
| ----------------- | ----------------------------------------------------- |
| `public/`         | Contient le HTML et le favicon                        |
| `src/`            | Code source du projet React.                          |
| `src/components/` | Composants réutilisables.                             |
| `src/pages/`      | Pages principales                                     |
| `src/utils/`      | Class utilitaires génériques.                         |
| `App.js`          | Page par défaut                                       |
| `.env`            | Variables d’environnement.                            |

# Tâches
- [x] Bouton : Reprendre, Enregistrer, stop et Pause
- [x] Affichage d'un timer lors d'un enregistrement
- [x] Bouton : Téleverser un fichier, télécharger l'audio, exporter
- [x] Zone de message pour : erreur, retranscription en cours, retranscription terminé
- [ ] Faire le componente pour le texte et son affichage
- [ ] Remplacer une chaine de caractère par une autre
- [ ] Page historique des retranscriptions
- [ ] Animation à mettre au début (intro)
- [ ] Vérifier que le README est à jour, compréhensible et fonctionne






