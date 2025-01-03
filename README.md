# Catalogue de Jeux Vidéo

## Description
Ce projet est une application web interactive développée en **TypeScript**, permettant de gérer un catalogue de jeux vidéo. Il inclut des fonctionnalités d'affichage, d'ajout, de suppression, de tri et de recherche. L'application utilise une **architecture MVC** (Modèle-Vue-Contrôleur) pour garantir une structure modulaire et maintenable.

---

## Fonctionnalités
- **Affichage des jeux** avec des informations détaillées (titre, studio, plateforme, date de sortie, description).
- **Ajout de jeux** avec un formulaire dynamique.
- **Suppression des jeux** avec gestion des événements pour éviter les conflits.
- **Recherche en temps réel** dans le catalogue.
- **Tri dynamique** des jeux par titre et date (croissant et décroissant).
- **Données stockées en JSON** et chargées dynamiquement.

---

## Technologies utilisées
- **TypeScript** : Langage principal pour la logique métier.
- **HTML/CSS** : Interface utilisateur et mise en page.
- **JSON** : Stockage des données.
- **Visual Studio Code** : IDE de développement.
- **Node.js** : Gestion des modules et des dépendances.
- **Live Server** : Serveur local pour le développement.

---

## Installation

### Prérequis
- **Node.js** et **npm** doivent être installés.
- **Visual Studio Code** ou un autre éditeur de code.

### Étapes d'installation
1. **Cloner le dépôt Git** :
   ```bash
   git clone <URL-du-dépôt>
   cd projet-catalogue
   ```
2. **Installer les dépendances** :
   ```bash
   npm install
   ```
3. **Compiler le projet** :
   ```bash
   npx tsc
   ```
4. **Lancer le serveur local** :
   ```bash
   npx serve
   ```
5. **Ouvrir l'application** :
   Accédez à l'URL fournie par le serveur (par exemple, http://localhost:5000).

---

## Utilisation
1. **Ajouter un jeu** : Remplissez le formulaire et cliquez sur "Ajouter".
2. **Rechercher un jeu** : Tapez un mot-clé dans la barre de recherche.
3. **Trier les jeux** : Utilisez le menu déroulant pour choisir un ordre de tri.
4. **Supprimer un jeu** : Cliquez sur le bouton "Retirer" pour supprimer un jeu.

---

## Structure du projet
```
projet-catalogue/
├── dist/                    # Fichiers compilés
├── src/                     # Fichiers source
│   ├── controllers/         # Logique métier
│   │   ├── GameController.ts
│   ├── models/              # Modèles de données
│   │   ├── JeuVideo.ts
│   ├── views/               # Gestion de l'affichage
│   │   ├── GameView.ts
│   ├── index.ts             # Point d'entrée principal
├── data/                    # Fichiers JSON
│   ├── jeux.json
├── package.json             # Gestion des dépendances
├── tsconfig.json            # Configuration TypeScript
├── README.md                # Documentation
```

---

## Améliorations futures
- **Tests unitaires avec Jest** pour valider les fonctionnalités.
- **Sauvegarde dynamique dans un fichier JSON** pour conserver les modifications.
- **Gestion des utilisateurs** avec bibliothèques personnalisées.
- **Optimisation CSS** pour un rendu plus moderne et responsive.

---

## Auteur
Robin - Projet scolaire basé sur un catalogue de jeux vidéo avec une architecture MVC.

---

## Licence
Ce projet est sous licence MIT.

