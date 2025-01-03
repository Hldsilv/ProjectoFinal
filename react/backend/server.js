const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Importa os dados
let panelsState = require("./panelsData");
const users = require("./usersData");
const schedules = require("./schedulesData");
const courses = require("./coursesData");
const events = require("./eventsData");
const restaurantData = require("./restaurantData");
const transportsData = require("./transportsData");

// Rota para obter os menus do restaurante por dia da semana
app.get("/api/restaurant", (req, res) => {
  const today = new Date();
  const days = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
  const currentDay = days[today.getDay()];

  // Verifica se o dia atual existe no restaurantData
  if (restaurantData[currentDay]) {
    res.status(200).json(restaurantData[currentDay]);
  } else {
    res.status(404).json({ message: "Menu não disponível para hoje." });
  }
});

// Rota para obter os cursos por dia da semana
app.get("/api/courses", (req, res) => {
  res.json(courses);
});

// Rota para obter a lista de eventos por dia
app.get("/api/events", (req, res) => {
  res.json(events);
});

// Rota para obter os horários de todas as salas
app.get("/api/schedules", (req, res) => {
  res.status(200).json(schedules);
});

// Rota para obter os horários de comboios e autocarros
app.get("/api/transports", (req, res) => {
  res.status(200).json(transportsData);
});

// Rota POST: Validação do Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    return res.status(200).json({ success: true, message: "Login bem-sucedido!" });
  } else {
    return res.status(401).json({ success: false, message: "Credenciais inválidas!" });
  }
});

// Rota GET: Retorna os estados atuais dos painéis
app.get("/api/panels", (req, res) => {
  res.json(panelsState);
});

// Rota POST: Atualiza os estados dos painéis conforme o admin escolhe
app.post("/api/panels", (req, res) => {
  const { updatedPanels } = req.body;

  if (!updatedPanels || !Array.isArray(updatedPanels)) {
    return res.status(400).json({ message: "Dados inválidos." });
  }

  panelsState = updatedPanels; // Atualiza o array
  res.json({ message: "Painéis atualizados com sucesso!", panelsState });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
