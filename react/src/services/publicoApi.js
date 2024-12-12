const BASE_URL = 'https://www.publico.pt/api/list/ultimas';

/**
 * Busca as últimas notícias do Público.
 * @returns {Promise<Array>} Lista de notícias.
 */
export const fetchLatestNews = async () => {
  try {
    const response = await fetch(BASE_URL, { method: 'GET', headers: 'Access-Control-Allow-Origin: *'});

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados da API do Público: ${response.statusText}`);
    }

    const data = await response.json(); // Certifica-te de que a resposta é JSON
    return data.items || []; // Retorna apenas os itens das notícias
  } catch (error) {
    console.error('Erro ao buscar as últimas notícias:', error);
    return [];
  }
};
