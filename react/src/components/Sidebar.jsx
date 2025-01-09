import React, { useState, useEffect } from 'react';
import Weather from './Weather';
import RestaurantPanel from './panels/RestaurantPanel';
import TransportsPanel from './panels/TransportsPanel';
import { motion, AnimatePresence } from 'framer-motion';

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
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPanel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {renderPanel()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
