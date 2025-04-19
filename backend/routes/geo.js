// 📦 Importation des modules nécessaires
const express = require('express');
const router = express.Router();
const axios = require('axios');

// 🔐 Clé API pour l'accès à l'API GeoDB
const GEO_API_KEY = process.env.GEO_API_KEY;

// 🌍 Route GET /cities : recherche de villes à partir d'un préfixe
router.get('/cities', async (req, res) => {
  const { namePrefix } = req.query; // 🔍 Récupère le préfixe saisi par l'utilisateur (ex: "Par")

  try {
    // ⚙️ Appel à l'API GeoDB avec axios
    const response = await axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities`, {
      params: { minPopulation: 10000, namePrefix }, // 🔎 Filtre pour les grandes villes
      headers: {
        'X-RapidAPI-Key': GEO_API_KEY, // Authentification via clé API
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
      },
    });
    res.json(response.data); // ✅ Renvoie les données récupérées depuis l’API
  } catch (err) {
    // ❌ Gestion des erreurs en cas d’échec de l’appel à l’API
    res.status(500).json({ error: 'Erreur lors de la récupération des villes.' });
  }
});

// 🚀 Export du routeur pour l'intégrer dans l'application principale
module.exports = router;
