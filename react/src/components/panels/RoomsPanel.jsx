import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:3001/api/schedules";

export default function RoomsPanel({ currentTime }) {
  const [schedules, setSchedules] = useState([]);
  const [currentClasses, setCurrentClasses] = useState([]);

  useEffect(() => {
    // Busca os dados da API
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
      }
    };

    fetchSchedules();
  }, []);

  useEffect(() => {
    if (!currentTime) return;

    // Converte a hora atual em minutos totais
    const currentMinutes = timeToMinutes(currentTime);

    // Filtra as aulas que estão a decorrer
    const activeClasses = schedules.filter((room) =>
      room.schedule.some((lesson) => {
        const [start, end] = lesson.time.split(" - ");
        const startMinutes = timeToMinutes(start);
        const endMinutes = timeToMinutes(end);

        return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
      })
    );

    setCurrentClasses(activeClasses);
  }, [currentTime, schedules]);

  // Função para converter hora (HH:MM) em minutos totais
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  return (
    <div>
      <h2>Salas com Aulas a Decorrer</h2>
      {currentClasses.length > 0 ? (
        currentClasses.map((room) => (
          <div key={room.roomNumber}>
            <h3>Sala {room.roomNumber}</h3>
            <ul>
              {room.schedule
                .filter((lesson) => {
                  const [start, end] = lesson.time.split(" - ");
                  const currentMinutes = timeToMinutes(currentTime);
                  return (
                    currentMinutes >= timeToMinutes(start) &&
                    currentMinutes <= timeToMinutes(end)
                  );
                })
                .map((lesson, index) => (
                  <li key={index}>
                    {lesson.module} - {lesson.time}
                  </li>
                ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Não há aulas a decorrer no momento.</p>
      )}
    </div>
  );
}
