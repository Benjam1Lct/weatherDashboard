import React from 'react';

// 📊 Composant d'affichage de la pression atmosphérique
const PressureTile = ({ pressure, sea_level, grnd_level }) => (
  <div className="bento-item tile pressure-tile">
    <h3>Pression</h3>

    {/* Affiche la pression principale (au niveau actuel) */}
    <p style={{display:"flex", alignItems:"center", gap:'0.5rem'}}><img src="https://em-content.zobj.net/source/microsoft/379/magnifying-glass-tilted-left_1f50d.png" loading="lazy" alt="15.1" width="24" height="24" /> Pression : {pressure} hPa</p>
    
    {/* Affiche la pression au niveau de la mer si disponible */}
    {sea_level && <p style={{display:"flex", alignItems:"center", gap:'0.5rem'}}><img src="https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/128/Water-Wave-3d-icon.png" width="24" height="24"/> Mer : {sea_level} hPa</p>}
    
    {/* Affiche la pression au niveau du sol si disponible */}
    {grnd_level && <p style={{display:"flex", alignItems:"center", gap:'0.5rem'}}><img src="https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/128/World-Map-3d-icon.png" width="24" height="24"/> Sol : {grnd_level} hPa</p>}
  </div>
);

export default PressureTile;
