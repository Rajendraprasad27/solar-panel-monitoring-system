export interface SolarData {
  voltage: number;
  lightIntensity: number;
  expectedOutput: number;
  actualOutput: number;
  efficiency: number;
  status: string;
  faultType: string | null;
  isCleaning: boolean;
}

export interface ForecastDay {
  id: number;
  date: string;
  condition: string;
  cloudCover: number;
  predictedYield: number;
}

export interface ForecastResponse {
  forecast: ForecastDay[];
  recommendation: string;
}