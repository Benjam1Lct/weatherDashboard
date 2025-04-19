import React, { useState, useEffect } from 'react';
import { getFavorites } from '../utils/api';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { FaTimes } from 'react-icons/fa';

const FavoritesModal = ({ onSelectCity }) => {
  const [showModal, setShowModal] = useState(false); // Gère l’ouverture ou fermeture de la modal
  const [favorites, setFavorites] = useState([]);  // Stocke les villes favorites récupérées
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext); // Contexte utilisateur
    
  // 🔁 Fonction appelée quand l’utilisateur clique sur une ville favorite
  const handleSelect = (fav) => {
    if (!fav?.latitude || !fav?.longitude || !fav?.city_name) return;
  
    const selectedOption = {
      value: `${fav.latitude} ${fav.longitude}`,
      label: `${fav.city_name}`,
    };
  
    onSelectCity(selectedOption); // 🧭 Remonte la ville sélectionnée au parent (WeatherApp)
    setShowModal(false); // 🔒 Ferme la modal
  };
  
  // 🔐 Vérifie la présence du token à l’ouverture du composant
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // 🧠 Active la connexion dans le contexte
  }, []);

  // 📥 Ouvre la modal et récupère les favoris depuis l’API
  const openModal = async () => {
    try {
      const favs = await getFavorites(); // API call
      setFavorites(favs); // Mise à jour de l’état
      setShowModal(true); // Affiche la modal
    } catch (err) { 
      console.error("Erreur lors du chargement des favoris", err);
    }
  };

  // 👤 Cache le bouton si l’utilisateur n’est pas connecté
  if (!isLoggedIn) return null;

  return (
    <>
    {/* 🔘 Bouton pour afficher la liste des favoris */}
      <button
        onClick={openModal}
        className="glass-button"
      >
        Favorites
      </button>

      {/* 🪟 Modal affichée si showModal est vrai */}
      {showModal && (
        <div className="login-modal-overlay">
          <div className="login-modal">
            {/* ❌ Bouton de fermeture en haut à droite */}
            <button
              className="modal-close-button"
              onClick={() => setShowModal(false)}
              aria-label="Fermer la modal"
            >
              <FaTimes />
            </button>
            <h2 style={{marginTop: "-8px"}}>Mes favoris</h2>

            {/* 📄 Liste des villes favorites ou message si vide */}
            {favorites.length > 0 ? (
              <ul className="favorites-button-list">
                {favorites.map((fav, index) => (
                  <button
                  key={index}
                  className="favorite-city-button"
                  onClick={() => handleSelect(fav)} // ← ici tu appelles handleSelect
                >
                  {fav.city_name}
                </button>
                ))}
              </ul>
            ) : (
              <p>Aucune ville enregistrée.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FavoritesModal;
