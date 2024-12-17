import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Cria o contexto
const DashboardContext = createContext();

// Hook para usar o contexto
export const useDashboard = () => useContext(DashboardContext);

// Provider do contexto
export const DashboardProvider = ({ children }) => {
  const [panels, setPanels] = useState([]); // Estado inicial vazio
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const fetchPanels = async () => {
      try {
        console.log("Buscando configurações...");
        const response = await axios.get("http://localhost:3001/api/panels");
        console.log("Configurações recebidas:", response.data);
        setPanels(response.data);
      } catch (error) {
        console.error("Erro ao buscar os painéis:", error.message);
      } finally {
        setLoading(false); // Finaliza carregamento
      }
    };

    fetchPanels();
  }, []);

  return (
    <DashboardContext.Provider value={{ panels, loading }}>
      {children}
    </DashboardContext.Provider>
  );
};
