const BASE_URL = 'https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/';

/**
 * Fetch previsão do tempo para São João da Madeira.
 * @returns {Promise<Array>} previsão para São João da Madeira.
 */
export const fetchForecastForSJM = async () => {
  const globalIdLocal = 1131200; // ID de São João da Madeira
  const url = `${BASE_URL}${globalIdLocal}.json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados da API do IPMA: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data; // Retorna um array com dados das previsões
  } catch (error) {
    console.error('Erro ao buscar previsão do tempo:', error);
    return null;
  }
};
