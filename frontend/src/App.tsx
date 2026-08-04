import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Forecast from "./pages/Forecast";
import DigitalTwin from "./pages/DigitalTwin";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex bg-[#030712] min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 ml-20">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "forecast" && <Forecast />}
        {activeTab === "digital-twin" && <DigitalTwin />}
      </div>
    </div>
  );
}