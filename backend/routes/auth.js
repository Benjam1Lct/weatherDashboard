// Importe les modules nécessaires
const express = require('express');
const bcrypt = require('bcrypt'); // Pour hasher et vérifier les mots de passe
const jwt = require('jsonwebtoken'); // Pour générer des tokens JWT
const db = require('../db'); // Accès à la base de données locale
const router = express.Router();

// Clé secrète pour signer les tokens JWT (en prod, utiliser une variable d'environnement sécurisée)
const SECRET = process.env.JWT_SECRET || "devsecret";

// 🔐 Route d'inscription d'un nouvel utilisateur
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  // Hash du mot de passe avec un "salt" de 10 tours
  const hash = await bcrypt.hash(password, 10);
  try {
    // Enregistre l'utilisateur dans la BDD
    const stmt = db.prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)');
    stmt.run(username, email, hash);
    res.json({ success: true });
  } catch (err) {
    // Erreur si l'email est déjà utilisé
    res.status(400).json({ error: 'Utilisateur déjà existant' });
  }
});

// 🔓 Route de connexion utilisateur
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Recherche de l'utilisateur en BDD
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  // Vérifie si l'utilisateur existe et si le mot de passe est correct
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: 'Email ou mot de passe invalide' });
  }

  // Génère un token JWT valide 24h contenant l'id utilisateur
  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1d' });

  // Renvoie le token au client + le nom d'utilisateur
  res.json({ token, username: user.username });
});

// Exporte le routeur pour pouvoir l’utiliser dans app.js
module.exports = router;
