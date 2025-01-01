const express = require("express");
const axios = require("axios");
const cors = require("cors");
const xml2js = require("xml2js"); // Para converter XML para JSON

const app = express();
const PORT = 5001;

// Middleware para permitir CORS
app.use(cors());

// Rota para buscar e converter as notícias do feed RSS
app.get("/api/news", async (req, res) => {
  try {
    const response = await axios.get("http://feeds.jn.pt/JN-Ultimas");
    const xml = response.data;

    // Converte XML para JSON
    const parser = new xml2js.Parser();
    parser.parseString(xml, (err, result) => {
      if (err) {
        console.error("Erro ao converter XML:", err);
        return res.status(500).send("Erro ao processar os dados do feed.");
      }

      // Extrai os títulos das notícias
      const news = result.rss.channel[0].item.map((item) => item.title[0]);
      res.json(news); // Retorna apenas os títulos
    });
  } catch (error) {
    console.error("Erro ao buscar notícias:", error.message);
    res.status(500).send("Erro ao buscar as notícias.");
  }
});

app.listen(PORT, () => {
  console.log(`Proxy rodando em http://localhost:${PORT}`);
});
