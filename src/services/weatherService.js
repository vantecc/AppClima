const API_KEY = "d1b3898e9c04b5e143c9a9c1731cc7ed"
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getWeather(city = "São Paulo") {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt`
    );
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error("Cidade não encontrada");
    }
  } catch (error) {
    console.error("Erro ao buscar o clima:", error);
    return null;
  }
}

export async function getForecast(city = "São Paulo") {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pt`
    );
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error("Previsão não disponível");
    }
  } catch (error) {
    console.error("Erro ao buscar a previsão:", error);
    return null;
  }
}


export async function getForecast(city = "São Paulo") {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city},BR&appid=${API_KEY}&units=metric&lang=pt`
    );
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Erro ao buscar a previsão:", error);
    return null;
  }
}

