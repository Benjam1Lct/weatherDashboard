// 🔄 Loader.jsx : Composant simple d'affichage pendant le chargement

// Props :
// - src : chemin vers l’image de chargement (ex: GIF, SVG animé, etc.)

const Loader = ({ src }) => {
  // 📸 Affiche simplement une image avec la classe CSS "loader"
    return <img className="loader" src={src} alt="loading" />;
  };
  
  export default Loader;
  