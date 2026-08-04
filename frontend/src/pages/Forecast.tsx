import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CloudRain, Sun, Cloud, AlertTriangle, Droplets } from "lucide-react";
import { fetchForecastData } from "../api/solarApi";
import { ForecastResponse } from "../types";

export default function Forecast() {
  const [data, setData] = useState<ForecastResponse | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchForecastData();
        setData(result);
      } catch (error) {
        console.error("Error fetching forecast:", error);
      }
    }
    loadData();
  }, []);

  if (!data) {
    return (
      <div className="h-screen bg-[#030712] text-cyan-400 flex items-center justify-center text-2xl font-bold tracking-widest">
        LOADING FORECAST MODEL...
      </div>
    );
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "Sunny": return <Sun className="text-yellow-400" size={32} />;
      case "Rainy": return <CloudRain className="text-blue-400" size={32} />;
      default: return <Cloud className="text-gray-400" size={32} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white p-6 space-y-6 overflow-y-auto">
      
      {/* Top Header */}
      <div className="bg-[#0A1424] border border-cyan-500/20 rounded-2xl p-6 shadow-lg">
        <h1 className="text-4xl font-black tracking-widest mb-2">
          <span className="text-cyan-400">YIELD </span>
          <span className="text-white">FORECAST</span>
        </h1>
        <p className="text-gray-400">5-Day Predictive Solar Generation Model</p>
      </div>

      {/* Smart Alert */}
      <div className="bg-blue-500/10 border border-blue-500/50 rounded-2xl p-6 shadow-lg flex items-start gap-4">
        <div className="p-3 bg-blue-500/20 rounded-xl">
          <AlertTriangle className="text-blue-400" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-blue-400 mb-1">Smart Maintenance Alert</h3>
          <p className="text-gray-300 leading-relaxed">{data.recommendation}</p>
        </div>
      </div>

      {/* Weather Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {data.forecast.map((day) => (
          <div key={day.id} className="bg-[#0A1424] border border-gray-800 rounded-2xl p-5 flex flex-col items-center text-center hover:border-cyan-500/50 transition-colors">
            <p className="text-gray-400 text-sm font-semibold mb-4 uppercase tracking-wider">{day.date}</p>
            {getWeatherIcon(day.condition)}
            <h3 className="text-xl font-bold mt-3 text-gray-200">{day.condition}</h3>
            
            <div className="w-full h-px bg-gray-800 my-4"></div>
            
            <div className="flex justify-between w-full text-xs text-gray-400 mb-2">
              <span>Cloud Cover</span>
              <span>{day.cloudCover}%</span>
            </div>
            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden mb-4">
               <div className="bg-gray-400 h-full" style={{ width: `${day.cloudCover}%` }}></div>
            </div>

            <div className="mt-auto">
              <p className="text-cyan-400 text-2xl font-black">{day.predictedYield} <span className="text-sm font-bold">W</span></p>
            </div>
          </div>
        ))}
      </div>

      {/* Yield Chart */}
      <div className="bg-[#0A1424] border border-cyan-500/20 rounded-2xl p-6 shadow-lg">
        <h3 className="text-sm tracking-widest uppercase font-bold text-gray-300 mb-6">Predicted Yield Over 5 Days</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.forecast}>
              <CartesianGrid stroke="#1F2937" vertical={false} />
              <XAxis dataKey="date" stroke="#6B7280" tickLine={false} axisLine={false} />
              <YAxis stroke="#6B7280" tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.5rem' }}
                cursor={{ fill: '#1F2937' }}
              />
              <Bar dataKey="predictedYield" fill="#22d3ee" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
