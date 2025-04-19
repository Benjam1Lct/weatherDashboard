// Importe les modules nécessaires
const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

// Clé secrète pour vérifier les tokens JWT
const SECRET = process.env.JWT_SECRET || "devsecret";

// ✅ Middleware pour authentifier les requêtes via JWT
function authenticateToken(req, res, next) {
  const auth = req.headers.authorization;

  // Vérifie la présence de l'en-tête Authorization
  if (!auth) return res.sendStatus(401);

  // Récupère le token depuis l'en-tête (format "Bearer <token>")
  const token = auth.split(' ')[1];

  try {
    // Vérifie et décode le token
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.userId; // Ajoute l'ID utilisateur à la requête
    next(); // Continue la requête
  } catch {
    res.sendStatus(403); // Token invalide ou expiré
  }
}

// ⭐ Ajouter une ville aux favoris de l'utilisateur
router.post('/add', authenticateToken, (req, res) => {
  const { city_name, latitude, longitude } = req.body;

  // Insertion dans la table favorites
  const stmt = db.prepare('INSERT INTO favorites (user_id, city_name, latitude, longitude) VALUES (?, ?, ?, ?)');
  stmt.run(req.userId, city_name, latitude, longitude);
  res.json({ success: true });
});

// 📋 Récupérer la liste des villes favorites d'un utilisateur
router.get('/list', authenticateToken, (req, res) => {
  // Sélectionne toutes les villes associées à l'utilisateur
  const cities = db.prepare('SELECT city_name, latitude, longitude FROM favorites WHERE user_id = ?').all(req.userId);
  res.json(cities); // Renvoie la liste
});

// ❌ Supprimer une ville des favoris
router.delete('/remove', authenticateToken, (req, res) => {
    const { city_name } = req.body;
  
    // Supprime la ville pour l'utilisateur connecté
    const stmt = db.prepare('DELETE FROM favorites WHERE user_id = ? AND city_name = ?');
    const result = stmt.run(req.userId, city_name);

    // Vérifie si une ligne a été supprimée
    if (result.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Ville non trouvée dans vos favoris' });
    }
  });

// Exporte les routes pour être utilisées dans app.js
module.exports = router;
