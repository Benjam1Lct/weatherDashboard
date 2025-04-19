// Charge les variables d'environnement depuis un fichier .env
require('dotenv').config();

// Importe les modules nécessaires
const express = require('express');
const cors = require('cors');
const app = express();

// Active CORS pour autoriser les requêtes cross-origin (utile pour le front-end React par exemple)
app.use(cors());

// Permet à Express de parser le corps des requêtes JSON
app.use(express.json());

// Définition des routes pour les différents services de l'API
app.use('/api/weather', require('./routes/weather'));     // Routes météo (utilise l'API externe)
app.use('/api/geo', require('./routes/geo'));             // Routes géographiques (coordonnées, ville, etc.)
app.use('/api/auth', require('./routes/auth'));           // Authentification (login, JWT)
app.use('/api/favorites', require('./routes/favorites')); // Gestion des villes favorites d’un utilisateur

// Démarrage du serveur sur le port spécifié (ou 3001 par défaut)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
