const BASE_URL = "https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/";

export const fetchForecastForSJM = async () => {
  const globalIdLocal = 1131200; // ID de São João da Madeira
  const url = `${BASE_URL}${globalIdLocal}.json`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
    const data = await response.json();
    return data.data.slice(0, 2); // Retorna os dados para hoje e amanhã
  } catch (error) {
    console.error("Erro ao buscar previsão do tempo:", error);
    return [];
  }
};
