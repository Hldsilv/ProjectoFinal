import React from "react";
import { useDashboard } from "../context/DashboardContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./AdminPanel.css";

export default function AdminPanel() {
  const { panels, loading, updatePanelVisibility } = useDashboard();
  const navigate = useNavigate(); // Initialize useNavigate

  if (loading) {
    return <div className="loading-message">Carregando configurações...</div>;
  }

  const handleCheckboxChange = (panelId, visible) => {
    updatePanelVisibility(panelId, visible);
  };

  const handleHomeRedirect = () => {
    navigate("/"); // Redirect to home route
  };

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
                <input
                  type="checkbox"
                  checked={panel.visible}
                  onChange={(e) => handleCheckboxChange(panel.id, e.target.checked)}
                />
                {panel.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="images-container">
        <h1 className="images-title">Imagens</h1>
        <div className="images-grid">
          <div className="image-item">
            <img src="/images/image1.jpg" alt="Image 1" />
          </div>
          <div className="image-item">
            <img src="/images/image2.jpg" alt="Image 2" />
          </div>
          <div className="image-item">
            <img src="/images/image3.jpg" alt="Image 3" />
          </div>
          <div className="image-item">
            <img src="/images/image4.jpg" alt="Image 4" />
          </div>
        </div>
      </div>
      <button className="home-button" onClick={handleHomeRedirect}>
        Home
      </button>
    </div>
  );
}
