import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MapView from "./pages/MapView";
import SwarmControl from "./pages/SwarmControl";
import VictimMonitor from "./pages/VictimMonitor";
import Sidebar from "./components/ui/Sidebar";
import Navbar from "./components/ui/Navbar";
import { CrisisProvider } from "./context/CrisisContext";

function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-midnight bg-hero-grid bg-hero-grid text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_25%),radial-gradient(circle_at_bottom,rgba(239,68,68,0.1),transparent_18%)]" />
      <div className="relative flex min-h-screen">
        <Sidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Navbar />
          <main className="flex-1 overflow-y-auto px-4 pb-6 pt-2 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CrisisProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/swarm" element={<SwarmControl />} />
          <Route path="/victims" element={<VictimMonitor />} />
        </Routes>
      </AppShell>
    </CrisisProvider>
  );
}
