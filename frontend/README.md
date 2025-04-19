# 🌤️ Frontend - Météo Track

## ⚙️ Technologies utilisées

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- Style : **iOS-like / Glassmorphism**

---

## 🚀 Fonctionnalités principales

- 🔍 Recherche de ville avec suggestions dynamiques
- 📊 Affichage des données météo actuelles + prévisions
- 👤 Modal de connexion / inscription via JWT
- ⭐ Gestion des villes favorites (ajout, suppression, accès rapide)
- 🎨 Interface responsive avec flou, ombres et effets visuels

---

## 📦 Démarrer le frontend

```bash
cd frontend
npm install
npm run dev
```
Le projet utilise un proxy Vite pour rediriger /api vers le backend (http://localhost:3001).

📁 Structure

src/components → Composants React (modals, boutons, etc.)
src/utils/api.js → Fonctions pour communiquer avec le backend
src/context/UserContext.jsx → Contexte React pour gérer l'état connecté
src/WeatherApp.jsx → Application principale

