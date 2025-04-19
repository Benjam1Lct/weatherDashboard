import React from 'react';
import Compass from './Compass';

const WindTile = ({ speed, gust, deg }) => (
  <div className="bento-item tile wind-tile">
    <h3>Vent</h3>
    <div className="wind-info">
      {/* 🧭 Affichage de la boussole */}
      <div className="wind-arrow">
        <Compass deg={deg} />
      </div>

      {/* 🌬️ Données sur le vent */}
      <div className="wind-data">

        {/* 💨 Vitesse du vent (m/s → km/h, avec 2 chiffres après la virgule) */}
        <p style={{display:"flex", alignItems:"center", gap:'0.5rem'}}><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Dashing%20Away.png" alt="Dashing Away" width="25" height="25" /> Vitesse : {(speed * 3.6).toFixed(2)} km/h</p>
        
        {/* 💥 Rafales si dispo */}
        {gust && <p style={{display:"flex", alignItems:"center", gap:'0.5rem'}}><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Collision.png" alt="Collision" width="25" height="25" /> Rafales : {(gust * 3.6).toFixed(2)} km/h</p>}
        
        {/* 🧭 Orientation en mots */}
        <p style={{display:"flex", alignItems:"center", gap:'0.5rem'}}>
          <img src="https://em-content.zobj.net/source/microsoft-teams/337/compass_1f9ed.png" loading="lazy" alt="direction" width="25" height="25"/>
          Direction : {getDirectionFromDegrees(deg)}
        </p>
      </div>
      
    </div>
  </div>
);

// 🔄 Convertit un angle en degrés vers une orientation cardinal simple
const getDirectionFromDegrees = (deg) => {
  const directions = ["Sud", "Sud-Ouest", "Ouest", "Nord-Ouest","Nord", "Nord-Est", "Est", "Sud-Est", ];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};


export default WindTile;
