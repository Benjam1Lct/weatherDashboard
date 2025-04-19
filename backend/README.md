# ⚙️ Backend - Météo Track

Ce dossier contient le **serveur backend Express** pour le projet **Météo Track**, développé dans le cadre de la SAE S4.

Il gère :
- L’authentification des utilisateurs avec JWT
- La gestion des **villes favorites**
- Les appels à l’API **OpenWeatherMap** et **GeoDB Cities** de manière sécurisée
- Une base de données SQLite locale (`userBD.db`)

---

## 🧱 Stack technique

- Node.js + Express
- better-sqlite3 (base locale rapide)
- bcrypt (hash de mot de passe)
- jsonwebtoken (authentification JWT)
- dotenv (variables d’environnement)
- axios (appels API externes)

---

## 📦 Installation

1. Va dans le dossier `backend` :
   ```bash
   cd backend
   ```

2. Installe les dépendances :
   ```bash
   npm install
   ```

3. Crée un fichier `.env` :

   ```env
   OPENWEATHERMAP_KEY=ta_clé_openweathermap
   GEO_API_KEY=ta_clé_geodb
   JWT_SECRET=une_clé_ultra_secrète
   ```

4. Lance le serveur :
   ```bash
   npm start
   ```

---

## 🛠 Structure des fichiers

```
/backend
├── routes/
│   ├── auth.js         # Connexion / inscription
│   ├── favorites.js    # Ajout / suppression / lecture des villes favorites
│   ├── geo.js          # Proxy vers l’API GeoDB
│   └── weather.js      # Proxy vers OpenWeatherMap (météo actuelle + prévisions)
|   
├── db.js               # Configuration SQLite (userBD.db)
├── server.js           # Point d’entrée du serveur Express
└── .env                # Clés API & secret JWT
```

---

## 🔐 API – Authentification

| Méthode | URL                  | Description                          |
|--------|----------------------|--------------------------------------|
| POST   | `/api/auth/register` | Inscription utilisateur              |
| POST   | `/api/auth/login`    | Connexion → retourne un JWT          |

---

## ⭐ API – Favoris (authentification requise)

> Toutes ces routes nécessitent un `Authorization: Bearer <token>`

| Méthode | URL                     | Description                          |
|---------|-------------------------|--------------------------------------|
| GET     | `/api/favorites/list`   | Récupère les villes favorites        |
| POST    | `/api/favorites/add`    | Ajoute une ville favorite            |
| DELETE  | `/api/favorites/remove` | Supprime une ville favorite          |

---

## 🌍 API – Données externes

| Méthode | URL                          | Description                                |
|---------|------------------------------|--------------------------------------------|
| GET     | `/api/weather/current`       | Météo actuelle via OpenWeatherMap          |
| GET     | `/api/weather/forecast`      | Prévisions 5 jours via OpenWeatherMap      |
| GET     | `/api/geo/cities?namePrefix=Paris` | Suggestion de villes via GeoDB        |

---

## 🗃 Base de données SQLite

Fichier : `userBD.db`

### Tables créées automatiquement :

#### `users`
| Champ          | Type      | Description            |
|----------------|-----------|------------------------|
| id             | INTEGER   | Clé primaire           |
| username       | TEXT      | Nom d'utilisateur      |
| email          | TEXT      | Email (unique)         |
| password_hash  | TEXT      | Mot de passe hashé     |

#### `favorites`
| Champ        | Type    | Description                     |
|--------------|---------|---------------------------------|
| id           | INTEGER | Clé primaire                    |
| user_id      | INTEGER | Lien vers `users.id`            |
| city_name    | TEXT    | Nom de la ville                 |
| latitude     | REAL    | Latitude                        |
| longitude    | REAL    | Longitude                       |

---

## ✨ Auteur·e·s

Projet réalisé par le groupe **SAE4_G4_E4**  
Membres : Driss Baritaud, Ilan Buchoux, Benjamin Lecomte
