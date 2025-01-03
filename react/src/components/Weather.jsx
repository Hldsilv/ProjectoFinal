import React, { useEffect, useState } from "react";
import { fetchForecastForSJM } from "../services/weatherAPI";
import "./Weather.css";

export default function Weather() {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getForecast = async () => {
      const data = await fetchForecastForSJM();
      if (data) {
        setForecast(data);
        setLoading(false);
      }
    };
    getForecast();
  }, []);

  if (loading) {
    return <p>Carregando previsão...</p>;
  }

  const getDayName = (dateString) => {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  return (
    <div className="weather-container">
      <h1 className="weather-title">Meteorologia</h1>
      {forecast.map((day, index) => (
        <div key={index} className="weather-day">
          <div className="weather-day-info">
            <span className="day-name">
              {index === 0 ? "Hoje" : index === 1 ? "Amanhã" : getDayName(day.forecastDate)}
            </span>
            <span className="temperature">{day.tMax}° / {day.tMin}°</span>
          </div>
          <img 
            src={`/images/${day.idWeatherType}.png`} 
            alt="Condição do tempo" 
            className="weather-icon"
          />
        </div>
      ))}
    </div>
  );
}
