const WeatherDetails = ({ data }) => {
    return (
      <div className="weather-data">
        
        {/* 💧 Taux d'humidité */}
        <div className="humidity">
          <div className="data-name">Humidité</div>
          <img src="https://em-content.zobj.net/source/microsoft/379/droplet_1f4a7.png" loading="lazy" alt="15.1" width="30px" height="30px" style={{filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))'}} />

          {/* Affiche l'humidité en % si disponible */}
          <div className="data">{data.main ? data.main.humidity : null}%</div>
        </div>

        {/* 💨 Vitesse du vent */}
        <div className="wind">
          <div className="data-name">Vent</div>
          <img src="https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/128/Dashing-Away-3d-icon.png" loading="lazy" alt="15.1" width="30px" height="30px" style={{filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))'}} />
          
          {/* Conversion de m/s en km/h avec arrondi */}
          <div className="data">
            {data.wind ? `${Math.round(data.wind.speed * 3.6)}` : null} km/h
          </div>
        </div>
      </div>
    );
  };
  
  export default WeatherDetails;
  