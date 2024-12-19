import axios from "axios";

// Função para buscar as últimas notícias do proxy local
export const fetchLatestNews = async () => {
  try {
    const response = await axios.get("http://localhost:5001/api/news");
    return response.data; // Retorna os títulos das notícias
  } catch (error) {
    console.error("Erro ao buscar as notícias:", error.message);
    throw error;
  }
};
