import React from "react";
import "./Dashboard.css";
import Header from "./Header"; // Importa o Header
import Footer from "./Footer"; // Importa o Footer
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
      <Header />

      {/* Grid com os painéis */}
      <div className="main-section">
        {panelOrder.map((panelName) => {
          const panel = panels.find((p) => p.component === panelName && p.visible);
          if (!panel) return null;

          const Component = panelComponents[panelName];
          return (
            <div key={panel.id || panelName} className="box">
              {panelName === "RoomsPanel" ? (
                <Component />
              ) : (
                <Component />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
