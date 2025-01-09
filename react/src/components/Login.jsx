import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; 
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
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

  const handleHomeRedirect = () => {
    navigate("/");
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
            <div className="input-with-icon">
              <img src="/images/user.png" alt="user" className="input-icon" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <br />
          </div>
          <div className="input-group">
            <div className="input-with-icon">
              <img src="/images/locker.png" alt="password" className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <hr className="login-divider" />
          <button type="submit" className="login-button">LOGIN</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
      <button className="home-button" onClick={handleHomeRedirect}>
        Home
      </button>
    </div>
  );
}
