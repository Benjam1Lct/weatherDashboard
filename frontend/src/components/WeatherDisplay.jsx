const WeatherDisplay = ({ data, weatherImage }) => {
  // 📅 Obtenir la date actuelle
  const currentDate = new Date();

    // 📆 Liste des jours et mois (en anglais ici)
    const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet","Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const weatherTranslations = {
      Clear: "Dégagé",
      Rain: "Pluie",
      Snow: "Neige",
      Clouds: "Nuageux",
      Drizzle: "Bruine",
      Thunderstorm: "Orage",
      Mist: "Brume",
      Smoke: "Fumée",
      Haze: "Brume sèche",
      Dust: "Poussière",
      Fog: "Brouillard",
      Sand: "Sable",
      Ash: "Cendre",
      Squall: "Rafales",
      Tornado: "Tornade",
    };
      

      // 📌 Format : "Monday, 15 April"
    const formattedDate = `${daysOfWeek[currentDate.getDay()]}, ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
  
    return (
      <>
        <div className="weather">
          {/* 🌤️ Image météo selon type (Clear, Clouds, etc.) */}
          <img src={weatherImage} alt="weather" />

          {/* 🌡️ Type météo (Clear, Rain...) */}
          <div className="weather-type">
            {data.weather ? weatherTranslations[data.weather[0].main] || data.weather[0].main : null}
          </div>

          {/* 🌡️ Température actuelle (arrondie) */}
          <div className="temp">{data.main ? `${Math.floor(data.main.temp)}°` : null}</div>
        </div>

        {/* 📆 Affichage de la date actuelle */}
        <div className="weather-date">
          <p>{formattedDate}</p>
        </div>
      </>
    );
  };
  
  export default WeatherDisplay;
  