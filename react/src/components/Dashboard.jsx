import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useDashboard } from "../context/DashboardContext";
import Header from "./Header";
import Footer from "./Footer";
import RoomsPanel from "./panels/RoomsPanel";
import CoursesPanel from "./panels/CoursesPanel";
import EventsPanel from "./panels/EventsPanel";
import Sidebar from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";

// Objeto com todos os componentes de painéis disponíveis (apenas os principais)
const panelComponents = {
  RoomsPanel,
  CoursesPanel,
  EventsPanel,
};

export default function Dashboard() {
  const { panels } = useDashboard();
  const [currentPanelIndex, setCurrentPanelIndex] = useState(-1);

  // Array com a ordem dos painéis visíveis (filtrando apenas os painéis principais)
  const visiblePanels = panels
    .filter((panel) => 
      panel.visible && 
      ["RoomsPanel", "CoursesPanel", "EventsPanel"].includes(panel.component)
    )
    .map((panel) => panel.component);

  // Array com a ordem dos painéis
  const panelOrder = [
    "RoomsPanel",
    "CoursesPanel",
    "EventsPanel",
  ];

  useEffect(() => {
    if (visiblePanels.length === 0) return;

    const interval = setInterval(() => {
      setCurrentPanelIndex((prevIndex) => {
        if (prevIndex === visiblePanels.length - 1) {
          return -1;
        }
        return prevIndex + 1;
      });
    }, 9000);

    return () => clearInterval(interval);
  }, [visiblePanels]);

  const getCurrentContent = () => {
    if (currentPanelIndex === -1) {
      return (
        <motion.h1 
          className="welcome-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          BEM-VINDO
        </motion.h1>
      );
    }

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
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentPanelIndex}
            className="welcome-section"
            initial={{ opacity: 0, x: -500 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -500 }}
            transition={{ 
              duration: 0.5,
              ease: "easeInOut"
            }}
          >
            {getCurrentContent()}
          </motion.div>
        </AnimatePresence>
        <div className="weather-sidebar">
          <Sidebar />
        </div>
      </div>
      <Footer />
    </div>
  );
}
