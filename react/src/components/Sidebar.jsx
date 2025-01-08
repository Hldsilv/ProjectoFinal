import React, { useState, useEffect } from 'react';
import Weather from './Weather';
import RestaurantPanel from './panels/RestaurantPanel';
import TransportsPanel from './panels/TransportsPanel';

export default function Sidebar() {
  const [currentPanel, setCurrentPanel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPanel((prev) => (prev + 1) % 3); // Alterna entre 0, 1 e 2
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const renderPanel = () => {
    switch (currentPanel) {
      case 0:
        return <Weather />;
      case 1:
        return <RestaurantPanel />;
      case 2:
        return <TransportsPanel />;
      default:
        return <Weather />;
    }
  };

  return (
    <div className="sidebar">
      <div className="rotation-container">
        {renderPanel()}
      </div>
    </div>
  );
}
