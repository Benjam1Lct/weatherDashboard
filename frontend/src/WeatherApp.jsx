// 📦 Librairies
import { useEffect, useState } from 'react';

// 🖼️ Images (groupées dans un objet si possible)
import cold from './assets/images/backgrounds/cold.png';
import evening from './assets/images/backgrounds/evening.png';
import green from './assets/images/backgrounds/green.jpeg';
import morning from './assets/images/backgrounds/morning.png';
import night from './assets/images/backgrounds/night.png';
import summer from './assets/images/backgrounds/summer.png';
import sunrise from './assets/images/backgrounds/sunrise.png';
import yellow from './assets/images/backgrounds/yellow.png';
import loadingGif from './assets/images/backgrounds/loading.gif';

// 🔧 Fonctions utilitaires : API météo et géolocalisation
import { loadOptions } from './utils/geoApi';
import { fetchWeather, fetchForecast } from './utils/api';

// 🧩 Composants de l'interface
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherDetails from './components/WeatherDetails';
import ForecastTimeline from './components/ForecastTimeline';
import Loader from './components/Loader';
import MapTile from './components/MapTile';
import TemperatureTile from './components/TemperatureTile';
import PressureTile from './components/PressureTile';
import WindTile from './components/WindTile';
import LoginModal from './components/LoginModal';
import FavoritesModal from './components/FavoritesModal';
import FavoriteButton from './components/FavoriteButton';

// 🎨 Icônes météo (ex : soleil, nuage, etc.)
import { nightClear, weatherIcons } from './utils/weatherIcons';
import Clock from './components/Clock';
import DualClock from './components/Clock';

