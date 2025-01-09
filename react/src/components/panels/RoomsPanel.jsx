import React, { useState, useEffect } from "react";
import "./RoomsPanel.css";

const API_URL = "http://localhost:3001/api/schedules";

export default function RoomsPanel() {
  const [schedules, setSchedules] = useState([]);
  const [currentClasses, setCurrentClasses] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const [error, setError] = useState(null);

  // Atualiza a hora atual a cada minuto
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toTimeString().slice(0, 5); // HH:MM
      setCurrentTime(time);
    };

    updateTime(); // Atualiza imediatamente ao carregar o componente
    const interval = setInterval(updateTime, 60000); // Atualiza a cada minuto

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, []);

  // Fetch schedules from API
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch(API_URL);
        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Resposta não é JSON válida.");
        }

        const data = await response.json();
        setSchedules(data);
      } catch (error) {
        console.error("Erro ao buscar horários:", error);
        setError("Erro ao carregar os horários. Por favor, tente novamente.");
      }
    };

    fetchSchedules();
  }, []);

  // Filter active classes
  useEffect(() => {
    if (!currentTime) return;

    try {
      const currentMinutes = timeToMinutes(currentTime);

      const activeClasses = schedules.filter((room) =>
        room.schedule.some((lesson) => {
          const [start, end] = lesson.time.split(" - ");
          const startMinutes = timeToMinutes(start);
          const endMinutes = timeToMinutes(end);

          return currentMinutes >= startMinutes && currentMinutes < endMinutes;
        })
      );

      setCurrentClasses(activeClasses);
    } catch (err) {
      console.error("Erro ao processar horários:", err.message);
    }
  }, [currentTime, schedules]);

  // Convert time HH:MM to total minutes
  const timeToMinutes = (time) => {
    try {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    } catch (err) {
      console.error("Erro ao converter tempo:", time);
      return 0; // Valor padrão para erros
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="rooms-container">
      <div className="rooms-header">
        <h1>Salas</h1>
      </div>

      <div className="rooms-content">
  
        {currentClasses.length > 0 ? (
          currentClasses.map((room) => (
            <div key={room.roomNumber}>
              <h3 className="room-title">Sala {room.roomNumber}</h3>
              <div>
                {room.schedule
                  .filter((lesson) => {
                    const [start, end] = lesson.time.split(" - ");
                    const currentMinutes = timeToMinutes(currentTime);
                    return (
                      currentMinutes >= timeToMinutes(start) &&
                      currentMinutes < timeToMinutes(end)
                    );
                  })
                  .map((lesson, index) => (
                    <div key={index} className="room-item">
                      <strong>{lesson.module}</strong> - {lesson.time}
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <p className="no-classes">Não há aulas a decorrer no momento.</p>
        )}
      </div>
    </div>
  );
}
