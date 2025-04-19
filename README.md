# 🌦️ Météo Track

Projet météo complet réalisé dans le cadre de la SAE S4.

## 📁 Structure du projet

/frontend → Application React (interface utilisateur) 
/backend → Serveur Node.js avec Express (API et base de données)

---

## 🧩 `frontend/` — Application React

L'application permet de :

- Rechercher une ville via un champ de recherche intelligent
- Afficher les prévisions météo à partir de l’API OpenWeatherMap
- Se connecter / s’inscrire avec un système JWT
- Ajouter ou supprimer des **villes favorites**
- Accéder à une interface fluide inspirée du style **iOS / glassmorphism**

📄 Voir [frontend/README.md](./frontend/README.md) pour plus de détails

---

## 🛠 `backend/` — API Node.js

Le backend gère :

- L’authentification des utilisateurs (inscription, connexion, JWT)
- Le stockage des villes favorites en base de données (SQLite)
- Les appels vers l’API OpenWeatherMap et GeoDB en proxy sécurisé

📄 Voir [backend/README.md](./backend/README.md) pour plus de détails