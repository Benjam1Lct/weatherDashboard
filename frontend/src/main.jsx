// ✅ Mode strict de React pour détecter les problèmes potentiels dans l'application
import { StrictMode } from 'react';
// 🔧 Méthode moderne de création du point de montage (React 18+)
import { createRoot } from 'react-dom/client';
// 🎨 Fichier CSS global
import './index.css';
// 🧠 Composant racine de l’application
import App from './App.jsx';
// 🔐 Provider pour le contexte utilisateur (authentification, favoris, etc.)
import UserProvider from './context/UserProvider';

// 🏗️ Point de montage principal de l’application React
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> {/* Fournit les données utilisateur à toute l’app */}
      <App />
    </UserProvider>
  </StrictMode>
);
