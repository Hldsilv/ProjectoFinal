import React, { useEffect, useState } from "react";
import logoCesae from "../assets/logo_cesae.png";
import "./Header.css"; // Estilos específicos do Header

export default function Header() {
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

      setCurrentDateTime(`${day} de ${month} de ${year}`);
    };

    updateClock(); // Atualiza imediatamente
    const timer = setInterval(updateClock, 1000); // Atualiza a cada 1 segundo

    return () => clearInterval(timer); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <header className="header">
      <img src={logoCesae} alt="CESAE Digital" className="logo" />
      <div className="date-time">{currentDateTime}</div>
    </header>
  );
}
