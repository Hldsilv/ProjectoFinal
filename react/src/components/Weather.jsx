import React, { useEffect, useState } from "react";
import { fetchForecastForSJM } from "../services/weatherAPI";

export default function Weather() {
  const [forecast, setForecast] = useState([]);
  const [currentDay, setCurrentDay] = useState(0); // 0 para Hoje, 1 para Amanhã
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getForecast = async () => {
      const data = await fetchForecastForSJM();
      if (data) {
        setForecast(data.slice(0, 2)); // Pega apenas Hoje e Amanhã
        setLoading(false);
      }
    };
    getForecast();
  }, []);

  useEffect(() => {
    // Alternar entre hoje e amanhã a cada 10 segundos
    const interval = setInterval(() => {
      setCurrentDay((prevDay) => (prevDay === 0 ? 1 : 0));
    }, 10000);

    return () => clearInterval(interval); // Limpar intervalo ao desmontar o componente
  }, []);

  if (loading) {
    return <p>Carregando previsão...</p>;
  }

  const dayForecast = forecast[currentDay];

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>São João da Madeira</h2>
      {dayForecast ? (
        <div>
          <h2>{currentDay === 0 ? "Hoje" : "Amanhã"}</h2>
          <p>Data: {dayForecast.forecastDate}</p>
          <p>Temperatura Mínima: {dayForecast.tMin}°C</p>
          <p>Temperatura Máxima: {dayForecast.tMax}°C</p>
          <p>Probabilidade de Precipitação: {dayForecast.precipitaProb}%</p>
          <p>Direção do Vento: {dayForecast.predWindDir}</p>
        </div>
      ) : (
        <p>Sem dados disponíveis.</p>
      )}
    </div>
  );
}
