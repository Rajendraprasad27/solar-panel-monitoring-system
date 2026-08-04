import React, { useEffect, useState } from "react";
import { fetchSolarData } from "../api/solarApi";
import { SolarData } from "../types";
import { Activity, Zap, ShieldAlert, Cpu } from "lucide-react";

export default function DigitalTwin() {
  const [data, setData] = useState<SolarData | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchSolarData();
        setData(result);
      } catch (error) {
        console.error("Error fetching solar data:", error);
      }
    }
    loadData();
    const intervalId = setInterval(loadData, 2000);
    return () => clearInterval(intervalId);
  }, []);

  if (!data) {
    return (
      <div className="h-screen bg-[#030712] text-cyan-400 flex items-center justify-center text-2xl font-bold tracking-widest">
        INITIALIZING DIGITAL TWIN...
      </div>
    );
  }

  // Calculate visual properties
  const sunOpacity = Math.max(0.1, data.lightIntensity / 1000);
  const isDusty = data.efficiency < 75 && !data.isCleaning;

  return (
    <div className="min-h-screen bg-[#030712] text-white p-6 relative overflow-hidden flex flex-col">
      
      {/* Header */}
      <div className="bg-[#0A1424] border border-cyan-500/20 rounded-2xl p-6 shadow-lg z-10 relative">
        <h1 className="text-4xl font-black tracking-widest mb-2">
          <span className="text-cyan-400">DIGITAL </span>
          <span className="text-white">TWIN</span>
        </h1>
        <p className="text-gray-400">Real-Time Hardware State Visualization</p>
      </div>

      {/* 3D Scene Container */}
      <div className="flex-1 relative flex items-center justify-center mt-6 z-0 perspective-[1000px]">
        
        {/* Dynamic Sun */}
        <div 
          className="absolute top-10 right-20 w-40 h-40 bg-yellow-400 rounded-full transition-all duration-1000"
          style={{ 
            opacity: sunOpacity,
            boxShadow: `0 0 ${100 * sunOpacity}px ${20 * sunOpacity}px rgba(250, 204, 21, ${sunOpacity})` 
          }}
        />

        {/* Floating Telemetry Badges */}
        <div className="absolute top-20 left-20 bg-[#0A1424]/80 backdrop-blur-md border border-cyan-500/30 p-4 rounded-xl flex items-center gap-4">
          <Zap className="text-cyan-400" />
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Voltage</p>
            <p className="text-xl font-bold text-cyan-400">{data.voltage}V</p>
          </div>
        </div>

        <div className="absolute bottom-20 left-20 bg-[#0A1424]/80 backdrop-blur-md border border-green-500/30 p-4 rounded-xl flex items-center gap-4">
          <Activity className="text-green-400" />
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Efficiency</p>
            <p className="text-xl font-bold text-green-400">{data.efficiency}%</p>
          </div>
        </div>

        <div className="absolute bottom-20 right-20 bg-[#0A1424]/80 backdrop-blur-md border border-blue-500/30 p-4 rounded-xl flex items-center gap-4">
          <Cpu className="text-blue-400" />
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Servo Motor</p>
            <p className="text-xl font-bold text-blue-400">{data.isCleaning ? "ACTIVE" : "IDLE"}</p>
          </div>
        </div>

        {isDusty && (
          <div className="absolute top-20 right-1/3 bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center gap-4 animate-pulse">
            <ShieldAlert className="text-red-400" />
            <p className="text-sm font-bold text-red-400 tracking-wider">DUST DETECTED</p>
          </div>
        )}

        {/* The Solar Panel Graphic */}
        <div 
          className="relative w-96 h-96 transition-all duration-1000"
          style={{ transform: "rotateX(60deg) rotateZ(-45deg)", transformStyle: "preserve-3d" }}
        >
          {/* Base structure */}
          <div className="absolute inset-0 bg-blue-900 border-4 border-gray-600 rounded-lg shadow-2xl overflow-hidden flex flex-wrap">
            {/* Solar cells grid */}
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-1/4 h-1/4 border border-blue-800/50 bg-blue-500/10" />
            ))}
          </div>

          {/* Dust Overlay */}
          <div 
            className={`absolute inset-0 bg-yellow-900/40 rounded-lg transition-opacity duration-[2000ms] pointer-events-none ${isDusty ? 'opacity-100' : 'opacity-0'}`}
            style={{ backdropFilter: isDusty ? "blur(2px)" : "none" }}
          />

          {/* Glare effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

          {/* Robotic Wiper Arm */}
          <div 
            className={`absolute top-0 w-2 h-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] transition-all ease-in-out pointer-events-none ${data.isCleaning ? 'duration-[2000ms]' : 'duration-1000'}`}
            style={{ 
              left: data.isCleaning ? '100%' : '0%',
              transform: 'translateX(-50%) translateZ(10px)'
            }}
          >
            {/* Motor Base */}
            <div className="absolute -left-2 -top-4 w-6 h-6 bg-gray-400 rounded-full border-2 border-gray-600" />
            <div className="absolute -left-2 -bottom-4 w-6 h-6 bg-gray-400 rounded-full border-2 border-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
