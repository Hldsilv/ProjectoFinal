import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useDashboard } from "../context/DashboardContext";
import Weather from "./Weather";
import Header from "./Header";
import Footer from "./Footer";
import RoomsPanel from "./panels/RoomsPanel";
import CoursesPanel from "./panels/CoursesPanel";
import TransportsPanel from "./panels/TransportsPanel";
import EventsPanel from "./panels/EventsPanel";
import WeatherPanel from "./panels/WeatherPanel";
import RestaurantPanel from "./panels/RestaurantPanel";

// Objeto com todos os componentes de painéis disponíveis
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
  const [currentPanelIndex, setCurrentPanelIndex] = useState(-1); // -1 representa o BEM VINDO


  // Array com a ordem dos painéis visíveis
  const visiblePanels = panels.filter((panel) => panel.visible).map((panel) => panel.component);

  // Array com a ordem dos painéis
  const panelOrder = [
    "RoomsPanel",
    "CoursesPanel",
    "TransportsPanel",
    "EventsPanel",
    "RestaurantPanel",
  ];


  // Efeito para alternar entre Bem-Vindo e os painéis visíveis
  useEffect(() => {
    if (visiblePanels.length === 0) return; // Se não houver painéis visíveis, não alterna

    const interval = setInterval(() => {
      setCurrentPanelIndex((prevIndex) => {
        // Se for o último painel visível, volta para BEM VINDO (-1)
        if (prevIndex === visiblePanels.length - 1) {
          return -1;
        }
        // Caso contrário, vai para o próximo painel
        return prevIndex + 1;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [visiblePanels]);

  // Encontra o painel atual baseado no índice
  const getCurrentContent = () => {
    // Se o índice for -1, mostra BEM VINDO
    if (currentPanelIndex === -1) {
      return <h1 className="welcome-title">BEM-VINDO</h1>;
    }

    // Caso contrário, mostra o painel correspondente
    const currentPanelName = visiblePanels[currentPanelIndex];
    if (!currentPanelName) return null;

    const Component = panelComponents[currentPanelName];
    return <Component />;
  };

  return (
    <div className="dashboard-container">

      <Header />

      <div className="vid-back">
        <video autoPlay muted loop>
          <source src="/videos/perfectly.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="main-content">
        <div className="welcome-section">{getCurrentContent()}</div>
        <div className="weather-sidebar">
          <Weather />
        </div>
      </div>
      <Footer />
    </div>
  );
}
