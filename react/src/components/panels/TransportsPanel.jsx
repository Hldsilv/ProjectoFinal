import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TransportsPanel.css";

export default function TransportsPanel() {
  const [transports, setTransports] = useState({ trains: [], buses: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  // Atualiza a hora atual a cada minuto
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const time = now.toTimeString().slice(0, 5); // HH:MM
      setCurrentTime(time);
    };

    updateClock();
    const timer = setInterval(updateClock, 60000); // Atualiza a cada minuto

    return () => clearInterval(timer);
  }, []);

  // Busca os horários de transportes da API
  useEffect(() => {
    const fetchTransports = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/transports");
        setTransports(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar dados de transportes:", err.message);
        setError("Não foi possível carregar os dados de transportes.");
        setLoading(false);
      }
    };

    fetchTransports();
  }, []);

  // Filtra os próximos dois transportes com base no horário atual
  const getNextTransports = (schedule) => {
    const currentMinutes = timeToMinutes(currentTime);
    const upcoming = schedule
      .filter((transport) => timeToMinutes(transport.departure) > currentMinutes)
      .slice(0, 3); // Pega apenas os dois próximos
    return upcoming;
  };

  // Converte um horário (HH:MM) em minutos totais
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  if (loading) {
    return <div>Carregando informações de transportes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="transports-panel">
      <h1 className="transport-title">Transportes</h1>

      <div>
        <h3>Comboios</h3>
        <div className="transport-items">
          <div className="route-info">{transports.trains[0]?.route}</div>
          {getNextTransports(transports.trains).map((train) => (
            <div key={train.id} className="transport-item">
              <strong>Partida:</strong> {train.departure}  <strong>Chegada:</strong> {train.arrival}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>Autocarros</h3>
        <div className="transport-items">
          <div className="route-info">{transports.buses[0]?.route}</div>
          {getNextTransports(transports.buses).map((bus) => (
            <div key={bus.id} className="transport-item">
              <strong>Partida:</strong> {bus.departure}  <strong>Chegada:</strong> {bus.arrival}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
