import React, { useState, useEffect } from "react";
import "./CoursesPanel.css";

const API_URL = "http://localhost:3001/api/courses";

export default function CoursesPanel() {
  const [currentCourse, setCurrentCourse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Erro ao buscar os cursos");
        }
        const data = await response.json();
        
        const firstDay = Object.keys(data)[0];
        const firstCourse = data[firstDay][0];
        setCurrentCourse(firstCourse);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCourses();
  }, []);

  if (error) {
    return <div className="courses-panel">Erro: {error}</div>;
  }

  if (!currentCourse) {
    return <div className="courses-panel">Carregando...</div>;
  }

  return (
    <div className="courses-panel">
      <div className="course-title-card">
        <h1>Cursos</h1>
      </div>
      <div className="course-content-card">
        <div className="course-left-column">
          <h2 className="course-name"><u>{currentCourse.name}</u></h2>
          <div className="course-image">
            <img src="/images/curso.jpg" alt="Cursos" />
          </div>
          
          <div className="course-description">
            {currentCourse.description}
          </div>
        </div>

        <div className="course-right-column">
          <div className="course-details">
            <div className="detail-item">
              <img src="/images/calendar.png" alt="Ícone de calendário" className="calendar-icon" />
              <span>Início:</span>
                <span className="course-info-text">{currentCourse.inicio}</span>
              </div>
            

            <div className="underlining"></div>
            <div className="detail-item">
              <img src="/images/calendar.png" alt="Ícone de calendário" className="calendar-icon" />
              <span>Fim:</span>
                <span className="course-info-text">{currentCourse.fim}</span>
            </div>
            <div className="underlining"></div>
            <div className="detail-item">
              <img src="/images/clock.png" alt="Ícone de relógio" className="clock-icon" />
              <span>Horário:</span>
                <span className="course-info-text">{currentCourse.horario}</span>
            </div>
            <div className="underlining"></div>
            <div className="detail-item">
              <img src="/images/clock.png" alt="Ícone de duração" className="duration-icon" />
              <span>Duração:</span>
                <span className="course-info-text">{currentCourse.duracao}</span>
            </div>
            <div className="underlining"></div>

            <div className="detail-item">
              <img src="/images/pin.png" alt="Ícone de local" className="location-icon" />
              <span>Local:</span>
              <span className="course-info-text">{currentCourse.local}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
