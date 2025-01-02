import React, { useState, useEffect } from "react";
import { fetchLatestNews } from "../services/newsAPI";
import "./Footer.css";

export default function Footer() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Timer para o relógio
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('pt-PT', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
      );
    }, 1000);

    // Buscar notícias
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
    const newsInterval = setInterval(getNews, 300000);

    return () => {
      clearInterval(timer);
      clearInterval(newsInterval);
    };
  }, []);

  return (
    <footer className="footer">
      <div className="news-ticker">
        {loading ? (
          "Carregando notícias..."
        ) : error ? (
          error
        ) : (
          news.map((headline, index) => (
            <span key={index}>
              {headline} {index < news.length - 1 && " // "}
            </span>
          ))
        )}
      </div>
      <div className="time-display">{currentTime}</div>
    </footer>
  );
}
