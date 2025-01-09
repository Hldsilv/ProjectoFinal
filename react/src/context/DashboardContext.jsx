import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Cria o contexto
const DashboardContext = createContext();

// Hook para usar o contexto
export const useDashboard = () => useContext(DashboardContext);

// Provider do contexto
export const DashboardProvider = ({ children }) => {
  const [panels, setPanels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPanels = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/panels");
        // Filtrar apenas os painéis principais
        const mainPanels = response.data.filter(panel => 
          ["RoomsPanel", "CoursesPanel", "EventsPanel"].includes(panel.component)
        );
        setPanels(mainPanels);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os painéis:", error.message);
        setLoading(false);
      }
    };

    fetchPanels();
  }, []);

  // Função para atualizar a visibilidade de um painel
  const updatePanelVisibility = (panelId, visible) => {
    const updatedPanels = panels.map((panel) =>
      panel.id === panelId ? { ...panel, visible } : panel
    );
    setPanels(updatedPanels);

    // Atualiza no backend apenas os painéis principais
    axios
      .post("http://localhost:3001/api/panels", { 
        updatedPanels: updatedPanels.filter(panel => 
          ["RoomsPanel", "CoursesPanel", "EventsPanel"].includes(panel.component)
        )
      })
      .catch((error) => console.error("Erro ao atualizar painéis:", error.message));
  };

  return (
    <DashboardContext.Provider value={{ panels, loading, updatePanelVisibility }}>
      {children}
    </DashboardContext.Provider>
  );
};
