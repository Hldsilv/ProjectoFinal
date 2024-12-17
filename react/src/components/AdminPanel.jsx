import React from "react";
import { useDashboard } from "../context/DashboardContext";

export default function AdminPanel() {
  const { panels, loading } = useDashboard();

  if (loading) {
    return <p>Carregando configurações...</p>;
  }

  return (
    <div>
      <h1>Painel do Administrador</h1>
      <p>Selecione os elementos que deseja exibir na Dashboard:</p>
      <ul>
        {panels.map((panel) => (
          <li key={panel.id}>
            <label>
              <input type="checkbox" checked={panel.visible} readOnly />
              {panel.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
