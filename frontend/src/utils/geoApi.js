import { fetchCities } from './api'; // 🔄 Appel API pour récupérer les villes depuis le backend

// 📌 Fonction utilisée dans la SearchBar pour charger dynamiquement les options
export const loadOptions = async (inputValue) => {
  // 🔎 Récupère une liste de villes correspondant au texte saisi
  const citiesList = await fetchCities(inputValue);

  // 🧹 Nettoyage : exclusion des arrondissements (souvent peu pertinents)
  const cleaned = citiesList.data.filter(city =>
    !city.name.toLowerCase().includes("arrondissement")
  );

  // 👑 Forçage de Paris en premier si l’utilisateur tape "par"
  const includeParis = inputValue.toLowerCase().startsWith("par");
  if (includeParis) {
    const paris = {
      name: "Paris",
      countryCode: "FR",
      latitude: 48.8566,
      longitude: 2.3522,
    };
    cleaned.unshift(paris); // 👈 Ajout en tête de liste
  }

  // 🚫 Suppression des doublons sur le nom + pays
  const unique = cleaned.filter((city, index, self) =>
    index === self.findIndex(c =>
      c.name === city.name && c.countryCode === city.countryCode
    )
  );

  // 🇫🇷 Priorité aux villes françaises dans l’ordre d’affichage
  const sorted = unique.sort((a, b) => {
    if (a.countryCode === 'FR' && b.countryCode !== 'FR') return -1;
    if (a.countryCode !== 'FR' && b.countryCode === 'FR') return 1;
    return 0;
  });

  // ✂️ Limite la liste à 10 suggestions maximum
  const sliced = sorted.slice(0, 10);

  // 🔁 Mise en forme des données pour le composant `react-select`
  return {
    options: sliced.map(city => ({
      value: `${city.latitude} ${city.longitude}`,
      label: `${city.name}, ${city.countryCode}`,
    })),
  };
};
  