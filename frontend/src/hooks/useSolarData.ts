import { useEffect, useState } from "react";
import { fetchSolarData } from "../api/solarApi";
import { SolarData } from "../types";

export interface HistoryData extends SolarData {
  time: string;
}

export function useSolarData() {
  const [data, setData] = useState<SolarData | null>(null);
  const [history, setHistory] = useState<HistoryData[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const result = await fetchSolarData();
        setData(result);
        
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
        
        setHistory(prev => {
          const newHistory = [...prev, { ...result, time: timeStr }];
          if (newHistory.length > 20) {
            newHistory.shift();
          }
          return newHistory;
        });

      } catch (error) {
        console.log(error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return { data, history };
}