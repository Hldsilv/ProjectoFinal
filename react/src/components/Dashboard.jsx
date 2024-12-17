import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import logoCesae from "../assets/logo_cesae-cores_horizontal_header_site.png";
import Weather from "./Weather";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState("");

  // Atualiza a data e a hora dinamicamente
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = { weekday: "long", day: "2-digit", month: "long", year: "numeric" };
      const time = now.toLocaleTimeString("pt-PT");
      const date = now.toLocaleDateString("pt-PT", options);
      setCurrentTime(`${date} - ${time}`);
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer); // Limpar o timer ao desmontar
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header com logo à esquerda e hora à direita */}
      <header className="header">
        <img src={logoCesae} alt="CESAE Digital" className="logo" />
        <div className="date-time">{currentTime}</div>
      </header>

      {/* Linha principal: Salas Disponíveis | Cursos | Transportes */}
      <div className="main-section">
        <div className="box rooms">
          <h2>Salas Disponíveis</h2>
          <ul>
            <li>1.3.B</li>
            <li>1.5.A</li>
            <li>1.4.B</li>
          </ul>
        </div>

        <div className="box courses">
          <h2>Cursos a Decorrer</h2>
          <div className="course-cards">
            <div className="card">
              <img src="https://via.placeholder.com/150" alt="Curso" />
              <p>Programação em Laravel</p>
              <p>🗓 Termina a 2025/02/20</p>
            </div>
            <div className="card">
              <img src="https://via.placeholder.com/150" alt="Curso" />
              <p>Programação em Laravel</p>
              <p>🗓 Termina a 2025/02/20</p>
            </div>
            <div className="card">
              <img src="https://via.placeholder.com/150" alt="Curso" />
              <p>Programação em Laravel</p>
              <p>🗓 Termina a 2025/02/20</p>
            </div>
          </div>
        </div>

        <div className="box transports">
          <h2>Transportes</h2>
          <p>SJM - Porto</p>
          <ul>
            <li>9:00h</li>
            <li>10:00h</li>
            <li>11:00h</li>
          </ul>
          <p>SJM - Lisboa</p>
          <ul>
            <li>10:00h</li>
            <li>11:00h</li>
          </ul>
        </div>
      </div>

      {/* Linha secundária: Eventos | Previsão do Tempo | Restaurante */}
      <div className="bottom-section">
        <div className="box events">
          <h2>Eventos</h2>
          <p>16/10/2024 - CEO MANAGEMENT</p>
          <p>23/10/2024 - RH MEETING</p>
        </div>

        <div className="box weather">
          <h2>Meteorologia</h2>
          <Weather />
        </div>

        <div className="box restaurant">
          <h2>Restaurante</h2>
          <p>Menu do Dia</p>
          <ul>
            <li>Filetes de polvo com arroz de tomate</li>
            <li>Francesinha vegan</li>
          </ul>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="footer">
        <h3>Notícias:</h3>
        <p>
          Tesouro encontrado no parque de S.J.Madeira //
          Novo serviço de drones em SJM
        </p>
      </footer>
    </div>
  );
}
