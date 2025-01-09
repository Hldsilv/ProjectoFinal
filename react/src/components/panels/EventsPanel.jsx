import React, { useState, useEffect } from "react";
import "./EventsPanel.css";

const API_URL = "http://localhost:3001/api/events";

export default function EventsPanel() {
  const [events, setEvents] = useState([]);
  const [currentDayEvents, setCurrentDayEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erro ao buscar os eventos");
        const data = await response.json();
        
        console.log('Data received from API:', data); // Debug log

        // Pegando apenas o primeiro evento da primeira chave
        const firstDay = Object.keys(data)[0];
        console.log('First day:', firstDay); // Debug log
        
        if (data[firstDay] && data[firstDay].length > 0) {
          console.log('First day events:', data[firstDay]); // Debug log
          setCurrentDayEvents([data[firstDay][0]]);
        }
      } catch (error) {
        console.error("Erro ao buscar eventos:", error.message);
      }
    };

    fetchEvents();
  }, []);

  if (!currentDayEvents || !currentDayEvents.length) {
    return <div className="events-panel">Não há eventos hoje</div>;
  }

  const currentEvent = currentDayEvents[0];
  console.log('currentEvent:', currentEvent); // Para debug

  return (
    <div className="events-panel">
      <div className="event-title-card">
        <h1>Evento: {currentEvent.name}</h1>
      </div>

      <div className="event-time-card">
        <div className="hora-display">
          {currentEvent.horario}
        </div>
        <div className="underline"></div>
        <div className="future-date">
          {currentEvent.data}
        </div>
      </div>
    </div>
  );
}
