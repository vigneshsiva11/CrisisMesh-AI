import { NavLink } from "react-router-dom";
import useCurrentTime from "../../hooks/useCurrentTime";
import { useCrisis } from "../../context/CrisisContext";
import StatusBadge from "./StatusBadge";

const mobileLinks = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Map", path: "/map" },
  { label: "Swarm", path: "/swarm" },
  { label: "Victims", path: "/victims" },
];

export default function Navbar() {
  const currentTime = useCurrentTime();
  const { isConnected, simulationRunning, lastRefresh } = useCrisis();

  return (
    <header className="sticky top-0 z-[900] border-b border-white/10 bg-midnight/70 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-electric/70">Emergency Command</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">CrisisMesh AI</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge
            label={simulationRunning ? "Simulation Active" : "Simulation Standby"}
            tone={simulationRunning ? "safe" : "alert"}
            pulse={simulationRunning}
          />
          <StatusBadge
            label={isConnected ? "Backend Connected" : "Backend Sync Limited"}
            tone={isConnected ? "info" : "danger"}
            pulse={!isConnected}
          />
          <div className="glass-panel rounded-2xl px-4 py-2 text-right">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Local Time</p>
            <p className="text-sm font-medium text-white">
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
          </div>
          <div className="glass-panel rounded-2xl px-4 py-2 text-right">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Last Sync</p>
            <p className="text-sm font-medium text-white">
              {lastRefresh
                ? lastRefresh.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "Pending"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto lg:hidden">
        {mobileLinks.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm transition ${
                isActive
                  ? "bg-electric/15 text-white"
                  : "border border-white/10 bg-white/5 text-slate-300"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}
