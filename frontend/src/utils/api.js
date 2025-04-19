// 🌍 API de base (adaptable en fonction de l’environnement)
const API_URL = '/api'; // ou 'http://localhost:3001/api' si pas de proxy Vite

// 📅 Prévisions météo sur plusieurs jours (lat/lon = coordonnées GPS)
export const fetchForecast = async (lat, lon) => {
    const res = await fetch(`/api/weather/forecast?lat=${lat}&lon=${lon}`);
    return (await res.json());
  };
  
// 🌤️ Météo actuelle à un endroit donné
export const fetchWeather = async (lat, lon) => {
  const res = await fetch(`/api/weather/current?lat=${lat}&lon=${lon}`);
  return (await res.json());
};

// 📍 Rechercher des villes à partir d’un préfixe de nom
export const fetchCities = async (input) => {
  const res = await fetch(`/api/geo/cities?namePrefix=${input}`);
  return await res.json();
};
  
// 📝 Créer un compte utilisateur
export const register = async ({ username, email, password }) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) throw new Error('Erreur lors de l’inscription');
  return await res.json();
};

// 🔓 Connexion utilisateur → récupération du token JWT
export const login = async ({ email, password }) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Email ou mot de passe invalide');

  const data = await res.json();
  localStorage.setItem('token', data.token); // 💾 Stockage local du token
  localStorage.setItem('username', data.username);
  return data;
};

// 🔒 Déconnexion utilisateur → suppression du token
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};

// 🔑 Accès au token depuis le localStorage
const getToken = () => localStorage.getItem('token');

// ➕ Ajouter une ville aux favoris (requiert authentification)
export const addFavorite = async ({ city_name, latitude, longitude }) => {
  const res = await fetch(`${API_URL}/favorites/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`, // 🔐 Auth via token
    },
    body: JSON.stringify({ city_name, latitude, longitude }),
  });

  if (!res.ok) throw new Error('Erreur lors de l’ajout de la ville');
  return await res.json();
};

// 📄 Liste des villes favorites de l’utilisateur connecté
export const getFavorites = async () => {
  const res = await fetch(`${API_URL}/favorites/list`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error('Erreur lors du chargement des favoris');
  return await res.json();
};

// ❌ Supprimer une ville favorite (authentification requise)
export const removeFavorite = async (city_name) => {
  const res = await fetch(`${API_URL}/favorites/remove`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ city_name }),
  });

  if (!res.ok) throw new Error("Erreur lors de la suppression du favori");
  return await res.json();
};
