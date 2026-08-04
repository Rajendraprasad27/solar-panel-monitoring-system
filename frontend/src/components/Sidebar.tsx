import {
  Sun,
  LayoutGrid,
  CloudSun,
  Box
} from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  return (
    <div className="w-20 min-h-screen bg-[#07111F] border-r border-cyan-500/20 flex flex-col items-center py-6 fixed left-0 top-0 z-50">
      {/* Top Logo/Icon */}
      <div className="text-cyan-400 mb-12">
        <Sun size={28} />
      </div>

      {/* Main Nav Items */}
      <div className="flex flex-col gap-8 flex-1">
        
        <div 
          onClick={() => setActiveTab('dashboard')}
          className={`relative group cursor-pointer flex justify-center transition-colors ${activeTab === 'dashboard' ? 'text-green-400' : 'text-gray-500 hover:text-gray-300'}`}
          title="Dashboard"
        >
          <div className={activeTab === 'dashboard' ? "bg-green-500/10 p-3 rounded-xl border border-green-500/30" : "p-3"}>
             <LayoutGrid size={24} />
          </div>
          {activeTab === 'dashboard' && <div className="absolute right-[-24px] top-1/2 -translate-y-1/2 w-1 h-8 bg-green-400 rounded-l-md" />}
        </div>

        <div 
          onClick={() => setActiveTab('forecast')}
          className={`relative group cursor-pointer flex justify-center transition-colors ${activeTab === 'forecast' ? 'text-green-400' : 'text-gray-500 hover:text-gray-300'}`}
          title="Forecast"
        >
          <div className={activeTab === 'forecast' ? "bg-green-500/10 p-3 rounded-xl border border-green-500/30" : "p-3"}>
             <CloudSun size={24} />
          </div>
          {activeTab === 'forecast' && <div className="absolute right-[-24px] top-1/2 -translate-y-1/2 w-1 h-8 bg-green-400 rounded-l-md" />}
        </div>

        <div 
          onClick={() => setActiveTab('digital-twin')}
          className={`relative group cursor-pointer flex justify-center transition-colors ${activeTab === 'digital-twin' ? 'text-green-400' : 'text-gray-500 hover:text-gray-300'}`}
          title="Digital Twin"
        >
          <div className={activeTab === 'digital-twin' ? "bg-green-500/10 p-3 rounded-xl border border-green-500/30" : "p-3"}>
             <Box size={24} />
          </div>
          {activeTab === 'digital-twin' && <div className="absolute right-[-24px] top-1/2 -translate-y-1/2 w-1 h-8 bg-green-400 rounded-l-md" />}
        </div>

      </div>
    </div>
  );
}
