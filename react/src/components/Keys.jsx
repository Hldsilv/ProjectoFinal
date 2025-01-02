import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Keys() {
  const navigate = useNavigate();

  useEffect(() => {
    const pressedKeys = new Set();

    const handleKeyDown = (event) => {
      pressedKeys.add(event.key);

      // Verifica se uma combinação específica foi pressionada (exemplo: Shift + P)
      if (pressedKeys.has("a") && pressedKeys.has("d")) {
        navigate("/login"); 
      }
    };

    const handleKeyUp = (event) => {
      pressedKeys.delete(event.key); // Remove a tecla quando solta
    };

    // Adiciona os event listeners
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Limpa os event listeners ao desmontar o componente
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [navigate]);

 return null; 
};

