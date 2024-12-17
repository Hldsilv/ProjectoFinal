import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:3001/api/courses";

export default function CoursesPanel() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  // Função para obter o nome do dia da semana em português
  const getCurrentDay = () => {
    const days = [
      "domingo",
      "segunda",
      "terca",
      "quarta",
      "quinta",
      "sexta",
      "sabado",
    ];
    const today = new Date();
    return days[today.getDay()];
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Erro ao buscar os cursos");
        }
        const data = await response.json();
        const today = getCurrentDay();
        setCourses(data[today] || []); // Define os cursos do dia atual
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Cursos de Hoje</h2>
      {error ? (
        <p>Erro: {error}</p>
      ) : courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>{course.name}</li>
          ))}
        </ul>
      ) : (
        <p>Não há cursos para hoje.</p>
      )}
    </div>
  );
}
