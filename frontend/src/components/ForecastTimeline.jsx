const ForecastTimeline = ({ forecast }) => {
    // 🛑 Si pas de données de prévision, ne rien afficher
    if (!forecast || forecast.length === 0) return null;
  
    // 📅 Formate une date en chaîne lisible (ex: "lundi 22 avril")
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
    };
  
    // 🕑 Formate une heure en "HH:mm"
    const formatHour = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
  
    let currentDay = ""; // 📌 Pour éviter de répéter les labels de date
  
    return (
      <div className="forecast-box">
        <h2 className="forecast-title">Prévisions</h2>
        <div className="forecast-scroll">
          {forecast.map((item, index) => {
            const thisDay = formatDate(item.dt_txt); // Jour actuel (formaté)
            const showDayLabel = thisDay !== currentDay; // Doit-on afficher le titre de jour ?
            currentDay = thisDay;  // Mise à jour du jour courant
  
            const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`; // 🌥️ Icône météo
            const hour = formatHour(item.dt_txt); // Heure de la prévision
  
            return (
              <div key={index}>
                {showDayLabel && <div className="forecast-day">{thisDay}</div>}
                <div className="forecast-item">
                  <span className="forecast-time">{hour}</span>
                  <img src={icon} alt={item.weather[0].description} />
                  <span className="forecast-temp">{Math.round(item.main.temp)}°C</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default ForecastTimeline;
  