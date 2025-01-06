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

## Utilisations 
- Au chargement de la page : Aucun compte n’est connecté. Trois jeux sont affichés par défaut depuis jeux.json. Dans ce mode "anonyme", les modifications ne sont pas enregistrées.
- Connexion à un compte existant (défini dans users.json) : La bibliothèque de l’utilisateur est chargée une seule fois depuis bibliotheque.json. Ensuite, la bibliothèque est gérée via localStorage pour sauvegarder les modifications (ajout ou suppression de jeux).
- Création de compte : Les nouveaux comptes sont enregistrés dans localStorage. Leur bibliothèque est initialement vide et sera sauvegardée dans localStorage lors d’ajouts ou de suppressions de jeux.
- Déconnexion / Reconnexion : Les changements restent persistants grâce à la sauvegarde en localStorage.
- Tri et recherche de jeux : Possibilité de filtrer et trier la liste de jeux.

## Structure

- **assets/**
  - `style.css`
- **data/**
  - `users.json`
  - `bibliotheque.json`
  - `jeux.json`
- **dist/** (fichiers compilés en JS si tu build avec tsc)
- **src/**
  - **__tests__/**
    - `UserController.test.ts`
    - `GameController.test.ts`
    - `GameView.test.ts`
    - `SearchController.test.ts`
    - `SortController.test.ts`
    - `UserView.test.ts`
  - **controllers/**
    - `GameController.ts`
    - `UserController.ts`
    - `SearchController.ts`
    - `SortController.ts`
  - **models/**
    - `JeuVideo.ts`
    - `Utilisateur.ts`
    - `Biblitheque.ts`
    - `IJeuVideo.ts`
    - `IUtilisateur.ts`
  - **views/**
    - `GameView.ts`
    - `UserView.ts`
- `index.ts`
- `index.html`
- `package.json`
- `tsconfig.json`
- `jest.config.js`
  
---

## Auteur
Robin - Projet scolaire basé sur un catalogue de jeux vidéo avec une architecture MVC.