const WeatherApp = () => {
  const [isBlurAnimating, setIsBlurAnimating] = useState(false); // État pour animer la transition floutée du fond
  const [data, setData] = useState({}); // Données météo actuelles
  const [loading, setLoading] = useState(false); // Chargement en cours ou non
  const [cityImage, setCityImage] = useState(null); // Image de fond actuelle (définie selon l'heure)
  const [forecast, setForecast] = useState([]); // Données météo prévisionnelles
  const [tempMax, setTempMax ] = useState(null);
  const [tempMin, setTempMin ] = useState(null);
  const [searchValue, setSearchValue] = useState({
    value: "47.2184 -1.5536",
    label: "Nantes, FR",
  });
  const [coords, setCoords] = useState({ lat: null, lon: null, city: '' });

  // Appel initial à la météo de Nantes dès que le composant est monté
  useEffect(() => {
    const fetchDefaultWeather = async () => {
      setLoading(true);
      const defaultLat = 47.2184;
      const defaultLon = -1.5536;
      const defaultData = await fetchWeather(defaultLat, defaultLon);
      setCoords({
        lat: defaultData.coord.lat,
        lon: defaultData.coord.lon,
        city: defaultData.name,
      });
      setData(defaultData);
      const forecastData = await fetchForecast(defaultLat, defaultLon);
      setForecast(forecastData);
      triggerBlurTransition(getBackgroundForWeather(defaultData));
      setLoading(false);
    };
    fetchDefaultWeather();
  }, []);

  // Mise à jour des températures min/max à partir des prévisions du jour
  useEffect(() => {
    if (!forecast.length) return;
  
    const today = new Date().getDate();
    const todayForecasts = forecast.filter(item =>
      new Date(item.dt * 1000).getDate() === today
    );
    
    if (todayForecasts.length > 0) {
      const max = Math.max(...todayForecasts.map(f => f.main.temp_max));
      const min = Math.min(...todayForecasts.map(f => f.main.temp_min));
      setTempMax(max);
      setTempMin(min);
    }
  }, [forecast]);
  
  // Calcule l'heure locale à partir du timestamp UTC et du fuseau fourni par l'API
  const getLocalHour = (weatherData) => {
    if (!weatherData?.dt || !weatherData?.timezone) return new Date().getUTCHours();
  
    const utc = weatherData.dt + weatherData.timezone; // timestamp en secondes
    const localDate = new Date(utc * 1000);
  
    return localDate.getUTCHours(); // ← on utilise getUTCHours car on a déjà appliqué le fuseau
  };  
  
  let weatherImage = null;

  // Détermine quelle icône météo utiliser (ex: soleil, lune, pluie, etc.)
  if (data.weather) {
    const weatherMain = data.weather[0].main;
    const hour = getLocalHour(data);

    if (weatherMain === "Clear" && (hour >= 22 || hour < 5)) {
      weatherImage = nightClear;
    } else {
      weatherImage = weatherIcons[weatherMain];
    }
  }

  // Lorsqu’une ville est sélectionnée dans la SearchBar
  const onSearchChange = async (selectedOption) => {
    setSearchValue(selectedOption);
    if (!selectedOption) return;

    const [lat, lon] = selectedOption.value.split(' ');
    setLoading(true);
    const weatherData = await fetchWeather(lat, lon);
    setCoords({
      lat: weatherData.coord.lat,
      lon: weatherData.coord.lon,
      city: weatherData.name,
    });
    setData(weatherData);
    const forecastData = await fetchForecast(lat, lon);
    setForecast(forecastData);
    triggerBlurTransition(getBackgroundForWeather(weatherData));

    setLoading(false);
  };

  // Retourne une image de fond adaptée à l'heure locale
  const getBackgroundForWeather = (weatherData) => {
    if (!weatherData || !weatherData.main || !weatherData.weather) return green;
    const hour = getLocalHour(weatherData);
    console.log(hour);
  
    // ⏰ Priorité : ambiance selon l'heure
    if (hour >= 0 && hour <= 4) return night;
    if (hour >= 5 && hour <= 7) return sunrise;
    if (hour >= 8 && hour <= 10) return morning;
    if (hour >= 11 && hour <= 13) return yellow;
    if (hour >= 14 && hour <= 17) return summer;
    if (hour >= 18 && hour <= 19) return green;
    if (hour >= 20 && hour <= 21) return cold;
    if (hour >= 22 && hour <= 23) return evening;
  
    // 🌫️ Par défaut
    return green;
  };

  // Active une animation floutée lors du changement d’image de fond
  const triggerBlurTransition = (newImage) => {
    setIsBlurAnimating(true);
  
    // ⏳ attendre le milieu de l'animation pour changer l’image
    setTimeout(() => {
      setCityImage(newImage);
    }, 300); // moitié de l’animation
  
    // 🔁 fin de l’animation
    setTimeout(() => {
      setIsBlurAnimating(false);
    }, 700); // durée totale
  };

  return (
    <div className="bento-container">
        

      {/* 🖼️ Image de fond floutée */}
      <div className="background-wrapper">
        <img
          src={cityImage}
          alt="background"
          className={`background-blur ${isBlurAnimating ? 'blur-animating' : ''}`}
          />
      </div>

      <div className="topScreenData">
        <div className='container-button-user'>
          <LoginModal></LoginModal>
          <FavoritesModal onSelectCity={onSearchChange}></FavoritesModal>
          <FavoriteButton city_name={searchValue.label} latitude={coords.lat} longitude={coords.lon}></FavoriteButton>
        </div>
      </div>
      

      <div className="bento-header">
        <DualClock weatherData={data} />
        
        <div className="bento">
          {/* 🔍 Zone de recherche + boutons utilisateur */}
          
          <div className="weather-app">
            <div className="search" style={{ width: '100%' }}>
              <SearchBar value={searchValue} onChange={onSearchChange} loadOptions={loadOptions} />
            </div>
            {loading ? (
              <Loader src={loadingGif} />
            ) : data.notFound ? (
              <div className="not-found">Not Found 😒</div>
            ) : (
              <>
                {/* 📡 Résultats météo actuels */}
                <WeatherDisplay data={data} weatherImage={weatherImage} />
                <WeatherDetails data={data} />
              </>
            )}
          </div>
          {/* 🧭 Carte + timeline */}
            <div className="start">
              <MapTile lat={coords.lat} lon={coords.lon} city={coords.city} />
              <ForecastTimeline forecast={forecast} />
            </div>
            <div className="end">
              {/* 📈 Détails météo supplémentaires : Température, Vent, Pression */}
              {data.main && tempMax !== null && tempMin !== null && (
                <TemperatureTile
                  temp_max={tempMax}
                  temp_min={tempMin}
                  feels_like={data.main.feels_like}
                />
              )}

              {data.main && (
                <WindTile
                  speed={data.wind.speed}
                  gust={data.wind.gust}
                  deg={data.wind.deg}
                />
              )}

              {data.main && (
                <PressureTile
                  pressure={data.main.pressure}
                  sea_level={data.main.sea_level}
                  grnd_level={data.main.grnd_level}
                />
              )}
            </div>
            
          </div>
        </div>
      </div>
      

  );
};

export default WeatherApp;
