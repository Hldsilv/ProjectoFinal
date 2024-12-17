import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import logoCesae from "../assets/logo_cesae-cores_horizontal_header_site.png";
import { useDashboard } from "../context/DashboardContext";
import WeatherPanel from "./panels/WeatherPanel";
import RoomsPanel from "./panels/RoomsPanel";
import CoursesPanel from "./panels/CoursesPanel";
import TransportsPanel from "./panels/TransportsPanel";
import EventsPanel from "./panels/EventsPanel";
import RestaurantPanel from "./panels/RestaurantPanel";

const panelComponents = {
  RoomsPanel,
  CoursesPanel,
  TransportsPanel,
  EventsPanel,
  WeatherPanel,
  RestaurantPanel,
};

export default function Dashboard() {
  const { panels } = useDashboard();
  const [currentDateTime, setCurrentDateTime] = useState("");

  // Atualiza a data e hora a cada segundo
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      
      const day = String(now.getDate()).padStart(2, "0");
      const month = now.toLocaleString("pt-PT", { month: "long" }); // Nome do mês
      const year = now.getFullYear();
      const time = now.toLocaleTimeString("pt-PT", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setCurrentDateTime(`${day} de ${month} de ${year}, ${time}`);
    };

    updateClock(); // Atualiza imediatamente
    const timer = setInterval(updateClock, 1000); // Atualiza a cada 1 segundo

    return () => clearInterval(timer); // Limpa o intervalo ao desmontar o componente
  }, []);

  const panelOrder = [
    "RoomsPanel",
    "CoursesPanel",
    "TransportsPanel",
    "EventsPanel",
    "WeatherPanel",
    "RestaurantPanel",
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="header">
        <img src={logoCesae} alt="CESAE Digital" className="logo" />
        <div className="date-time">{currentDateTime}</div>
      </header>

      {/* Grid com os painéis */}
      <div className="main-section">
        {panelOrder.map((panelName) => {
          const panel = panels.find((p) => p.component === panelName && p.visible);
          if (!panel) return null;

          const Component = panelComponents[panelName];
          return (
            <div key={panel.id || panelName} className="box">
              {panelName === "RoomsPanel" ? (
                <Component currentTime={currentDateTime.split(", ")[1].slice(0, 5)} />
              ) : (
                <Component />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
