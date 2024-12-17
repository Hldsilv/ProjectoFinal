import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:3001/api/events";

export default function EventsPanel() {
  const [events, setEvents] = useState([]);
  const [currentDayEvents, setCurrentDayEvents] = useState([]);
  const [nextDayEvents, setNextDayEvents] = useState([]);
  const [showNextDay, setShowNextDay] = useState(false);

  const daysOfWeek = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];

  // Função para obter o índice do dia atual
  const getDayIndex = () => new Date().getDay();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erro ao buscar os eventos");

        const data = await response.json();

        const todayIndex = getDayIndex();
        const nextDayIndex = (todayIndex + 1) % 7; // Garante que sábado vai para domingo

        setCurrentDayEvents(data[daysOfWeek[todayIndex]] || []);
        setNextDayEvents(data[daysOfWeek[nextDayIndex]] || []);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error.message);
      }
    };

    fetchEvents();

    // Alterna entre os eventos do dia atual e do dia seguinte a cada 10 segundos
    const interval = setInterval(() => {
      setShowNextDay((prev) => !prev);
    }, 10000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <div>
      <h2>Eventos de {showNextDay ? "Amanhã" : "Hoje"}</h2>
      <ul>
        {(showNextDay ? nextDayEvents : currentDayEvents).map((event) => (
          <li key={event.id}>
            <strong>{event.name}</strong> - {event.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
