import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  SunMedium,
  ShieldCheck,
  Zap,
  Activity,
  CloudRain,
  ThermometerSun,
  Wrench,
  CheckCircle2,
  Play,
  FileText,
  Download,
} from "lucide-react";
import { useSolarData } from "../hooks/useSolarData";

// Simple Sparkline component
const Sparkline = ({ data, dataKey, color }: any) => (
  <div className="h-10 mt-4">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default function Dashboard() {
  const { data, history } = useSolarData();

  if (!data) {
    return (
      <div className="h-screen bg-[#030712] text-cyan-400 flex items-center justify-center text-2xl font-bold tracking-widest">
        INITIALIZING SOLARSHIELD...
      </div>
    );
  }

  const k_value = 0.0125; // Sample constant for expected output formula

  return (
    <div className="min-h-screen bg-[#030712] text-white p-6 space-y-6 overflow-y-auto">
      
      {/* 1. TOP HEADER */}
      <div className="bg-[#0A1424] border border-cyan-500/20 rounded-2xl p-6 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-6">
          <h1 className="text-4xl font-black tracking-widest">
            <span className="text-white">SOLAR</span>
            <span className="text-green-400">SHIELD</span>
          </h1>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-right">
            <p className="text-gray-400 tracking-widest text-sm font-semibold mb-1">SYSTEM STATUS</p>
            <p className="text-green-400 font-bold uppercase tracking-wider">{data.status === "Normal Operation" ? "OPTIMAL OPERATING STATE" : data.status}</p>
          </div>
          <div className="w-px h-12 bg-gray-700"></div>
          <div className="text-right">
            <p className="text-gray-400 tracking-widest text-sm font-semibold mb-1">GLOBAL EFFICIENCY</p>
            <h2 className="text-4xl font-black text-green-400">{data.efficiency}%</h2>
          </div>
        </div>
      </div>

      {/* 2. TELEMETRY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Current Efficiency */}
        <div className="bg-[#0A1424] border border-cyan-500/20 rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-start">
            <p className="text-gray-400 text-xs tracking-widest uppercase font-semibold">CURRENT EFFICIENCY</p>
            <Activity size={18} className="text-green-400" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <h2 className="text-3xl font-black text-green-400">{data.efficiency}%</h2>
            <span className="text-green-400 text-xs font-bold uppercase tracking-wider">NORMAL</span>
          </div>
          <Sparkline data={history} dataKey="efficiency" color="#4ade80" />
        </div>

        {/* Voltage Output */}
        <div className="bg-[#0A1424] border border-cyan-500/20 rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-start">
            <p className="text-gray-400 text-xs tracking-widest uppercase font-semibold">VOLTAGE OUTPUT</p>
            <Activity size={18} className="text-cyan-400" />
          </div>
          <h2 className="text-3xl font-black text-cyan-400 mt-4">{data.voltage}V</h2>
          <Sparkline data={history} dataKey="voltage" color="#22d3ee" />
        </div>

        {/* Light Intensity */}
        <div className="bg-[#0A1424] border border-cyan-500/20 rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-start">
            <p className="text-gray-400 text-xs tracking-widest uppercase font-semibold">LIGHT INTENSITY</p>
            <SunMedium size={18} className="text-green-400" />
          </div>
          <h2 className="text-3xl font-black text-green-400 mt-4">{data.lightIntensity}Lux</h2>
          <Sparkline data={history} dataKey="lightIntensity" color="#4ade80" />
        </div>

        {/* Panel Health */}
        <div className="bg-[#0A1424] border border-cyan-500/20 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-gray-400 text-xs tracking-widest uppercase font-semibold">PANEL HEALTH</p>
            <ShieldCheck size={18} className="text-green-400" />
          </div>
          <div className="mt-4 flex items-baseline gap-2 mb-4">
            <h2 className="text-3xl font-black text-green-400">{data.efficiency > 70 ? '99%' : '75%'}</h2>
            <span className="text-green-400 text-xs font-bold uppercase tracking-wider">NORMAL</span>
          </div>
        </div>

        {/* Actual Output */}
        <div className="bg-[#0A1424] border border-cyan-500/20 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-gray-400 text-xs tracking-widest uppercase font-semibold">ACTUAL OUTPUT</p>
            <Zap size={18} className="text-green-400" />
          </div>
          <h2 className="text-3xl font-black text-green-400 mt-4">{data.actualOutput}W</h2>
        </div>

        {/* Cleaning Mode */}
        <div className="bg-[#0A1424] border border-cyan-500/20 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-gray-400 text-xs tracking-widest uppercase font-semibold">CLEANING MODE</p>
            <Wrench size={18} className="text-cyan-400" />
          </div>
          <h2 className="text-3xl font-black text-cyan-400 mt-4">{data.isCleaning ? "ACTIVE" : "IDLE"}</h2>
        </div>
      </div>



      {/* 4. MATH MODELS & CHARTS */}
      <div className="bg-[#0A1424] border border-cyan-500/20 rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Output Model */}
          <div>
            <h3 className="text-cyan-400 text-xs tracking-widest font-bold uppercase mb-4">OUTPUT VERIFICATION MODEL</h3>
            <div className="flex items-center gap-4 text-2xl font-mono mb-4 text-gray-300">
              <span>Expected Output = </span>
            </div>
            <div className="flex items-center gap-4 text-2xl font-mono text-cyan-400 mb-6">
              <span className="bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-lg">k</span>
              <span>×</span>
              <span className="bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-lg">Light Intensity</span>
            </div>
            <p className="text-gray-400 font-mono text-sm">
              <span className="text-cyan-400">{data.expectedOutput} W</span> = {k_value} × {data.lightIntensity} Lux
            </p>
          </div>

          {/* Efficiency Calculation */}
          <div>
             <h3 className="text-green-400 text-xs tracking-widest font-bold uppercase mb-4">EFFICIENCY CALCULATION</h3>
             <div className="flex items-center gap-4 text-2xl font-mono text-gray-300 mb-6">
              <span>Efficiency = </span>
              <div className="flex flex-col items-center text-green-400 text-lg">
                <span className="border-b border-green-400/50 px-2 pb-1">Actual Output</span>
                <span className="px-2 pt-1">Expected Output</span>
              </div>
              <span>× 100</span>
             </div>
             <p className="text-gray-400 font-mono text-sm">
              <span className="text-green-400">{data.efficiency}%</span> = ({data.actualOutput} / {data.expectedOutput}) × 100
            </p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-t border-gray-800 pt-8">
          {/* Voltage Over Time */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-4 bg-cyan-400"></div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-300">VOLTAGE OUTPUT OVER TIME</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history}>
                  <defs>
                    <linearGradient id="colorVoltage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                  <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }} />
                  <Area type="monotone" dataKey="voltage" stroke="#22d3ee" strokeWidth={3} fill="url(#colorVoltage)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Actual vs Expected */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-green-400"></div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-300">ACTUAL VS EXPECTED POWER (W)</h3>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-2 text-green-400"><div className="w-3 h-3 rounded-full bg-green-400"></div> Actual</span>
                <span className="flex items-center gap-2 text-gray-400"><div className="w-3 h-3 rounded-full bg-gray-400"></div> Expected</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}>
                  <XAxis dataKey="time" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                  <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }} />
                  <Line type="monotone" dataKey="actualOutput" stroke="#4ade80" strokeWidth={3} dot={{r: 4, fill: '#4ade80'}} />
                  <Line type="monotone" dataKey="expectedOutput" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* 5. LOGGING & TELEMETRY */}
      <div className="bg-[#0A1424] border border-cyan-500/20 rounded-2xl p-6 shadow-lg mb-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-4 bg-green-400"></div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-300">EFFICIENCY TELEMETRY (%)</h3>
        </div>
        <div className="h-48 mb-8">
           <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <XAxis dataKey="time" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }} />
              <Line type="stepAfter" dataKey="efficiency" stroke="#facc15" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#0E1B2D] border border-gray-800 rounded-xl p-6 mt-4">
           <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3 text-cyan-400">
                <FileText size={20} />
                <div>
                  <h3 className="font-bold text-lg text-white">Data Logging & Telemetry</h3>
                  <p className="text-gray-400 text-sm">Review historical sensor records and export performance logs</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors text-sm font-medium">
                  <Download size={16} /> Export CSV
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-colors text-sm font-medium">
                  <FileText size={16} /> Full Report
                </button>
              </div>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
               <thead>
                 <tr className="text-gray-500 uppercase tracking-widest border-b border-gray-800">
                   <th className="pb-4 font-semibold">Timestamp</th>
                   <th className="pb-4 font-semibold text-cyan-400">Voltage (V)</th>
                   <th className="pb-4 font-semibold text-green-400">Actual (W)</th>
                   <th className="pb-4 font-semibold text-gray-400">Expected (W)</th>
                   <th className="pb-4 font-semibold text-yellow-500">Efficiency</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-800/50">
                 {/* Reversing history to show newest first */}
                 {[...history].reverse().slice(0, 5).map((row, i) => (
                   <tr key={i} className="hover:bg-gray-800/20 transition-colors">
                     <td className="py-4 text-gray-300 font-mono">{row.time}</td>
                     <td className="py-4 text-cyan-400 font-mono">{row.voltage} V</td>
                     <td className="py-4 text-green-400 font-mono">{row.actualOutput} W</td>
                     <td className="py-4 text-gray-400 font-mono">{row.expectedOutput} W</td>
                     <td className="py-4 text-yellow-500 font-mono">{row.efficiency}%</td>
                   </tr>
                 ))}
                 {history.length === 0 && (
                   <tr>
                     <td colSpan={5} className="py-8 text-center text-gray-500">Awaiting telemetry data...</td>
                   </tr>
                 )}
               </tbody>
             </table>
           </div>
        </div>
      </div>
      
    </div>
  );
}