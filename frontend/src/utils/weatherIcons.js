// utils/weatherIcons.js
// 🎨 Mapping entre les conditions météo et les icônes correspondantes

// 🌤️ Importation des images utilisées pour illustrer les types de météo
import sunny from '../assets/images/sunny.png';
import cloudy from '../assets/images/cloudy.png';
import rainy from '../assets/images/rainy.png';
import snowy from '../assets/images/snowy.png';
import moon from '../assets/images/moon.png';

// ☁️ Dictionnaire de correspondance pour les icônes météo en journée
// (clé = condition météo renvoyée par l'API, valeur = image à afficher)
export const weatherIcons = {
  Clear: sunny,
  Clouds: cloudy,
  Rain: rainy,
  Snow: snowy,
  Haze: cloudy,
  Mist: cloudy,
};

// 🌙 Icône spécifique pour les nuits dégagées
export const nightClear = moon;
