// 📦 Importation des hooks React
import React, { useState, useEffect } from 'react';
// 🎯 Importation du contexte utilisateur créé ailleurs
import { UserContext } from './UserContext';

// 🧠 Composant fournisseur de contexte utilisateur
const UserProvider = ({ children }) => {
  // 🟢 État pour suivre si l'utilisateur est connecté ou non
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔁 Au premier chargement, vérifie si un token est présent en localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // convertit en booléen : true si token existe, false sinon
  }, []);

  return (
    // 🌐 Fournit les données d’authentification aux composants enfants
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

// 📤 Exportation par défaut du provider
export default UserProvider;
