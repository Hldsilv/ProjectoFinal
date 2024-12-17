import React from "react";
import Weather from "../Weather"; // Importa o componente Weather

export default function WeatherPanel() {
  return (
    <div>
      <h2>Meteorologia</h2>
      <Weather /> {/* Renderiza o Weather */}
    </div>
  );
}
