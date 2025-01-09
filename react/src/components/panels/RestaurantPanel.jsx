import React, { useEffect, useState } from "react";
import axios from "axios";
import './RestaurantPanel.css'

export default function RestaurantPanel() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/restaurant");
        setMenu(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar o menu do restaurante:", err.message);
        setError("Não foi possível carregar o menu do dia.");
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return <div className="restaurant-panel">Carregando menu do dia...</div>;
  }

  if (error) {
    return <div className="restaurant-panel">{error}</div>;
  }

  return (
    <div className="restarauntPanel-container">
        <h1 className="restaurant-title">Menu do Dia</h1>
        <div className="menu-items">
          {menu.map((item) => (
            <div key={item.id} className="menu-item">
              <strong className="item-name">{item.name}</strong>
              <div className="item-details">
                <p>{item.description}</p>
                <span className="item-price">{item.price.toFixed(2)}€</span>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}
