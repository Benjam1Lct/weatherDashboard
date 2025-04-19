// 📦 Import des modules nécessaires
const express = require('express');
const router = express.Router();
const axios = require('axios');

// 🔐 Récupération de la clé API depuis les variables d’environnement
const API_KEY = process.env.OPENWEATHERMAP_KEY;

/**
 * 🌤 Route GET /forecast
 * Récupère les prévisions météo sur 5 jours toutes les 3 heures
 * Paramètres attendus : lat (latitude), lon (longitude)
 */
router.get('/forecast', async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
      params: { lat, lon, appid: API_KEY, units: 'metric' }, // 🌡 Unités en degrés Celsius
    });
    res.json(response.data.list); // ✅ On renvoie uniquement la liste des prévisions
  } catch (err) {
    // ❌ Gestion d’erreur : échec de l’appel à l’API
    res.status(500).json({ error: 'Erreur lors de la récupération des prévisions.' });
  }
});

/**
 * ☀️ Route GET /current
 * Récupère la météo actuelle pour une localisation donnée
 * Paramètres attendus : lat (latitude), lon (longitude)
 */
router.get('/current', async (req, res) => {
  const { lat, lon } = req.query; // 📍 Coordonnées géographiques
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: { lat, lon, appid: API_KEY, units: 'metric' },  // 🌡 Unités en degrés Celsius
    });
    res.json(response.data); // ✅ Données météo complètes actuelles
  } catch (err) {
    // ❌ Gestion d’erreur : échec de l’appel à l’API
    res.status(500).json({ error: 'Erreur lors de la récupération de la météo.' });
  }
});

// 🚀 Export du routeur pour l’utiliser dans app.js
module.exports = router;
