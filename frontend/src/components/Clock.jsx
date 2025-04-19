import React, { useEffect, useState } from 'react';

const DualClock = ({ weatherData }) => {
  const [localTime, setLocalTime] = useState('');
  const [cityTime, setCityTime] = useState(null);

  useEffect(() => {
    const updateClocks = () => {
      // 🖥️ Heure locale de l'ordi
      const localNow = new Date();
      const localTimeFormatted = localNow.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      setLocalTime(localTimeFormatted);

      if (weatherData?.timezone) {
        const utcMillis = Date.now();
        const cityMillis = utcMillis + weatherData.timezone * 1000;
        setCityTime(new Date(cityMillis));
      }
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);

    return () => clearInterval(interval);
  }, [weatherData]);

  const formatter = new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC' // pour éviter les doubles décalages
  });

  return (
    <div className="dual-clock">
      <div className="clock">🖥️ Heure locale <strong>{localTime}</strong></div>
      <div className="clock">🌍 Heure météo <strong>{cityTime ? formatter.format(cityTime) : '--:--:--'}</strong></div>
    </div>
  );
};

export default DualClock;
