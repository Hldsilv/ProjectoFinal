import React from "react";
import { useDashboard } from "../context/DashboardContext";
import { useNavigate } from "react-router-dom"; 
import "./AdminPanel.css";

export default function AdminPanel() {
  const { panels, loading, updatePanelVisibility } = useDashboard();
  const navigate = useNavigate(); 

  if (loading) {
    return <div className="loading-message">Carregando configurações...</div>;
  }

  const handleCheckboxChange = (panelId, visible) => {
    updatePanelVisibility(panelId, visible);
  };

  const handleHomeRedirect = () => {
    navigate("/"); 
  };

  const handleLayoutChange = (imageName, title) => {
    console.log('Botão clicado - Mudando layout para:', imageName);
    localStorage.setItem('dashboardBackground', `/images/${imageName}`);
    localStorage.setItem('welcomeTitle', title);  
    navigate('/');
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
        <h1 className="images-title">Layouts</h1>
        <div className="images-grid">
          <div className="image-item">
            <img src="/images/Natall.jpg" alt="Image 1" />
            <button 
              className="layout-button"
              onClick={() => handleLayoutChange('Natal.jpg', 'FELIZ NATAL')}
            >
              Layout Natal
            </button>
          </div>
          <div className="image-item">
            <img src="/images/carnavall.png" alt="Image 2" />
            <button 
              className="layout-button"
              onClick={() => handleLayoutChange('Carnaval.png', 'BOM CARNAVAL')}
            >
              Layout Páscoa
            </button>
          </div>
          <div className="image-item">
            <img src="/images/pascoa.png" alt="Image 3" />
            <button 
              className="layout-button"
              onClick={() => handleLayoutChange('Pascoa.webp', 'BOA PÁSCOA')}
            >
              Layout Carnaval
            </button>
          </div>
          <div className="image-item">
            <img src="/images/normal.png" alt="Image 4" />
            <button 
              className="layout-button"
              onClick={() => handleLayoutChange('Branco.png', 'BEM-VINDO')}
            >
              Layout Padrão
            </button>
          </div>
        </div>
      
      </div>
      <button className="home-button" onClick={handleHomeRedirect}>
        Home
      </button>
      
    </div>
  );
}
