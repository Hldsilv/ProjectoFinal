import React, { useEffect, useState } from 'react';
import { fetchForecastForSJM } from './services/ipmaapi';
import { fetchLatestNews } from './services/publicoapi';

const App = () => {
  const [forecast, setForecast] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Buscar dados das duas APIs
    const getData = async () => {
      const [weatherData, latestNews] = await Promise.all([
        fetchForecastForSJM(),
        fetchLatestNews(),
      ]);

      setForecast(weatherData || []);
      setNews(latestNews || []);
    };

    getData();
  }, []);

  return (
    <div>
      <h1>Painel de Informações</h1>

      {/* Secção de Previsão Meteorológica */}
      <section>
        <h2>Previsão Meteorológica para São João da Madeira</h2>
        <ul>
          {forecast.map((day, index) => (
            <li key={index}>
              <p>Data: {day.forecastDate}</p>
              <p>Temperatura Mínima: {day.tMin}°C</p>
              <p>Temperatura Máxima: {day.tMax}°C</p>
              <p>Probabilidade de Precipitação: {day.precipitaProb}%</p>
              <p>Direção do Vento: {day.predWindDir}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Secção de Notícias */}
      <section>
        <h2>Últimas Notícias</h2>
        <ul>
          {news.map((article, index) => (
            <li key={index}>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                {article.titulo}
              </a>
              <p>{article.descricao}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default App;
