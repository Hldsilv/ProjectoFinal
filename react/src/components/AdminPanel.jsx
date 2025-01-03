import React from "react";
import { useDashboard } from "../context/DashboardContext";
import "./AdminPanel.css";

export default function AdminPanel() {
  const { panels, loading } = useDashboard();

  if (loading) {
    return <div className="loading-message">Carregando configurações...</div>;
  }

  return (
    <div className="admin-container">
      <div className="video-backgrounder">
        <video autoPlay muted loop>
          <source src="/videos/plex.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="admin-content">
        <h1 className="admin-title">Painel do Administrador</h1>
        <p className="admin-description">
          Selecione os elementos que deseja exibir na Dashboard:
        </p>
        <ul className="panels-list">
          {panels.map((panel) => (
            <li key={panel.id} className="panel-item">
              <label>
                <input type="checkbox" checked={panel.visible} readOnly />
                {panel.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
