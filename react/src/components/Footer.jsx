import React, { useState, useEffect } from "react";
import { fetchLatestNews } from "../services/newsAPI";
import "./Footer.css";

export default function Footer() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        const headlines = await fetchLatestNews();
        setNews(headlines);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar as notícias.");
        setLoading(false);
      }
    };

    getNews();

    // Atualiza as notícias a cada 5 minutos
    const interval = setInterval(getNews, 300000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  if (loading) {
    return <div className="footer">Carregando notícias...</div>;
  }

  if (error) {
    return <div className="footer">{error}</div>;
  }

  return (
    <footer className="footer">
      <div className="news-ticker">
        {news.map((headline, index) => (
          <span key={index}>
            {headline} {index < news.length - 1 && " // "}
          </span>
        ))}
      </div>
    </footer>
  );
}
