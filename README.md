# 📚 Documentation Frontend

Ce document fournit un aperçu de l'architecture, des conventions de développement de notre frontend ainsi que les étapes pour le récupérer et l'utiliser.

## 1. Présentation générale

Le but de l'application est de permettre à l'utilisateur d'utiliser des modèles IA pour effectué les tâches suivantes : 
* Transcription speech to text
* Diarization

Concernant la structure du projet nous avons sélectionné l'approche dite modulaire/ par domaine. 
L'idée étant tout simplement de regrouper les fonctionalités par les éléments qui leur sont concernées. 

**Un module de transcription, un module de diarization, ...**

## 2. Structures du projet et conventions

L'idée est que chaque module doit fonctionner comme une mini-application **autonome**. 

### Structure d'un module
---
### components/
> **Fonction Principale :** Le dossier components sert de stockage des différents composants spécifiques au module concerné.

**Impératif :** 
* Ne doit pas contenir de logique métier complexe (juste de l'affichage).
---
### hooks/
> **Fonction Principale :** La logique métier
---
### types/
> **Fonction Principale :** Les interfaces TypeScript spécifiques
---
### services/
> **Fonction Principale :** Les call API liées au module
---
### index.tsx
> **Fonction Principale :** exporte la page
---

### Le dossier Shared
> **Fonction Principale :** Stocke les composants UI et utils globaux (utilisées dans plusieurs modules)