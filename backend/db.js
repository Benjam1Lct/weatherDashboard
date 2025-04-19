const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'userBD.db'));

// Création de la table users
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
  );
`);

// Table des villes favorites liées à chaque user
db.exec(`
  CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    city_name TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

module.exports = db;
