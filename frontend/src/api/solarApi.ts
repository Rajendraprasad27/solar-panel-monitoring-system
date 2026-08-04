const API_URL = "http://127.0.0.1:5000/api/solar";
const FORECAST_URL = "http://127.0.0.1:5000/api/forecast";

export async function fetchSolarData() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function fetchForecastData() {
  const response = await fetch(FORECAST_URL);
  return response.json();
}