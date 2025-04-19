import { AsyncPaginate } from 'react-select-async-paginate';

// 🔍 Composant de barre de recherche de villes avec chargement asynchrone
const SearchBar = ({ value, onChange, loadOptions }) => {
  return (
    <AsyncPaginate
      placeholder="Search for cities" // Texte affiché lorsqu'aucune ville n’est sélectionnée
      debounceTimeout={500} // ⏳ Attente avant d’exécuter la recherche (anti-spam)
      value={value} // Valeur sélectionnée
      onChange={onChange} // Fonction appelée lors de la sélection
      loadOptions={loadOptions} // Fonction pour charger les options (appel API)
      styles={{
        // 🎨 Styles personnalisés pour intégrer le design glassmorphism
        control: (base) => ({
          ...base,
          backgroundColor: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(8px)',
          borderRadius: '10px',
          border: '1px solid rgba(255,255,255,0.3)',
          padding: '5px',
          color: '#18181a',
          width: '100%',
          fontSize: '1.5rem',
        }),
        input: (base) => ({ ...base, color: '#18181a' }),
        placeholder: (base) => ({ ...base, color: '#18181a' }),
        singleValue: (base) => ({ ...base, color: '#18181a' }),
        menu: (base) => ({
          ...base,
          backgroundColor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(6px)',
        }),
      }}
    />
  );
};

export default SearchBar;
