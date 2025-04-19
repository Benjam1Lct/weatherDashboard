import React, { useState, useEffect, useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { addFavorite, removeFavorite, getFavorites } from '../utils/api';
import { UserContext } from '../context/UserContext';

// 🔖 Composant de gestion du bouton favori (étoile)
const FavoriteButton = ({ city_name, latitude, longitude }) => {
  // 🔐 Vérifie si l’utilisateur est connecté grâce au contexte global
  const { isLoggedIn } = useContext(UserContext);
  
  // ⭐ État pour savoir si la ville est déjà un favori ou non
  const [isFavorite, setIsFavorite] = useState(false);

  // 🧠 useEffect : vérifie si la ville actuelle est déjà un favori quand le composant se monte
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isLoggedIn) return; // Si pas connecté → pas de favoris à charger
      try {
        const favs = await getFavorites(); // 🔁 Appel à l’API pour récupérer les favoris
        const found = favs.some(fav => fav.city_name === city_name); // ✅ Vérifie si la ville actuelle y est
        setIsFavorite(found); // 🆙 Mets à jour l’état
      } catch (err) {
        console.error('Erreur chargement favoris', err);
      }
    };
    fetchFavorites();
  }, [city_name, isLoggedIn]); // 🔁 Met à jour quand la ville change ou si l’utilisateur se connecte

  // ⬆️⬇️ Fonction de bascule pour ajouter ou retirer des favoris
  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFavorite(city_name); // ❌ Supprime la ville des favoris
        setIsFavorite(false);
      } else {
        await addFavorite({ city_name, latitude, longitude }); // ✅ Ajoute la ville
        setIsFavorite(true);
      }
    } catch (err) {
      console.error('Erreur favori', err);
    }
  };

  // 🔐 Ne rien afficher si l’utilisateur n’est pas connecté
  if (!isLoggedIn) return null;
 
  // ⭐ Bouton visuel avec icône FaStar
  return (
    <button
      className={`star-button ${isFavorite ? 'favorite' : ''}`}
      onClick={handleToggleFavorite}
      title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <FaStar />
    </button>
  );
};

export default FavoriteButton;
