import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; 
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth(); // Pega a função de login do contexto

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        username,
        password,
      });

      if (response.data.success) {
        login(); // Atualiza o estado de autenticação
        window.location.href = "/admin";
      }
    } catch (err) {
      setError("Credenciais inválidas! Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <div className="video-background">
        <video autoPlay muted loop playsInline>
          <source src="/videos/plex.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="login-box">
        <h2 className="login-title">ADMIN LOGIN</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <hr className="login-divider" />
          <button type="submit" className="login-button">LOGIN</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}
